import { renderWithProviders } from "../../../shared/renderHelper";
import { Article } from "../../../types/types";
import ArticleList from "../article-list";

// mocks
export const MOCK_STATE = {
    articles: [
        {
            "id": "0517f083-0e15-4876-8d1f-6fa45900431c",
            "name": "Leg",
            "amountInStock": 4
        }
    ]

};

export const ERROR_MOCK_STATE = {
    articles: [ ],
    error:true

};


let mockGetArticles = jest.fn(() => {
    return jest.fn();
});

jest.mock('../../../services/services', () => {
    return function () {
        return {  getArticles: mockGetArticles };
    };
});

const renderArticleList = (
    state: {
        articles: Array<Article>
    }
) => {
    return renderWithProviders(
        <ArticleList></ArticleList>,
        state
    );
};

describe("<ArticleList /> test utils", () => {
    test("should articles be loaded in the component", async () => {
        const { findByTestId } = renderArticleList(MOCK_STATE);
        const articleList = await findByTestId('table');
        expect(articleList).toBeInTheDocument();
    })

    // test("should error text shown on error ", async () => {
    //     const { findByTestId } = renderArticleList(ERROR_MOCK_STATE);
    //     const error = await findByTestId('error');
    //     expect(error).toBeInTheDocument();
    // })
})