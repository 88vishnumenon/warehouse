import { makeStyles } from "@material-ui/styles";
import { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
    loadingWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "40%",
    },

    error: {
        backgroundImage: `url(/assets/images/error.jpeg)`,
        backgroundPosition: "center",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        margin: "0 auto",
        height: "40vh",
        width: "70%",
        display: "flex",
    },
}));

const Error: React.FC<{}> = (props) => {
    const classes = useStyles();
    return <div data-testid="error" className={classes.error}></div>;
};

export default Error;