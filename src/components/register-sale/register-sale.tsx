

import React, { useEffect, useState } from "react";

import { makeStyles } from '@material-ui/styles';
import { Autocomplete, Button, TextField, Theme } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { Warehouse } from "../../store/reducer";
import { Product, Article } from "../../types/types";
import axios from "axios";
import { getProducts, getArticles, sellProduct, sellArticles } from "../../services/services";

const useStyles = makeStyles((theme: Theme) => ({

    registerSaleWrapper:{
        display:"flex",
        justifyContent:"center"
    },

    registerSaleForm:{
        display:"flex",
        flexDirection:"column"
    },

    saleInputs:{
        marginBottom: "10px !important"   // to be changed
    },
    error: {
        color: theme.palette.ikea.ikeaBlue,
        textAlign: "center"
    },
    submitBtn:{
        backgroundColor:"#0058A3 !important"     // to be changed
    }

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
    const [types, setTypes] = useState<Array<string>>(["Products","Articles"]);
    const [itemTypes, setItemTypes] = useState<Array<SaleItem>>([]);
    const [selectedType, setSelectedType] = useState<string>('');
    const [selectedItem, setSelectedItem] = useState<SaleItem >(defaultSelectedItem);
    const [amount, setAmount] = useState<string>("");




    //state definition
    const warehouseProductList: Array<Product> = useSelector<Warehouse, Warehouse["products"]>((state => state.products));
    const warehouseArticleList: Array<Article> = useSelector<Warehouse, Warehouse["articles"]>((state => state.articles));
    const error: boolean = useSelector<Warehouse, Warehouse["error"]>((state => state.error));



    //effects
    useEffect(() => {
        getProductsandArticles();
        return function cleanup() {
            // clean up code
            source.cancel("axios request cancelled");
        };
    }, [])


    useEffect(() => {
        setSelectedItem(defaultSelectedItem);
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

    //helper function
    const registerSale = ()=>{
          console.log(selectedItem);
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

                <TextField
                    id="sale-number"
                    label="Amount"
                    className={classes.saleInputs}
                    value={amount}
                    type="amount"
                    onChange={(event) => setAmount(event.target.value)}
                    InputLabelProps={{
                        shrink: true,

                    }}
                    
                />

                <Button className={classes.submitBtn} variant="contained" onClick={registerSale}>Submit</Button>

            </form>}

            {error && <h1 className={classes.error}>There Seems To Be a Error.Can You Please Refresh</h1>}

            </section>

    );
}

export default RegisterSale;
// git remote set-url origin https://github.com/88vishnumenon/warehouse.git

