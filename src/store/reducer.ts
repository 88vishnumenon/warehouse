import { Article, Product, Sale } from "../types/types";

export interface Warehouse{
    products:Array<Product>;
    articles:Array<Article>;
    sales:Array<Sale>,
    error:boolean

}

export interface Action {
  type: string;
  payload: any;
}

export const WarehouseIntialState = {
  products: [],
  articles:[],
  sales:[],
  error:false
};



export const reducer = (state: Warehouse = WarehouseIntialState, action: Action) => {
  switch (action.type) {
    case "ADD_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        error:false
      };

    case "ADD_ARTICLES":
      return {
        ...state,
        articles: action.payload,
        error: false,
      };

    case "ADD_SALES":
      return {
        ...state,
        sales: action.payload,
        error: false,
      };

    case "ERROR":
      console.log("ERROR",action.payload);
      return {
        ...state,
        error: true,
      };

    default:
      return state;
  }
};