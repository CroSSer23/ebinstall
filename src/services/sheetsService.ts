import { EquipmentDataService, EquipmentRow, EquipmentSpecsRow, EquipmentType, SheetsData } from '@/types/equipment';

export class GoogleSheetsService implements EquipmentDataService {
  /**
   * Получает ID таблицы из общедоступной ссылки на Google Sheets
   */
  private getSheetIdFromUrl(url: string): string | null {
    // Пример ссылки: https://docs.google.com/spreadsheets/d/1AbCdEfG1HIJklMnOPqRsTUVwXYZ123456/edit#gid=0
    const regex = /\/d\/([a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  /**
   * Загружает данные из Google Sheets по ссылке
   */
  async fetchEquipmentData(sheetUrl: string): Promise<SheetsData> {
    try {
      console.log('Fetching equipment data from:', sheetUrl);
      const sheetId = this.getSheetIdFromUrl(sheetUrl);
      
      if (!sheetId) {
        console.error('Invalid Google Sheets URL:', sheetUrl);
        throw new Error('Invalid Google Sheets URL');
      }
      
      console.log('Sheet ID extracted:', sheetId);
      
      // Загрузка данных из листа с оборудованием
      const equipmentUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=Equipment`;
      console.log('Fetching Equipment sheet from:', equipmentUrl);
      const equipmentResponse = await fetch(equipmentUrl);
      
      // Загрузка данных из листа со спецификациями
      const specificationsUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=Specifications`;
      console.log('Fetching Specifications sheet from:', specificationsUrl);
      const specsResponse = await fetch(specificationsUrl);

      // Проверяем статус ответов
      if (!equipmentResponse.ok) {
        console.error('Failed to fetch Equipment sheet. Status:', equipmentResponse.status, equipmentResponse.statusText);
        throw new Error(`Failed to fetch Equipment sheet: ${equipmentResponse.status} ${equipmentResponse.statusText}`);
      }
      
      if (!specsResponse.ok) {
        console.error('Failed to fetch Specifications sheet. Status:', specsResponse.status, specsResponse.statusText);
        throw new Error(`Failed to fetch Specifications sheet: ${specsResponse.status} ${specsResponse.statusText}`);
      }

      const equipmentText = await equipmentResponse.text();
      console.log('Equipment data size:', equipmentText.length, 'bytes');
      if (equipmentText.length < 50) {
        console.log('Raw Equipment data:', equipmentText);
      }
      
      const specsText = await specsResponse.text();
      console.log('Specifications data size:', specsText.length, 'bytes');
      if (specsText.length < 50) {
        console.log('Raw Specifications data:', specsText);
      }

      // Парсинг CSV-данных
      const equipmentRows = this.parseCSV(equipmentText);
      console.log('Parsed Equipment rows:', equipmentRows.length);
      if (equipmentRows.length > 0) {
        console.log('Equipment headers:', equipmentRows[0]);
      }
      
      const specsRows = this.parseCSV(specsText);
      console.log('Parsed Specifications rows:', specsRows.length);
      if (specsRows.length > 0) {
        console.log('Specifications headers:', specsRows[0]);
      }

      return this.processSheetData(equipmentRows, specsRows);
    } catch (error) {
      console.error('Error fetching data from Google Sheets:', error);
      throw error;
    }
  }

  /**
   * Парсинг CSV-строки в массив строк
   */
  private parseCSV(csvText: string): string[][] {
    const rows: string[][] = [];
    const lines = csvText.split('\n');
    
    for (const line of lines) {
      if (line.trim() === '') continue;
      
      // Разделяем строку по запятым, учитывая кавычки
      const values: string[] = [];
      let currentValue = '';
      let insideQuotes = false;
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
          insideQuotes = !insideQuotes;
        } else if (char === ',' && !insideQuotes) {
          values.push(this.cleanValue(currentValue));
          currentValue = '';
        } else {
          currentValue += char;
        }
      }
      
      // Добавляем последнее значение
      values.push(this.cleanValue(currentValue));
      rows.push(values);
    }
    
    return rows;
  }
  
  /**
   * Очистка значения от кавычек и лишних пробелов
   */
  private cleanValue(value: string): string {
    value = value.trim();
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.substring(1, value.length - 1);
    }
    // Заменяем двойные кавычки внутри значения на одинарные
    value = value.replace(/""/g, '"');
    return value;
  }

  /**
   * Обрабатывает данные из Google Sheets и преобразует их в объект SheetsData
   */
  processSheetData(equipmentRows: string[][], specsRows: string[][]): SheetsData {
    if (!equipmentRows || equipmentRows.length < 2 || !specsRows || specsRows.length < 1) {
      console.error('Недостаточно данных из Google Sheets');
      return { items: [], specs: {} as Record<EquipmentType, EquipmentSpecsRow> };
    }

    try {
      // Получаем заголовки таблицы из первой строки
      const equipmentHeaders = equipmentRows[0];
      const specsHeaders = specsRows[0];
      
      console.log('Equipment Headers:', equipmentHeaders);
      console.log('Specs Headers:', specsHeaders);
      
      // Индексы колонок для оборудования
      const equipmentColumnIndexes = {
        id: equipmentHeaders.indexOf('ID'),
        type: equipmentHeaders.indexOf('Type'),
        swl: equipmentHeaders.indexOf('SWL'),
        length: equipmentHeaders.indexOf('Length'),
        pricePerWeek: equipmentHeaders.indexOf('PricePerWeek'),
        available: equipmentHeaders.indexOf('Available')
      };

      // Проверяем, что все необходимые колонки найдены
      const missingColumns = Object.entries(equipmentColumnIndexes)
        .filter(([_, index]) => index === -1)
        .map(([name]) => name);
      
      if (missingColumns.length > 0) {
        console.error(`Отсутствуют обязательные колонки в таблице оборудования: ${missingColumns.join(', ')}`);
        return { items: [], specs: {} as Record<EquipmentType, EquipmentSpecsRow> };
      }

      // Индексы колонок для спецификаций
      const specsColumnIndexes = {
        type: specsHeaders.indexOf('Type'),
        specs: specsHeaders.indexOf('Specs'),
        imageUrl: specsHeaders.indexOf('ImageURL'),
        primaryColor: specsHeaders.indexOf('PrimaryColor'),
        secondaryColor: specsHeaders.indexOf('SecondaryColor')
      };

      // Проверяем, что основные колонки спецификаций найдены
      const missingSpecsColumns = ['type', 'specs'].filter(
        name => specsColumnIndexes[name as keyof typeof specsColumnIndexes] === -1
      );
      
      if (missingSpecsColumns.length > 0) {
        console.error(`Отсутствуют обязательные колонки в таблице спецификаций: ${missingSpecsColumns.join(', ')}`);
        return { items: [], specs: {} as Record<EquipmentType, EquipmentSpecsRow> };
      }

      // Обработка данных об оборудовании
      const items: EquipmentRow[] = [];
      
      for (let i = 1; i < equipmentRows.length; i++) {
        const row = equipmentRows[i];
        
        // Проверяем, что строка содержит достаточно данных
        if (row.length <= Math.max(...Object.values(equipmentColumnIndexes))) {
          console.warn(`Строка ${i} содержит недостаточно данных`);
          continue;
        }
        
        // Проверяем тип оборудования
        const typeValue = row[equipmentColumnIndexes.type];
        if (!typeValue) {
          console.warn(`Некорректный тип оборудования в строке ${i}: ${typeValue}`);
          continue;
        }
        
        // Проверяем доступность
        const availableValue = row[equipmentColumnIndexes.available];
        if (!availableValue) {
          console.warn(`Отсутствует значение доступности в строке ${i}`);
          continue;
        }
        
        const isAvailable = availableValue.toUpperCase() === 'TRUE';
        
        items.push({
          id: row[equipmentColumnIndexes.id] || `auto-${i}`,
          type: row[equipmentColumnIndexes.type] as EquipmentType,
          swl: row[equipmentColumnIndexes.swl] || '0',
          length: row[equipmentColumnIndexes.length] || '0',
          pricePerWeek: row[equipmentColumnIndexes.pricePerWeek] || '0',
          available: isAvailable
        });
      }

      // Фильтруем только доступные элементы
      const availableItems = items.filter(item => item.available);
      
      // Обработка данных о спецификациях
      const specs: Record<EquipmentType, EquipmentSpecsRow> = {} as Record<EquipmentType, EquipmentSpecsRow>;
      
      for (let i = 1; i < specsRows.length; i++) {
        const row = specsRows[i];
        
        // Проверяем, что строка содержит достаточно данных
        if (row.length <= specsColumnIndexes.type) {
          console.warn(`Строка спецификаций ${i} содержит недостаточно данных`);
          continue;
        }
        
        const typeValue = row[specsColumnIndexes.type];
        
        // Проверяем тип оборудования
        if (!typeValue) {
          console.warn(`Некорректный тип оборудования в строке спецификаций ${i}: ${typeValue}`);
          continue;
        }
        
        const type = typeValue as EquipmentType;
        
        specs[type] = {
          type,
          specs: specsColumnIndexes.specs >= 0 && row[specsColumnIndexes.specs] 
            ? row[specsColumnIndexes.specs].split(';').map((s: string) => s.trim())
            : [],
          imageUrl: specsColumnIndexes.imageUrl >= 0 ? row[specsColumnIndexes.imageUrl] : '',
          primaryColor: specsColumnIndexes.primaryColor >= 0 && row[specsColumnIndexes.primaryColor] 
            ? row[specsColumnIndexes.primaryColor] 
            : '#FFD700',
          secondaryColor: specsColumnIndexes.secondaryColor >= 0 && row[specsColumnIndexes.secondaryColor] 
            ? row[specsColumnIndexes.secondaryColor] 
            : '#FFFDE7'
        };
      }

      console.log(`Processed ${availableItems.length} available equipment items`);
      console.log(`Processed specifications for ${Object.keys(specs).length} equipment types`);

      return { items: availableItems, specs };
    } catch (error) {
      console.error('Ошибка при обработке данных из Google Sheets:', error);
      return { items: [], specs: {} as Record<EquipmentType, EquipmentSpecsRow> };
    }
  }

  /**
   * Преобразует данные из Google Sheets в структуру данных для компонентов
   */
  transformToComponentData(data: SheetsData): Record<EquipmentType, any> {
    const result: Record<EquipmentType, any> = {} as Record<EquipmentType, any>;
    
    // Группировка данных по типу оборудования
    const itemsByType: Record<string, EquipmentRow[]> = {};
    
    // Сначала группируем данные по типу оборудования
    data.items.forEach(item => {
      if (!itemsByType[item.type]) {
        itemsByType[item.type] = [];
      }
      itemsByType[item.type].push(item);
    });
    
    // Получаем уникальные типы оборудования
    const equipmentTypes = Object.keys(itemsByType);
    
    console.log(`Found equipment types: ${equipmentTypes.join(', ')}`);
    
    // Обрабатываем каждый тип оборудования
    equipmentTypes.forEach(type => {
      const items = itemsByType[type];
      
      if (items.length > 0) {
        // Извлекаем уникальные параметры (SWL и длина/HOL)
        const swlOptions = [...new Set(items.map(item => item.swl))];
        const lengthOptions = [...new Set(items.map(item => item.length))];
        
        // Создаем карту цен
        const priceMapping: Record<string, Record<string, number>> = {};
        
        swlOptions.forEach(swl => {
          priceMapping[swl] = {};
          const swlItems = items.filter(item => item.swl === swl);
          
          swlItems.forEach(item => {
            priceMapping[swl][item.length] = parseFloat(item.pricePerWeek) || 0;
          });
        });
        
        // Получаем спецификации для этого типа
        const specs = data.specs[type]?.specs || [];
        const imageUrl = data.specs[type]?.imageUrl || '';
        
        // Создаем данные для компонента
        result[type] = {
          swlOptions,
          lengthOptions, // Используем lengthOptions для всех типов
          holOptions: lengthOptions, // Для обратной совместимости с LeverHoist
          priceMapping,
          specs,
          image: imageUrl,
          // Для разных типов могут быть специфические поля
          // Например, для RoundSling мы добавляем availableColors
          ...(type === 'RoundSling' ? {
            availableColors: specs[0]?.split(',')?.map(s => s.trim()) || []
          } : {})
        };
      }
    });
    
    return result;
  }
}

// Экспортируем инстанс сервиса для использования в компонентах
export const sheetsService = new GoogleSheetsService(); 