

import React , {useState} from "react";

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@mui/material';
import ProductList from "../product-list/product-list";
import ArticleList from "../article-list /article-list";
import SaleList from "../sale-list /sale-list";
import Sale from "../register-sale/register-sale";

const useStyles = makeStyles((theme: Theme) => ({
     homePageWrapper:{
         height:"93%",
     //    border:"1px solid red",
         display:"flex",
         flexDirection:"column",
         alignItems:"center"
     },
     menuSection:{
        height:"15%",
        minWidth:"50%",
        marginTop:"4%",
     //   border: "1px solid red",
         display: "flex",
         flexDirection: "row",
         maxWidth:"80%"

     },

     menu:{
          borderRadius:4,
          border:"1px solid #eee",
          backgroundColor:theme.palette.ikea.lightWheat,
          height:theme.mixins.pxToRem(25),
          width: theme.mixins.pxToRem(200),
         marginRight: theme.mixins.pxToRem(8),
         display:"flex",
         flexDirection:"row",
         justifyContent:"center",
         cursor:"pointer",
         alignItems:"center",
         transition:"all 0.2s ease-in-out",
         lineHeight:theme.mixins.pxToRem(24),
         color:theme.palette.ikea.ikeaBlue,
         padding:theme.mixins.pxToRem(10),
         '&:hover': {
             boxShadow: "0 0 11px rgba(33,33,33,.2)", 
         },

        
     },
     menuSelected:{
         backgroundColor: theme.palette.ikea.ikeaBlue,
         color:"white"

     },
    content: {
        height:"76%",
        width:"40%"
    }
})
)

enum Menu {
    PRODUCTS_LIST = "Product List",
    ARTICLES_LIST = "Article List",
    SALES_LIST = "Sales List",
    SALE= "Sale"
}


const Homepage: React.FC<{}> = (props) => {
    //define constants
    const classes = useStyles();
    const [menuList, setMenuList] = useState<Array<string>>(["Product List","Article List","Sales List","Sale"]);
    const [selectedMenu, setSelectedMenu] = useState<string>("Product List");

     const menuSelected = (selectedValue:string)=>{
         setSelectedMenu(selectedValue);
     }


    return (
        <section  className={classes.homePageWrapper}  >
            <section className={classes.menuSection}>
         {menuList.map((menu,index)=>{
             return <div className={`${classes.menu} ${selectedMenu === menu ? classes.menuSelected : ""
                 } `} key={index} onClick={()=>menuSelected(menu)}>{menu}</div>
         })}
            </section>

            <section className={classes.content}>
                {selectedMenu === Menu.PRODUCTS_LIST && <ProductList></ProductList>}
                {selectedMenu === Menu.ARTICLES_LIST && <ArticleList></ArticleList>}
                {selectedMenu === Menu.SALES_LIST && <SaleList></SaleList>}
                {selectedMenu === Menu.SALE && <Sale></Sale>}
            </section>
        </section>

    );
}

export default Homepage;
