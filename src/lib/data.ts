import type { InventoryItem, Sale, Alert, UsageData } from './types';

export const inventoryData: InventoryItem[] = [
  { id: '1', name: 'Paracetamol 500mg', sku: 'PC-500', quantity: 80, expiryDate: '2025-12-31', supplier: 'Pharma Inc.', status: 'In Stock' },
  { id: '2', name: 'Amoxicillin 250mg', sku: 'AM-250', quantity: 25, expiryDate: '2024-11-30', supplier: 'MedLife', status: 'Low Stock' },
  { id: '3', name: 'Ibuprofen 200mg', sku: 'IB-200', quantity: 150, expiryDate: '2026-06-30', supplier: 'HealthWell', status: 'In Stock' },
  { id: '4', name: 'Cetirizine 10mg', sku: 'CZ-010', quantity: 0, expiryDate: '2024-09-30', supplier: 'Pharma Inc.', status: 'Out of Stock' },
  { id: '5', name: 'Vitamin C 1000mg', sku: 'VC-1000', quantity: 200, expiryDate: '2025-08-31', supplier: 'VitaSource', status: 'In Stock' },
  { id: '6', name: 'Aspirin 81mg', sku: 'AS-081', quantity: 45, expiryDate: '2024-07-20', supplier: 'MedLife', status: 'In Stock' },
  { id: '7', name: 'Old Medicine', sku: 'OM-001', quantity: 10, expiryDate: '2024-01-15', supplier: 'HealthWell', status: 'Expired' },
];

export const salesData: Sale[] = [
  { id: 'S001', date: '2024-05-20', items: [{ itemId: '1', name: 'Paracetamol 500mg', quantity: 2 }], totalAmount: 5.00, paymentRef: 'MPESA-XYZ123' },
  { id: 'S002', date: '2024-05-19', items: [{ itemId: '3', name: 'Ibuprofen 200mg', quantity: 1 }, { itemId: '2', name: 'Amoxicillin 250mg', quantity: 1 }], totalAmount: 12.50, paymentRef: 'MPESA-ABC456' },
  { id: 'S003', date: '2024-05-18', items: [{ itemId: '5', name: 'Vitamin C 1000mg', quantity: 3 }], totalAmount: 15.00, paymentRef: 'MPESA-DEF789' },
];

export const alertsData: Alert[] = [
  { id: 'A01', title: 'Low Stock: Amoxicillin 250mg', description: 'Stock for Amoxicillin 250mg is at 25 units. Reorder soon.', date: '2024-05-20', read: false },
  { id: 'A02', title: 'Out of Stock: Cetirizine 10mg', description: 'Stock for Cetirizine 10mg is 0. Immediate reorder required.', date: '2024-05-19', read: false },
  { id: 'A03', title: 'Expired: Old Medicine', description: '10 units of Old Medicine have expired. Please dispose of them.', date: '2024-01-16', read: true },
];

export const usageHistoryData: UsageData[] = [
  { month: 'Jan', Paracetamol: 120, Amoxicillin: 80, Ibuprofen: 100 },
  { month: 'Feb', Paracetamol: 110, Amoxicillin: 70, Ibuprofen: 90 },
  { month: 'Mar', Paracetamol: 150, Amoxicillin: 95, Ibuprofen: 110 },
  { month: 'Apr', Paracetamol: 130, Amoxicillin: 85, Ibuprofen: 120 },
  { month: 'May', Paracetamol: 160, Amoxicillin: 100, Ibuprofen: 130 },
  { month: 'Jun', Paracetamol: 140, Amoxicillin: 90, Ibuprofen: 115 },
];
