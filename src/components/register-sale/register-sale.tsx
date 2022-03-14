

import React, { useEffect, useState } from "react";

import { makeStyles } from '@material-ui/styles';
import { Autocomplete, Button, CircularProgress, Theme } from '@mui/material';
import TextField from '@mui/material/TextField';

import { useDispatch, useSelector } from "react-redux";
import { Warehouse } from "../../store/reducer";
import { Product, Article } from "../../types/types";
import axios from "axios";
import { getProducts, getArticles, sellProduct, sellArticles } from "../../services/services";
import { positions } from "@mui/system";
import { hideLoading, showLoading } from "../../store/actionCreators";

const useStyles = makeStyles((theme: Theme) => ({

    registerSaleWrapper:{
        display:"flex",
        justifyContent:"center",
        position:"relative"
    },

    registerSaleForm:{
        display:"flex",
        flexDirection:"column"
    },

    saleInputs:{
        marginBottom: "20px !important"   // to be changed
    },
    error: {
        color: theme.palette.ikea.ikeaBlue,
        textAlign: "center"
    },
    submitBtn:{
        backgroundColor:"#0058A3 !important",
        "&:disabled": {
            backgroundColor: "#fafafa !important"  // to be changed
        }     
    },
    input: {
        color: "#2EFF22",
    },

    loadingWrapper:{
        position:"absolute",
        width:"100%",
        height:"100%",
        border:"1px solid red",
        backgroundColor:"#c4c4c4",  // to be changed
        opacity:0.1
    },
    loadingCircleWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "40%"
    },

})
)

interface SaleItem{
    id:string;
    label:string
}


const RegisterSale: React.FC<{}> = (props) => {
    //define constants
    const classes = useStyles();
    const dispatch = useDispatch();
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    const defaultSelectedItem: SaleItem={
        label:"",
        id:""
    }
    const [types, setTypes] = useState<Array<string>>([]);
    const [itemTypes, setItemTypes] = useState<Array<SaleItem>>([]);
    const [selectedType, setSelectedType] = useState<string>('');
    const [selectedItem, setSelectedItem] = useState<SaleItem >(defaultSelectedItem);
    const [amount, setAmount] = useState<string>("");




    //state definition
    const warehouseProductList: Array<Product> = useSelector<Warehouse, Warehouse["products"]>((state => state.products));
    const warehouseArticleList: Array<Article> = useSelector<Warehouse, Warehouse["articles"]>((state => state.articles));
    const loading: boolean = useSelector<Warehouse, Warehouse["loading"]>((state => state.loading));
    const error: boolean = useSelector<Warehouse, Warehouse["error"]>((state => state.error));



    //effects
    useEffect(() => {
        getProductsandArticles();
        setTypes(["Products", "Articles"]);
        return function cleanup() {
            // clean up code
            dispatch(hideLoading())
            source.cancel("axios request cancelled");
        };
    }, [])


    useEffect(() => {
       // setSelectedItem(defaultSelectedItem);
        const itemList: Array<SaleItem> = [];
        if (selectedType === "Products") {
            warehouseProductList.forEach((product: Product) => {
                const saleItem: SaleItem={
                    label:product.name,
                    id:product.id
                }
                itemList.push(saleItem);
            })
        }
        else {
            warehouseArticleList.forEach((article: Article) => {
                const saleItem: SaleItem = {
                    label: article.name,
                    id: article.id
                }
                itemList.push(saleItem);
            })
        }

        setItemTypes(itemList);
    }, [selectedType])


   //test
    useEffect(() => {
        console.log("selectedItem",selectedItem);
    }, [selectedItem])

    //helper function
    const registerSale = ()=>{
          console.log(selectedItem);
        dispatch(showLoading())
        if (selectedType === "Products"){
            sellProduct(dispatch, source.token, selectedItem.id,+amount) 
        }
        else{
            sellArticles(dispatch, source.token, selectedItem.id, +amount) 

         }
    }


    // API Functions
    const getProductsandArticles = async () => {
        // if we have already the data for products the dont fetch again
        if ((!warehouseProductList.length || !warehouseArticleList.length) || error) {
            getProducts(dispatch, source.token);
            getArticles(dispatch, source.token);
        }

    }

      // to do validations
    return (
        <section className={classes.registerSaleWrapper} >
        { !error &&  <form className={classes.registerSaleForm}>
            <Autocomplete
                id="sale-types"
                inputValue={selectedType}
                onChange={(event, value) => setSelectedType(value?value:"")}
                options={types}
                className={classes.saleInputs}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Type" />}
            />

                <Autocomplete
                    id="sale-item-types"
                    inputValue={selectedItem ? selectedItem.label : ""}
                    onChange={(event, value) => setSelectedItem(value ? value : defaultSelectedItem)}
                    options={itemTypes}
                    className={classes.saleInputs}
                    sx={{ width: 300 }}
                    loading={!warehouseArticleList.length && !error}
                    renderInput={(params) => <TextField {...params} label="Items" />}
                />
{/* 
                <TextField
                    id="outlined-number"
                    label="Amount"
                    className={classes.saleInputs}
                    value={amount}
                    type="amount"
                    onChange={(event) => setAmount(event.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{ className: classes.textInput }}

                    
                /> */}


                <TextField
                    id="outlined-number"
                    variant="outlined"
                    className={classes.saleInputs}
                    label="Amount"
                    value={amount}
                    type="amount"
                    onChange={(event) => setAmount(event.target.value)}
                    inputProps={{
                        className: classes.input
                    }}
                />

                <Button className={classes.submitBtn} disabled={!selectedType || !selectedItem.label || !amount} variant="contained" onClick={registerSale}>Submit</Button>

            </form>}

            {(loading || error) && <section className={classes.loadingWrapper}>
                <section className={classes.loadingCircleWrapper}>
                    <CircularProgress />

                </section>
            </section>}

            {error && <h1 className={classes.error}>There Seems To Be a Error.Can You Please Refresh</h1>}

            </section>

    );
}

export default RegisterSale;
// git remote set-url origin https://github.com/88vishnumenon/warehouse.git

