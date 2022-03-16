import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import {reducer} from "../store/reducer";
import { createStore } from "redux";
import customTheme from "../assets/theme/custom-theme";


// can improve
// 1.change redux state from any to type
export const renderWithProviders = (
    component: JSX.Element,
    reduxState: any
) => {
    const UI = (
        <ThemeProvider theme={customTheme}>
            {component}
        </ThemeProvider>
    );
    if (reduxState) {
        const store = createStore(reducer,reduxState);
        const Wrapper:any = ({ children }: { children: React.ReactChildren }) => {
            return <Provider store={store}>{children}</Provider>;
        };
        return render(UI, { wrapper: Wrapper });
    }
    return render(UI);
};



