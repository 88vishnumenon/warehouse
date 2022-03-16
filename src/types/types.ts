export interface Product{
    id:string,
    name:string,
    articles:Array<ProductArticle>
}

export interface ProductArticle{
    id:string,
    amountRequired:number
}

export interface Article {
  id: string;
  name: string;
  amountInStock: number;
}

export interface Sale {
  id: string;
  createdAt: string;
  productId: string;
  amountSold:number
}

export interface TableData {
  value: string | number;
}

export interface ProductSold {
  id: string;
  createdAt: string;
  productId: string;
  amountSold: number;
}