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
Delivered = 'delevered',
Completed = 'completed'
}