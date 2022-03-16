


import { fireEvent, within } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { renderWithProviders } from "../../../shared/renderHelper";
import { Article, Product } from "../../../types/types";
import RegisterSale from "../register-sale";

// mocks
export const MOCK_STATE = {
    products: [
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
    articles: [
        {
            "id": "0517f083-0e15-4876-8d1f-6fa45900431c",
            "name": "Leg",
            "amountInStock": 400
        },
        {
            "id": "addc65a8-c759-41d8-a18a-89fe446ad484",
            "name": "Screw",
            "amountInStock": 600
        },
        {
            "id": "831b92b8-677b-42cc-a585-335ea4ccccb6",
            "name": "Seat",
            "amountInStock": 200
        },
        {
            "id": "6892b98b-9b87-4520-9a9e-7528f1d78cb4",
            "name": "Table Top",
            "amountInStock": 100
        }
    ]

};

//mock-apis
// const sellProductMock= jest.fn(() =>{})
// jest.mock('../../../services/services', () => ({
//     sellProduct: sellProductMock
// }));

const mockSellProduct = jest.fn();

jest.mock('../../../services/services', () => ({
    sellProduct: () => mockSellProduct, 
}));




const renderRegisterSaleList = (
    state: {
        products: Array<Product>,
        articles: Array<Article>
    }
) => {
    return renderWithProviders(
        <RegisterSale></RegisterSale>,
        state
    );
};

describe("<RegisterSale /> test utils", () => {
    test("should match snapshot", async () => {
        const { asFragment } = renderRegisterSaleList(MOCK_STATE);
        expect(asFragment()).toMatchSnapshot();
    })

    test("should submit button is disabled",async()=>{
        const { findByTestId } = renderRegisterSaleList(MOCK_STATE);
        const submitBtn = await findByTestId("submit-btn");
        expect(submitBtn).toBeDisabled();
    })

   test("should all elements be in the document",async()=>{
       const { findByTestId } = renderRegisterSaleList(MOCK_STATE);
       const saleType = (await findByTestId("sale-types")) as HTMLSelectElement;
       const saleItem = (await findByTestId("sale-item-types")) as HTMLSelectElement;
       const amount = await (await findByTestId("amount")).querySelector('.MuiInputBase-input') as HTMLInputElement;

       expect(saleType).toBeInTheDocument();
       expect(saleItem).toBeInTheDocument();
       expect(amount).toBeInTheDocument();


   })

    test("should submit btn be enabled after all values are entered", async () => {
        const { findByTestId,getByTestId } = renderRegisterSaleList(MOCK_STATE);
        const saleType = await (await findByTestId("sale-types"))
        const saleItem = (await findByTestId("sale-item-types")) ;
        const amount = await (await findByTestId("amount")).querySelector('.MuiInputBase-input') as HTMLInputElement;
        const submitBtn = await findByTestId("submit-btn");


        // select value in autocomplete products
        const typeInput = await getByTestId("sale-types").querySelector('.MuiInputBase-input') as HTMLInputElement;
        saleType.focus();
    
        fireEvent.change(typeInput, { target: { value: 'p' } })
        fireEvent.keyDown(saleType, { key: 'ArrowDown' })
        fireEvent.keyDown(saleType, { key: 'Enter' })

        //select value in autocomplete Items
        const typeItem = await getByTestId("sale-item-types").querySelector('.MuiInputBase-input') as HTMLInputElement;
        saleItem.focus();
     
        fireEvent.change(typeItem, { target: { value: 'd' } })
        fireEvent.keyDown(saleItem, { key: 'ArrowDown' })
        fireEvent.keyDown(saleItem, { key: 'Enter' })


        fireEvent.change(amount, { target: { value: 10 } });

        expect(submitBtn).not.toBeDisabled();


    })


    // test("should api call be made on submit button", async () => {
    //     const { findByTestId, getByTestId } = renderRegisterSaleList(MOCK_STATE);
    //     const saleType = await (await findByTestId("sale-types"))
    //     const saleItem = (await findByTestId("sale-item-types"));
    //     const amount = await (await findByTestId("amount")).querySelector('.MuiInputBase-input') as HTMLInputElement;
    //     const submitBtn = await findByTestId("submit-btn");


    //     // select value in autocomplete products
    //     const typeInput = await getByTestId("sale-types").querySelector('.MuiInputBase-input') as HTMLInputElement;
    //     saleType.focus();

    //     fireEvent.change(typeInput, { target: { value: 'p' } })
    //     fireEvent.keyDown(saleType, { key: 'ArrowDown' })
    //     fireEvent.keyDown(saleType, { key: 'Enter' })

    //     //select value in autocomplete Items
    //     const typeItem = await getByTestId("sale-item-types").querySelector('.MuiInputBase-input') as HTMLInputElement;
    //     saleItem.focus();

    //     fireEvent.change(typeItem, { target: { value: 'd' } })
    //     fireEvent.keyDown(saleItem, { key: 'ArrowDown' })
    //     fireEvent.keyDown(saleItem, { key: 'Enter' })


    //     fireEvent.change(amount, { target: { value: 10 } });

    //     fireEvent.click(submitBtn);
    //     const spy = jest.spyOn("../../../services/services", "sellProduct");

    //     expect(spy).toHaveBeenCalled();



    // })
})