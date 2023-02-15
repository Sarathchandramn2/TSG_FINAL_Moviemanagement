import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ErrorBoundary from '../error-boundary/error-boundary';
import Routes from '../route/route';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const App = () => {

    return (
        <>
        <ToastContainer/>
            <Router>
                <ErrorBoundary>
                </ErrorBoundary>
                <div>
                    <div>
                        <div>
                            <ErrorBoundary>
                                <Routes />
                            </ErrorBoundary>
                        </div>
                    </div>
                </div>
            </Router>
        </>
    );
};
export default App ;
