import { Article, Product, Sale } from "../types/types";
import update from "react-addons-update";
export interface Warehouse{
    products:Array<Product>;
    articles:Array<Article>;
    sales:Array<Sale>,
    error:boolean
    loading:boolean

}

export interface Action {
  type: string;
  payload: any;
}

export const WarehouseIntialState = {
  products: [],
  articles:[],
  sales:[],
  error:false,
  loading:false
};



export const reducer = (state: Warehouse = WarehouseIntialState, action: Action) => {
  switch (action.type) {
    case "ADD_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        error: false,
        loading: false,
      };

    case "ADD_ARTICLES":
      return {
        ...state,
        articles: action.payload,
        error: false,
        loading: false,
      };

    case "ADD_SALES":
      return {
        ...state,
        sales: action.payload,
        error: false,
        loading: false,
      };
    case "UPDATE_ARTICLES":
       const {id,amountInStock} = action.payload;
       const articleList = state.articles;
       articleList.forEach((article)=>{
           if(id === article.id){
             article.amountInStock = amountInStock;
           }
       })
   return update(state, {
     articles: { $set: articleList },
     loading:{$set:false},
     error:{$set:false}
   });
    case "SHOW_LOADING":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "HIDE_LOADING":
      return {
        ...state,
        loading: false,
        error: false,
      };

    case "ERROR":
      console.log("ERROR", action.payload);
      return {
        ...state,
        error: true,
        loading: false,
      };

    default:
      return state;
  }
};