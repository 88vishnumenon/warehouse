

import React from "react";

import { makeStyles } from '@material-ui/styles';
import { Theme } from '@mui/material';

const useStyles = makeStyles((theme: Theme) => ({
     header:{
         width:"100%",
         backgroundColor:theme.palette.ikea.ikeaBlue

     },
     logo:{
         height: theme.mixins.pxToRem(50),
         width: theme.mixins.pxToRem(100)
     }
})
);




const Header: React.FC<{}> = (props) => {
     //define constants
    const classes = useStyles();


    return (
        <section className={classes.header} >
            <img src="/assets/images/logo.png" className={classes.logo}/>
        </section>

    );
}

export default Header;
