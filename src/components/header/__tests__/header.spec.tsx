import { render,cleanup } from "@testing-library/react";
import { ThemeProvider } from '@material-ui/styles';

import customTheme from '../../../assets/theme/custom-theme';

import Header from "../header"


function renderHeader() {
    return render(
        <ThemeProvider theme={customTheme}>
        <Header></Header>
        </ThemeProvider>
    );
}

afterEach(() => {
    jest.restoreAllMocks();
    cleanup();
});

describe("<Header /> test utils", () => {
    // snapshots
    test('should match snapshot', () => {
        const { asFragment } = renderHeader();
        expect(asFragment()).toMatchSnapshot();
    });

})