import { Article, Product, Sale } from "../types/types";
import update from "react-addons-update";
export interface Warehouse {
  products: Array<Product>;
  articles: Array<Article>;
  sales: Array<Sale>;
  error: boolean;
  loading: boolean;
  stockUpdated: boolean;
}

export interface Action {
  type: string;
  payload: any;
}

export const WarehouseIntialState = {
  products: [],
  articles: [],
  sales: [],
  error: false,
  loading: false,
  stockUpdated: false,
};

export const reducer = (
  state: Warehouse = WarehouseIntialState,
  action: Action
) => {
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
      const { id, amountInStock } = action.payload;
      const articleList = state.articles;
      articleList.forEach((article) => {
        if (id === article.id) {
          article.amountInStock = amountInStock;
        }
      });
      return update(state, {
        articles: { $set: articleList },
        loading: { $set: false },
        error: { $set: false },
        stockUpdated: { $set: true },
      });

    case "SOLD_PRODUCT":
      // updating articles
      const productSold = state.products.find((product)=>product.id === action.payload.productId) ?? null;
      if(productSold){
      const productArticles = productSold.articles;
      const currentArticleList = state.articles;

       // id array
      const productArticlesIds = productArticles?.map(article => article.id);

      currentArticleList.forEach((currentArticle)=>{
          if(productArticlesIds.includes(currentArticle.id)){
              const amountSold = action.payload.amountSold;
               const articleAmountRequired = productArticles.filter((productArticle)=>   productArticle.id === currentArticle.id)[0].amountRequired;
               currentArticle.amountInStock =
                 currentArticle.amountInStock = (currentArticle.amountInStock - +amountSold * articleAmountRequired);
          }
      })

      // updating sales list
      const salesList = state.sales;
      salesList.push({
        id: action.payload.id,
        createdAt: action.payload.createdAt,
        productId: action.payload.productId,
        amountSold: action.payload.amountSold,
      });


    
       return update(state, {
         articles: { $set: currentArticleList },
         sales:{$set:salesList},
         loading: { $set: false },
         error: { $set: false },
         stockUpdated: { $set: true },
       });
    }
    else{
      return {state}
    }

    case "SHOW_LOADING":
      return {
        ...state,
        loading: true,
        error: false,
        stockUpdated: false,
      };
    case "HIDE_LOADING":
      return {
        ...state,
        loading: false,
        error: false,
        stockUpdated: false,
      };

    case "ERROR":
      return {
        ...state,
        error: true,
        loading: false,
      };

    default:
      return state;
  }
};
