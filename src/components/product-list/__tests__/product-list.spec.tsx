import { renderWithProviders } from "../../../shared/renderHelper";
import { Article, Product } from "../../../types/types";
import ProductList from "../product-list";

// mocks
export const MOCK_STATE = {
    products:[
        {
            "id": "a269a247-0d38-4b47-9630-79c9ae545b68",
            "name": "Dining Chair111111",
            "articles": [
                {
                    "id": "0517f083-0e15-4876-8d1f-6fa45900431c",
                    "amountRequired": 4
                },
                {
                    "id": "831b92b8-677b-42cc-a585-335ea4ccccb6",
                    "amountRequired": 1
                },
                {
                    "id": "addc65a8-c759-41d8-a18a-89fe446ad484",
                    "amountRequired": 8
                }
            ]
        },

    ],
    articles:[
        {
            "id": "0517f083-0e15-4876-8d1f-6fa45900431c",
            "name": "Leg",
            "amountInStock": 4
        }
    ]

};
let mockGetProducts = jest.fn(() => {
    return Promise.resolve()
});

let mockGetArticles = jest.fn(() => {
    return Promise.resolve( )
});

jest.mock('../../../services/services', () => {
    return function () {
        return { getProducts: mockGetProducts, getArticles: mockGetArticles };
    };
});

const renderProductList = (
    state: {
        products: Array<Product>,
        articles: Array<Article>
    }   
) => {
    return renderWithProviders(
        <ProductList></ProductList>,
        state
    );
};

describe("<ProductList /> test utils", () => {
    test("should products be loaded in the component", async () => {
        const { findByTestId} = renderProductList(MOCK_STATE);
        const productAccordian = await findByTestId('product-accordian');
        expect(productAccordian).toBeInTheDocument();
    })
})