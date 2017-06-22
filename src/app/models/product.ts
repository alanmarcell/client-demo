export interface IProduct {
  // tslint:disable-next-line:variable-name
  _id: string;
  name: string;
  price: number;
  category: string;
  quantity?: number;
  subTotal?: number;
}


export class Product {
  // tslint:disable-next-line:variable-name
  _id: string;
  name: string;
  price: number;
  category: string;
  quantity?: number;
  subTotal?: number;
}
