export interface OrderData{
  paymentStatus : PaymentStatus, 
  paymentMethod : PaymentMethod, 
  orderStatus : orderStatus, 
  isCredit : boolean, 
  paidAmount: number
}

export enum PaymentMethod{
  Cod = 'cod',
  khalti = 'khalti'
}

export enum PaymentStatus{
  Paid = 'paid',
  PartialPaid = 'partialPaid',
  Unpaid = 'unpaid'
}

export enum orderStatus{
Placed = 'placed',
Shipped = 'shipped',
Delivered = 'delivered',
Completed = 'completed'
}

export enum category{
  Electronics = "electronics",
  Clothing = "clothing",
  Grocery = "grocery",
  Furniture = "furniture",
  Beauty = "beauty",
  Toys = "toys",
  Stationery = "stationery",
  Sports = "sports",
  homeAppliances = "homeAppliances"
}