import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import PostList from './PostList';
import Post from './Post';
import PageNotFound from './PageNotFound';

const App = () => (
    <BrowserRouter>
        <Fragment>
            <GlobalStyle />
            <Switch>
                <Route path="/" exact component={PostList} />
                <Route path="/posts/:post" component={Post} />
                <Route component={PageNotFound} />
            </Switch>
        </Fragment>
    </BrowserRouter>
);

export default App;
