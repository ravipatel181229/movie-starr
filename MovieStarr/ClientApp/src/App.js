import React, { Component, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import { Layout } from './components/Layout';
import './custom.css';

const App = () => {
    //static displayName = App.name;
    const location = useLocation();

    useEffect(() => {
        document.body.style.background = "white";
    }, [location])

    return (
        <Layout>
            <Routes>
                {AppRoutes.map((route, index) => {
                    const { element, requireAuth, ...rest } = route;
                    return <Route key={index} {...rest} element={requireAuth ? <AuthorizeRoute {...rest} element={element} /> : element} />;
                })}
            </Routes>
        </Layout>
    );
}

export default App