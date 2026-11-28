export enum BackendOrderStatus {
  AWAITING_ACCEPTANCE = "AWAITING_ACCEPTANCE",
  CONFIRMED = "CONFIRMED",
  PREPARING = "PREPARING",
  READY_FOR_PICKUP = "READY_FOR_PICKUP",
  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
  DELIVERED = "DELIVERED",
  CANCELED = "CANCELED",
}

export type StoreRejectionReason =
  "ITEM_UNAVAILABLE" | "STORE_CLOSED" | "OUT_OF_DELIVERY_AREA" | "HIGH_DEMAND";

export type CanceledBy = "CLIENT" | "STORE" | "SYSTEM";

export interface OrderCancellationDTO {
  canceledBy: CanceledBy;
  reason: string;
  canceledAt: string;
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

export interface OrderResponseDTO {
  id: number;
  userId: number;
  storeId: number;
  storeName: string;
  customerName?: string | null;
  status: BackendOrderStatus | string;
  acceptanceDeadline?: string | null;
  cancellation?: OrderCancellationDTO | null;
  totalAmount: number;
  payment: PaymentResponseDTO;
  items: OrderItemResponseDTO[];
  createdAt: string;
  updatedAt: string;
}

export interface UpdateOrderStatusRequestDTO {
  status: BackendOrderStatus;
}

export interface RejectOrderRequestDTO {
  reason: StoreRejectionReason;
}
