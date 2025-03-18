import React, { useEffect, useState } from 'react';
import EquipmentCard from './EquipmentCard';
import { sheetsService } from '@/services/sheetsService';
import { EquipmentTypes } from '@/types/equipment';
import { leverHoistSvg, roundSlingSvg, webbedSlingSvg } from '@/data/equipmentIcons';

// Фиксированный URL для загрузки данных Google Sheets
const GOOGLE_SHEETS_URL = 'https://docs.google.com/spreadsheets/d/1aulId2489sH3YyxJKpfvIWq7-yWdvhVK/edit?gid=1275867136';

// SVG иконки по умолчанию для известных типов оборудования
const defaultSvgIcons: Record<string, string> = {
  [EquipmentTypes.LeverHoist]: leverHoistSvg,
  [EquipmentTypes.RoundSling]: roundSlingSvg,
  [EquipmentTypes.WebbedSling]: webbedSlingSvg
};

const EquipmentContainer: React.FC = () => {
  const [equipmentData, setEquipmentData] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Загрузка данных из Google Sheets
  const loadEquipmentData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Loading equipment data from:', GOOGLE_SHEETS_URL);
      const sheetsData = await sheetsService.fetchEquipmentData(GOOGLE_SHEETS_URL);
      
      console.log('Received sheets data:', sheetsData);
      
      if (sheetsData.items.length === 0) {
        setError('No equipment items found in the spreadsheet. Please check the sheet structure and data format.');
        setEquipmentData(null);
        setLoading(false);
        return;
      }
      
      const transformedData = sheetsService.transformToComponentData(sheetsData);
      console.log('Transformed data:', transformedData);
      
      if (Object.keys(transformedData).length === 0) {
        setError('Failed to process equipment data. Please check the sheet structure and data format.');
        setEquipmentData(null);
      } else {
        setEquipmentData(transformedData);
      }
    } catch (err) {
      console.error('Error loading equipment data:', err);
      setError(`Failed to load equipment data: ${err instanceof Error ? err.message : String(err)}`);
      setEquipmentData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEquipmentData();
  }, []);

  // Преобразуем данные из различных источников в единый массив элементов
  const getAllEquipmentItems = () => {
    if (!equipmentData) return [];
    
    // Собираем все элементы оборудования из разных категорий в единый массив
    const allItems: Array<{type: string, title: string, data: any}> = [];
    
    Object.entries(equipmentData).forEach(([type, typeData]) => {
      // Проверяем, что у нас есть корректные данные для этого типа оборудования
      if (typeData && typeData.swlOptions && typeData.swlOptions.length > 0) {
        // Добавляем один элемент для каждого типа оборудования
        allItems.push({
          type,
          title: type, // Используем тип как заголовок
          data: {
            ...typeData,
            title: type,
            // Убедимся, что все необходимые свойства присутствуют
            swlOptions: typeData.swlOptions || [],
            lengthOptions: typeData.lengthOptions || typeData.holOptions || [],
            priceMapping: typeData.priceMapping || {},
            specs: typeData.specs || [],
            image: typeData.image || ''
          }
        });
      }
    });
    
    console.log('Processed items for rendering:', allItems);
    return allItems;
  };

  // Рендеринг сетки плиток с оборудованием
  const renderEquipmentGrid = () => {
    const allItems = getAllEquipmentItems();
    
    if (allItems.length === 0) {
      return (
        <div className="no-equipment-message">
          <p>No equipment items found. Please check the data source.</p>
        </div>
      );
    }
    
    // Добавляем класс в зависимости от количества элементов
    const itemsCountClass = `items-${allItems.length}`;
    
    // Для поддержки медиа-запросов и адаптивности, возвращаем просто класс без стилей
    return (
      <div className={`equipment-cards-grid ${itemsCountClass}`}>
        {allItems.map((item, index) => (
          <EquipmentCard
            key={`${item.type}-${index}`}
            type={item.type}
            title={item.title}
            data={item.data}
            defaultIcon={defaultSvgIcons[item.type] || ''}
          />
        ))}
      </div>
    );
  };

  // Отображение компонента с контейнером оборудования
  return (
    <div className="equipment-container">
      <h2 className="equipment-main-title">Equipment Catalogue</h2>
      
      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading equipment data...</p>
        </div>
      )}
      
      {error && (
        <div className="error-container">
          <h3>Error Loading Equipment</h3>
          <p>{error}</p>
          <div className="error-details">
            <p>Troubleshooting tips:</p>
            <ul>
              <li>Check if the Google Sheets URL is correct and accessible</li>
              <li>Verify that the sheet has the expected columns and data format</li>
              <li>Make sure the spreadsheet is publicly accessible or has appropriate permissions</li>
            </ul>
            <button className="retry-btn" onClick={loadEquipmentData}>
              Retry Loading
            </button>
          </div>
        </div>
      )}
      
      {!loading && !error && equipmentData && renderEquipmentGrid()}
    </div>
  );
};

export default EquipmentContainer; 