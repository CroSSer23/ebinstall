const XLSX = require('xlsx');

// Создаем рабочую книгу
const workbook = XLSX.utils.book_new();

// Данные для листа "Equipment"
const equipmentData = [
  ['ID', 'Type', 'SWL', 'Length', 'PricePerWeek', 'Available'],
  ['1', 'LeverHoist', '0.5t', '1.5m', '25', 'TRUE'],
  ['2', 'LeverHoist', '0.5t', '3m', '35', 'TRUE'],
  ['3', 'LeverHoist', '0.5t', '6m', '45', 'TRUE'],
  ['4', 'LeverHoist', '0.75t', '1.5m', '30', 'TRUE'],
  ['5', 'LeverHoist', '0.75t', '3m', '40', 'TRUE'],
  ['6', 'LeverHoist', '0.75t', '6m', '55', 'TRUE'],
  ['7', 'LeverHoist', '1.5t', '1.5m', '45', 'TRUE'],
  ['8', 'LeverHoist', '1.5t', '3m', '55', 'TRUE'],
  ['9', 'LeverHoist', '1.5t', '6m', '75', 'TRUE'],
  ['10', 'LeverHoist', '3.0t', '1.5m', '65', 'TRUE'],
  ['11', 'LeverHoist', '3.0t', '3m', '85', 'TRUE'],
  ['12', 'LeverHoist', '3.0t', '6m', '115', 'TRUE'],
  ['13', 'LeverHoist', '6.0t', '1.5m', '120', 'TRUE'],
  ['14', 'LeverHoist', '6.0t', '3m', '150', 'TRUE'],
  ['15', 'LeverHoist', '6.0t', '6m', '195', 'TRUE'],
  ['16', 'RoundSling', '1t', '1m', '10', 'TRUE'],
  ['17', 'RoundSling', '1t', '2m', '15', 'TRUE'],
  ['18', 'RoundSling', '1t', '3m', '20', 'TRUE'],
  ['19', 'RoundSling', '2t', '1m', '15', 'TRUE'],
  ['20', 'RoundSling', '2t', '2m', '20', 'TRUE'],
  ['21', 'RoundSling', '2t', '3m', '25', 'TRUE'],
  ['22', 'RoundSling', '3t', '1m', '20', 'TRUE'],
  ['23', 'RoundSling', '3t', '2m', '25', 'TRUE'],
  ['24', 'RoundSling', '3t', '3m', '30', 'TRUE'],
  ['25', 'WebbedSling', '1t', '1m', '8', 'TRUE'],
  ['26', 'WebbedSling', '1t', '2m', '12', 'TRUE'],
  ['27', 'WebbedSling', '1t', '3m', '16', 'TRUE'],
  ['28', 'WebbedSling', '2t', '1m', '12', 'TRUE'],
  ['29', 'WebbedSling', '2t', '2m', '16', 'TRUE'],
  ['30', 'WebbedSling', '2t', '3m', '20', 'TRUE'],
  ['31', 'WebbedSling', '3t', '1m', '16', 'TRUE'],
  ['32', 'WebbedSling', '3t', '2m', '20', 'TRUE'],
  ['33', 'WebbedSling', '3t', '3m', '24', 'TRUE'],
];

// Данные для листа "Specifications"
const specificationsData = [
  ['Type', 'Specs', 'ImageURL', 'PrimaryColor', 'SecondaryColor'],
  ['LeverHoist', 'Надежный механизм;Устойчивость к коррозии;Компактный размер;Простота использования', '/images/lever-hoist.jpg', '#FFD700', '#FFFDE7'],
  ['RoundSling', 'Red, Yellow, Green, Blue, Purple, Brown', '/images/round-sling.jpg', '#FF5722', '#FFF3E0'],
  ['WebbedSling', 'Прочный полиэстер;Устойчивость к износу;Гибкость;Легкий вес', '/images/webbed-sling.jpg', '#4CAF50', '#E8F5E9'],
];

// Создаем лист "Equipment"
const equipmentWorksheet = XLSX.utils.aoa_to_sheet(equipmentData);
XLSX.utils.book_append_sheet(workbook, equipmentWorksheet, 'Equipment');

// Создаем лист "Specifications"
const specificationsWorksheet = XLSX.utils.aoa_to_sheet(specificationsData);
XLSX.utils.book_append_sheet(workbook, specificationsWorksheet, 'Specifications');

// Устанавливаем ширину столбцов для лучшей читаемости
const equipmentCols = [
  { wch: 5 },   // ID
  { wch: 12 },  // Type
  { wch: 8 },   // SWL
  { wch: 8 },   // Length
  { wch: 12 },  // PricePerWeek
  { wch: 10 },  // Available
];
equipmentWorksheet['!cols'] = equipmentCols;

const specificationsCols = [
  { wch: 12 },  // Type
  { wch: 50 },  // Specs
  { wch: 40 },  // ImageURL
  { wch: 15 },  // PrimaryColor
  { wch: 15 },  // SecondaryColor
];
specificationsWorksheet['!cols'] = specificationsCols;

// Записываем файл
XLSX.writeFile(workbook, 'equipment_template.xlsx');

console.log('Файл equipment_template.xlsx успешно создан!'); 