

import React, {useEffect,useState} from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from "axios";

import { makeStyles } from '@material-ui/styles';
import { Chip, CircularProgress, Theme } from '@mui/material';
import { getArticles, getProducts } from "../../services/services";
import { useDispatch, useSelector } from "react-redux";
import { Article, Product, ProductArticle } from "../../types/types";
import { Warehouse } from "../../store/reducer";


const useStyles = makeStyles((theme: Theme) => ({
    productListWrapper:{
        height:"100%"
    },
    loadingWrapper:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        height:"40%"
    },

    error:{
        color:theme.palette.ikea.ikeaBlue,
        textAlign:"center"
    },
    articleChip:{
        marginLeft:theme.mixins.pxToRem(10)
    }
})
);

// naming should be changes
// this is the interface for products with articles
interface ProductArtcile{
    name:string,
    articles: Array<PArticle>
}

interface PArticle{
    name: string | undefined,
    amountRequired:number
}


const ProductList: React.FC<{}> = (props) => {
    //define constants
    const classes = useStyles();
    const dispatch = useDispatch();
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
     
    //state definition
    const warehouseProductList: Array<Product> = useSelector<Warehouse, Warehouse["products"]>((state => state.products));
    const warehouseArticleList: Array<Article> = useSelector<Warehouse, Warehouse["articles"]>((state => state.articles));
    const error: boolean = useSelector<Warehouse, Warehouse["error"]>((state => state.error));


    
    //states
    const [productList, setProductList] = useState<Array<Product>>([])
    const [productArticleList, setProductArticleList] = useState < Array < ProductArtcile>>([])
   
    //effects
    useEffect(() => {
        getProductsandArticles();
        return function cleanup() {
            // clean up code
            source.cancel("axios request cancelled");
        };
    }, [])


    useEffect(() => {
        mapProductArticle(warehouseProductList, warehouseArticleList)
    }, [warehouseProductList, warehouseArticleList]);


    // API Functions
    const getProductsandArticles = async () =>{
   // if we have already the data for products the dont fetch again
        if ((!warehouseProductList.length || !warehouseArticleList.length) || error){
            getProducts(dispatch, source.token);
            getArticles(dispatch, source.token);
        }
          
    }

    // helper functions
    const mapProductArticle = (productList:Array<Product>,articleList:Array<Article>)=>{
        const ProductArtcileDetails: Array<ProductArtcile> = [];
        productList.forEach((product:Product)=>{
            const productArticle: ProductArtcile={
                name:product.name,
                articles:findArticle(product.articles,articleList)
            }
            ProductArtcileDetails.push(productArticle);
        })
        console.log("!@!@", ProductArtcileDetails);
        setProductArticleList(ProductArtcileDetails)
    }

    const findArticle = (productArticle: Array<ProductArticle>, articleList: Array<Article>) =>{
        const PArticleList:Array < PArticle > = [];
        productArticle.forEach((productarticle: ProductArticle)=>{
            const article = articleList.find(article => article.id === productarticle.id )
            const productArticle: PArticle={
                name: article?.name,
                amountRequired: productarticle.amountRequired
            };
            PArticleList.push(productArticle)
        })

        return PArticleList;
    }

    const setarticleLabel = (productArticleValue: PArticle)=>{
        return `${productArticleValue.name} - ${productArticleValue.amountRequired}`;
    }

     // To do: change aria controls and id name
    return (
        <section  className={classes.productListWrapper}>
            {productArticleList.length > 0 && productArticleList.map((product: ProductArtcile,index:number)=>{
               return  <Accordion  key={index}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>{product.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {product.articles.map((productarticle,index)=>{
                            return (<Chip
                            className={classes.articleChip}
                                label={setarticleLabel(productarticle)} 
                                key={index}
                            />
                            )
                        })}
                      
                    </AccordionDetails>
                </Accordion>
            })}

            {(!productArticleList.length && !error) &&  <section className={classes.loadingWrapper}>
                <CircularProgress />

            </section>}

            {error && <h1 className={classes.error}>There Seems To Be a Error.Can You Please Refresh</h1>}
  
            </section>

    );
}

export default ProductList;
{/* <Typography key={index}>
    {productarticle.name}-{productarticle.amountRequired}
</Typography> */}

//git remote set - url origin git @github.com: 88vishnumenon / ikea - warehouse.git
