

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
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    margin: "0 auto",
    height: "40vh",
    width: "30%",
    display: "flex",
  },
}));


const ErrorComponent: React.FC<{}> = (props) => {

  const classes = useStyles();
  return <div className={classes.error}></div>;
}

export default ErrorComponent;
