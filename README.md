# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`
### `start the node api  in port 7000 to get the data from the services `

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.


### `guidelines`
- All components are functional components with react hooks.
- Redux is used for managing the state of the application.
- jest and react testing library are used to write the unit test cases for few of the components.  


### `improvemnets`
- As mentioned in the question in my email as per my understanding of requirements  the sale should be based on amountRequired and amountInStock.In the current inventory the articles  is always less than amount required hence sale is not possible.When i tried updating the articles using the patch call the amountInStock was not getting updated.Hence this functionality is not possible now.In order to showcase how i would have approched the same i have added seeling of articles in the Sale section.Here when a aricle is  sold a patch article request is called and with aountToSubtract .When the request is sucessfull then corresponding state is updated and this updates the article inventory.This was impelmented to showcase how this usecase can be approached.

- All the service end points could not be used.But with more time all diffrent end points could be integrated as diffrent menu and user operations.


- Unit test cases have been implemented for few of the components to showcase how this will be approached.The coverage of unit test caees can be improved.


