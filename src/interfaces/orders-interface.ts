export enum BackendOrderStatus {
  NEW = "NEW",
  CONFIRMED = "CONFIRMED",
  PREPARING = "PREPARING",
  READY = "READY",
  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
  DELIVERED = "DELIVERED",
  CANCELED = "CANCELED",
}

export type BackendPaymentMethod = "PIX" | "CREDIT_CARD" | "DEBIT_CARD";

export type PaymentResult = "APPROVED" | "DECLINED";

export interface PaymentResponseDTO {
  id: number;
  amount: number;
  method: BackendPaymentMethod;
  result: PaymentResult;
  createdAt: string;
}

export interface OrderItemResponseDTO {
  id: number;
  stockId: number;
  productName: string;
  size: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface DeliveryAddressDTO {
  zipCode: string;
  street: string;
  number: string;
  neighborhood: string;
  complement?: string | null;
  city: string;
  state: string;
}

export interface OrderResponseDTO {
  id: number;
  userId: number;
  storeId: number;
  storeName: string;
  customerName?: string | null;
  status: BackendOrderStatus | string;
  itemsSubtotal: number;
  shippingAmount: number;
  totalAmount: number;
  deliveryAddress?: DeliveryAddressDTO | null;
  payment: PaymentResponseDTO;
  items: OrderItemResponseDTO[];
  createdAt: string;
  updatedAt: string;
}

export interface UpdateOrderStatusRequestDTO {
  status: BackendOrderStatus;
}
