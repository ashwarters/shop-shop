//createContext creates the container to hold our global state data
//and functionality so we can provide it throughout the app

//useContext is another React Hook that allows us to use the state
//created from the createContext function
import React, { createContext, useContext } from "react";
import { useProductReducer } from './reducers';

//createContext() creates a new Context object
const StoreContext = createContext();

//Provider is a React component that we wrap our app in
//so it can make the state data that's passed into it as a prop available to all other components
const { Provider } = StoreContext;

//a Consumer is our means of grabbing and using the data that the Provider holds



//everytime we use the useProductRedcuer() function we receive:
//state is the most up-to-date versison of our global state object
// && dispatch is the method we execute to update our state
//(looks for an action object passed in as its argument)
const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useProductReducer({
        products: [],
        categories: [],
        currentCategory: '',
    });
    // use this to confirm it works!
    console.log(state);
    return <Provider value = {
        [state, dispatch]
    } {...props }
    />;
};

const useStoreContext = () => {
    return useContext(StoreContext);
};

//any component that has access to our StoreProvider component
//can use any data in our global state container
//or update it using the dispatch function
export { StoreProvider, useStoreContext };