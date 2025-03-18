export interface EquipmentItem {
  name: string;
  price: string;
  svgIcon: string;
  specs?: string[];
}

export interface EquipmentDetail extends EquipmentItem {
  specs: string[];
  weight?: string;
  type?: string;
  material?: string;
  certification?: string;
  features?: string[];
  includes?: string[];
  suitable?: string;
  digital?: string;
  capacity?: string;
  weights?: string;
  stackable?: string;
}

export interface LeverHoist {
  swl: string; // Safe Working Load (tons)
  hol: string; // Height of Lift (meters)
  pricePerWeek: string; // Price in GBP per week
}

export interface LeverHoistData {
  swlOptions: string[];
  holOptions: string[];
  priceMapping: Record<string, Record<string, number>>;
  image?: string;
}

export interface RoundSling {
  swl: string;
  ewl: string;  // Effective Working Length
  pricePerWeek: string;
}

export interface RoundSlingData {
  swlOptions: string[];
  lengthOptions: string[];
  priceMapping: Record<string, Record<string, number>>;
  image?: string;
  availableColors?: string[];
}

export interface WebbedSling {
  swl: string;
  ewl: string;  // Effective Working Length
  pricePerWeek: string;
}

export interface WebbedSlingData {
  swlOptions: string[];
  lengthOptions: string[];
  priceMapping: Record<string, Record<string, number>>;
  image?: string;
  availableColors?: string[];
}

// Типы для работы с Google Sheets API
export type EquipmentType = string;

// Определение констант типов для обратной совместимости
export const EquipmentTypes = {
  LeverHoist: 'LeverHoist',
  RoundSling: 'RoundSling',
  WebbedSling: 'WebbedSling'
};

// Общий формат строки таблицы для предметов с SWL/HOL или SWL/EWL
export interface EquipmentRow {
  id: string;
  type: EquipmentType;
  swl: string;
  length: string; // HOL для LeverHoist, EWL для RoundSling и WebbedSling
  pricePerWeek: string;
  available: boolean;
}

// Интерфейс для спецификаций оборудования
export interface EquipmentSpecsRow {
  type: EquipmentType;
  specs: string[];
  imageUrl: string;
  primaryColor: string;
  secondaryColor: string;
}

// Интерфейс для загрузки данных из Google Sheets
export interface SheetsData {
  items: EquipmentRow[];
  specs: Record<EquipmentType, EquipmentSpecsRow>;
}

// Интерфейс для данных компонентов
export interface ComponentData {
  swlOptions: string[];
  lengthOptions: string[];
  holOptions?: string[];
  priceMapping: Record<string, Record<string, number>>;
  specs: string[];
  image: string;
  availableColors?: string[];
  [key: string]: unknown;
}

// Интерфейс функций API для работы с данными
export interface EquipmentDataService {
  fetchEquipmentData(sheetUrl: string): Promise<SheetsData>;
  processSheetData(equipmentRows: string[][], specsRows: string[][]): SheetsData;
  transformToComponentData(data: SheetsData): Record<EquipmentType, ComponentData>;
} 