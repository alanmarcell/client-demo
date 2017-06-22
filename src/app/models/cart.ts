import { IProduct } from './product';

export interface ICart {
  total: number;
  productList: IProduct[];
}

export class Cart implements ICart {
  // tslint:disable-next-line:variable-name
  total: number;
  productList: IProduct[] = [];
}
