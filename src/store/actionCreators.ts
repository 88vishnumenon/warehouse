import * as actionTypes from "./actions";

export const addProducts = (payload: any) => {
  return {
    type: actionTypes.ADD_PRODUCTS,
    payload,
  };
};


export const addArticles = (payload: any) => {
  return {
    type: actionTypes.ADD_ARTICLES,
    payload,
  };
};

export const addSales = (payload: any) => {
  return {
    type: actionTypes.ADD_SALES,
    payload,
  };
};

export const updateProduct = (payload: any) => {
  return {
    type: actionTypes.UPDATE_PRODUCTS,
    payload,
  };
};

export const updateArticles = (payload: any) => {
  return {
    type: actionTypes.UPDATE_ARTICLES,
    payload,
  };
};
export const showError = (payload: any) => {
  return {
    type: actionTypes.ERROR,
    payload,
  };
};




