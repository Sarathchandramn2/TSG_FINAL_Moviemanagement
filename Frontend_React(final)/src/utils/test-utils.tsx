import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import commonReducer from '../redux/reducers/common';
const customRender = (ui: any, { initialState, ...renderOptions }: any = {}) => {
    const store = createStore(combineReducers({ common: commonReducer }), initialState);
    const AllTheProviders = ({ children }: any) => {
        return (
            <BrowserRouter>
                 <Provider store={store}> {children} </Provider>
                {' '}
            </BrowserRouter>
        );
    };
    return rtlRender(ui, { wrapper: AllTheProviders, ...renderOptions });
};
