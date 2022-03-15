import axios from "../shared/interceptor";
import { Dispatch } from "react";
import {Action} from "../store/reducer"
import { addArticles, addProducts, addSales, showError, updateArticles, updateProduct } from "../store/actionCreators";

export const getProducts = (dispatch: Dispatch<Action>, cancelToken:any) => {
  axios
    .get("/products", { cancelToken })
    .then((response) => {
      dispatch(addProducts(response.data));
    })
    .catch((error) => {
      // not showing the error when the error is of cancelled request
      if (error.message != "axios request cancelled")
        dispatch(showError(error.data));
    });
};

export const getArticles = (dispatch: Dispatch<Action> ,cancelToken:any) => {
  axios.get("/articles", { cancelToken }).then((response) => {
    dispatch(addArticles(response.data));
  })
    .catch((error) => {
      // not showing the error when the error is of cancelled request
      if (error.message != "axios request cancelled")
        dispatch(showError(error.data));
    });
};

export const getSales = (dispatch: Dispatch<Action>, cancelToken: any) => {
  axios
    .get("/sales", { cancelToken })
    .then((response) => {
      dispatch(addSales(response.data));
    })
    .catch((error) => {
      // not showing the error when the error is of cancelled request
      if (error.message != "axios request cancelled")
        dispatch(showError(error.data));
    });
};

export const sellProduct = (dispatch: Dispatch<Action>, cancelToken: any,productId:string,amountSold:string) => {
  axios
    .post(`/sales/`, { cancelToken, productId, amountSold })
    .then((response) => {
      dispatch(updateProduct(response.data));
    })
    .catch((error) => {
      // not showing the error when the error is of cancelled request
      if (error.message != "axios request cancelled")
        dispatch(showError(error.data));
    });
};

export const sellArticles = (dispatch: Dispatch<Action>, cancelToken: any,id:string,amountToSubtract:number) => {
  axios
    .patch(`/articles/${id}`, { cancelToken, amountToSubtract})
    .then((response) => {
      dispatch(updateArticles(response.data));
    })
    .catch((error) => {
      // not showing the error when the error is of cancelled request
      if (error.message != "axios request cancelled")
        dispatch(showError(error.data));
    });
};
