import { Article, Product, Sale } from "../types/types";
import * as actionTypes from "./actions";

export const addProducts = (payload: Array<Product>) => {
  return {
    type: actionTypes.ADD_PRODUCTS,
    payload,
  };
};


export const addArticles = (payload: Array<Article>) => {
  return {
    type: actionTypes.ADD_ARTICLES,
    payload,
  };
};

export const addSales = (payload: Array<Sale>) => {
  return {
    type: actionTypes.ADD_SALES,
    payload,
  };
};

export const updateProduct = (payload: Product) => {
  return {
    type: actionTypes.UPDATE_PRODUCTS,
    payload,
  };
};

export const updateArticles = (payload: Article) => {
  return {
    type: actionTypes.UPDATE_ARTICLES,
    payload,
  };
};

export const showLoading = () => {
  return {
    type: actionTypes.SHOW_LOADING,
  };
};
export const hideLoading = () => {
  return {
    type: actionTypes.HIDE_LOADING,
  };
};
export const showError = (payload: boolean) => {
  return {
    type: actionTypes.ERROR,
    payload,
  };
};




