

import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from '@material-ui/styles';
import { Theme,CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";

import { getArticles, getProducts, getSales } from "../../services/services";
import { Warehouse } from "../../store/reducer";
import { Article, Product, Sale, TableData } from "../../types/types";
import WareHouseTable from "../table/table";
import { hideLoading, showLoading } from "../../store/actionCreators";
import Error from "../error/error";

const useStyles = makeStyles((theme: Theme) => ({
    loadingWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "40%"
    },
    error: {
        color: theme.palette.ikea.ikeaBlue,
        textAlign: "center"
    }
})
)




const SaleList: React.FC<{}> = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    const [saleHeaders, setSaleHeaders] = useState<Array<string>>(["DATE","PRODUCT TYPE" ,"AMOUNT SOLD"]);
    const [saleList, setSaleList] = useState<Array<Array<TableData>>>([]);
    const [saleListUpdated,setSalesListUpdated] = useState<boolean>(false);

    const warehouseSaleList: Array<Sale> = useSelector<Warehouse, Warehouse["sales"]>((state => state.sales));
    const warehouseProductList: Array<Product> = useSelector<Warehouse, Warehouse["products"]>((state => state.products));
    const error: boolean = useSelector<Warehouse, Warehouse["error"]>((state => state.error));
    const loading: boolean = useSelector<Warehouse, Warehouse["loading"]>((state => state.loading));

    //effects
    useEffect(() => {
    // if we have already the data for sales the dont fetch again
        if (!warehouseSaleList.length || error){
            dispatch(showLoading());
            getSales(dispatch, source.token);
        }
        if ((!warehouseProductList.length ) || error) {
            dispatch(showLoading());
            getProducts(dispatch, source.token);
        }

        return function cleanup() {
            // clean up code
            dispatch(hideLoading());
            source.cancel("axios request cancelled");
        };
    }, [])

    useEffect(() => {
        if (!warehouseProductList.length && !warehouseSaleList.length) return;
        let saleDetails: Array<Array<TableData>> = [];
        warehouseSaleList.forEach((sale: Sale) => {
            let saleRecord: Array<TableData> = [];
            const saleProduct: Product = warehouseProductList.filter((product: Product) => product.id === sale.productId)[0];
            saleRecord.push(setSale(formatDate(sale.createdAt)));
            saleRecord.push(setSale(saleProduct ? saleProduct.name:" "));
            saleRecord.push(setSale(sale.amountSold));
            saleDetails.push(saleRecord);
        })
        setSaleList(saleDetails);
    }, [warehouseSaleList, warehouseProductList]);

    // helper methods
    const setSale = (saleAttr: string | number) => {
        return {
            value: saleAttr
        }; 
    };

    const formatDate = (dateString:string)=>{
        const dateValue = dateString.split("T")[0];
        const date = new Date(dateValue);
        const yyyy = date.getFullYear();
        let mm = date.getMonth() + 1; 
        let dd = date.getDate();

        return `${dd}-${mm}-${yyyy}`

    }
    return (
        <section>
            {(warehouseSaleList.length > 0 && warehouseProductList.length > 0 || (!loading && !error && (warehouseSaleList.length == 0 || warehouseProductList.length === 0))) &&  <WareHouseTable headers={saleHeaders} data={saleList}></WareHouseTable>}
            {(loading  ) && <section className={classes.loadingWrapper}>
                <CircularProgress />
            </section>}

            {error && <section data-testid="error"><Error></Error></section>}


        </section>

    );
}

export default SaleList;
