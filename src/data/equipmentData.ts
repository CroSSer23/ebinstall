import { EquipmentItem, EquipmentDetail } from '@/types/equipment';

// SVG иконки для слайдера
const testWeight1000Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="4" y="8" width="16" height="12" rx="1" />
  <rect x="8" y="4" width="8" height="4" rx="1" />
  <path d="M12 12v4" />
  <path d="M9 12h6" />
</svg>`;

const testWeight2000Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="4" y="4" width="16" height="16" rx="2" />
  <path d="M9 4v16" />
  <path d="M15 4v16" />
  <path d="M4 9h16" />
  <path d="M4 15h16" />
</svg>`;

const craneTestKitSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 2v8m-8 4h16M4 8h16M8 8v4m8-4v4m-4 0v8" />
  <circle cx="12" cy="20" r="2" />
</svg>`;

const elevatorTesterSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <rect x="3" y="2" width="18" height="20" rx="2" ry="2"></rect>
  <line x1="8" y1="8" x2="16" y2="8"></line>
  <line x1="8" y1="12" x2="16" y2="12"></line>
  <line x1="8" y1="16" x2="16" y2="16"></line>
  <path d="M19 9l-3 3 3 3" />
</svg>`;

const hoistTesterSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 4v16m-8-8h16" />
  <circle cx="12" cy="12" r="10" />
  <path d="M7 7l10 10" />
  <path d="M17 7L7 17" />
</svg>`;

const forkliftTestSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M6 16h6V8H6z" />
  <path d="M14 16V4H6v4" />
  <path d="M6 20v-4" />
  <path d="M14 20v-4" />
  <path d="M4 20h16" />
  <path d="M7 8h10" />
  <path d="M18 12V8h2v8h-2" />
</svg>`;

const waterBagSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="10"></circle>
  <line x1="8" y1="12" x2="16" y2="12"></line>
  <line x1="12" y1="8" x2="12" y2="16"></line>
</svg>`;

const loadCellSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M15 7h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-1" />
  <path d="M6 7H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1" />
  <path d="M5 12h14" />
  <circle cx="10" cy="10" r="2" />
  <circle cx="14" cy="14" r="2" />
</svg>`;

// Данные для слайдера
export const popularEquipmentItems: EquipmentItem[] = [
  {
    name: 'Test Weight TW-1000',
    price: '£75 / day',
    svgIcon: testWeight1000Svg
  },
  {
    name: 'Test Weight TW-2000',
    price: '£140 / day',
    svgIcon: testWeight2000Svg
  },
  {
    name: 'Crane Testing Kit',
    price: '£180 / day',
    svgIcon: craneTestKitSvg
  },
  {
    name: 'Elevator Load Tester',
    price: '£220 / day',
    svgIcon: elevatorTesterSvg
  },
  {
    name: 'Hoist Load Testing Kit',
    price: '£150 / day',
    svgIcon: hoistTesterSvg
  },
  {
    name: 'Forklift Test Weights',
    price: '£190 / day',
    svgIcon: forkliftTestSvg
  },
  {
    name: 'Water Bag Test Kit',
    price: '£110 / day',
    svgIcon: waterBagSvg
  },
  {
    name: 'Load Cell System',
    price: '£240 / day',
    svgIcon: loadCellSvg
  }
];

// Данные для сетки оборудования
export const equipmentDetails: EquipmentDetail[] = [
  {
    name: 'Test Weight TW-1000',
    price: '£75 / day',
    svgIcon: testWeight1000Svg,
    specs: [
      'Weight: 1000 kg',
      'Type: For cranes and heavy lifting',
      'Material: Steel with protective coating',
      'Certification: LOLER compliant'
    ]
  },
  {
    name: 'Test Weight TW-2000',
    price: '£140 / day',
    svgIcon: testWeight2000Svg,
    specs: [
      'Weight: 2000 kg',
      'Type: For elevators and industrial lifts',
      'Material: Cast iron with handling points',
      'Certification: EN 81 compliant'
    ]
  },
  {
    name: 'Crane Testing Kit',
    price: '£180 / day',
    svgIcon: craneTestKitSvg,
    specs: [
      'Includes: Load cells, monitoring equipment',
      'Suitable for: Tower and mobile cranes',
      'Digital readout: Yes, with data logging',
      'Certification: LOLER, ISO 9001'
    ]
  },
  {
    name: 'Elevator Load Tester',
    price: '£220 / day',
    svgIcon: elevatorTesterSvg,
    specs: [
      'Capacity: Up to 3000 kg',
      'Type: Water load system with precise measurement',
      'Features: Adjustable weight control',
      'Certification: EN 81, ISO 9001'
    ]
  },
  {
    name: 'Hoist Load Testing Kit',
    price: '£150 / day',
    svgIcon: hoistTesterSvg,
    specs: [
      'Capacity: Up to 2000 kg',
      'Type: For chain and wire rope hoists',
      'Features: Digital load monitor with overload alarm',
      'Certification: LOLER, PUWER'
    ]
  },
  {
    name: 'Forklift Test Weights Set',
    price: '£190 / day',
    svgIcon: forkliftTestSvg,
    specs: [
      'Weights included: 500kg, 1000kg, 1500kg',
      'Stackable: Yes, with secure interlocking system',
      'Material: Steel with fork pockets',
      'Certification: LOLER, FLTA standards'
    ]
  }
]; 