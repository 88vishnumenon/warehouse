import { render,cleanup } from "@testing-library/react";

import Header from "../header"


function renderHeader() {
    return render(
        <Header></Header>
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