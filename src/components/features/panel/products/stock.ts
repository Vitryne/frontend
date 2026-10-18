

export const isCriticalStock = (quantity: number, alertThreshold: number) =>
    quantity < alertThreshold;