

import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/styles';
import { Theme, CircularProgress} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { Article, TableData } from "../../types/types";
import { Warehouse } from "../../store/reducer";
import WareHouseTable from "../table/table";
import { getArticles } from "../../services/services";

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




const ArticleList: React.FC<{}> = (props) => {
    //define constants
    const classes = useStyles();
    const dispatch = useDispatch();
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    const [articleHeaders, setArticleHeaders] = useState<Array<string>>(["NAME","STOCK"]);
    const [articleList, setArticleList] = useState<Array<Array<TableData>>>([]);

    //state definition
    const warehouseArticleList: Array<Article> = useSelector<Warehouse, Warehouse["articles"]>((state => state.articles));
    const error: boolean = useSelector<Warehouse, Warehouse["error"]>((state => state.error));


   //effects
    useEffect(() => {
        // if we have already the data for articles the dont fetch again
        if (!warehouseArticleList.length || error){
            getArticles(dispatch,source.token)
        }
        return function cleanup() {
            // clean up code
            source.cancel("axios request cancelled");
        };
    }, [warehouseArticleList]);
    useEffect(() => {
        console.log("warehouseArticleList", warehouseArticleList);
        let articleDetails: Array<Array<TableData>> = [];
        warehouseArticleList.forEach((article:Article) => {
            let articleRecord: Array<TableData> = [];
            articleRecord.push(setArticle(article.name))
            articleRecord.push(setArticle(article.amountInStock))
            articleDetails.push(articleRecord);
        })
        setArticleList(articleDetails);
    }, [warehouseArticleList]);

    //helperfunctions
    const setArticle = (articleAttr: string | number) => {
        return {
            value: articleAttr
        };
    };

    return (
        <section  >
            {articleList.length>0 && <WareHouseTable headers={articleHeaders} data={articleList}></WareHouseTable>}
            {(!articleList.length &&  !error) && <section className={classes.loadingWrapper}>
                <CircularProgress />

            </section>}
            {error && <h1 className={classes.error}>There Seems To Be a Error.Can You Please Refresh</h1>}

            </section>

    
    );


}

export default ArticleList;