import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyle, { theme } from './GlobalStyle';
import PostList from './PostList';
import Post from './Post';
import PageNotFound from './PageNotFound';

const App = () => (
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <div className="o-wrapper">
                <GlobalStyle />
                <header>
                    <h1>Lyndsey Browning</h1>
                    <h2>Front end development blog</h2>
                </header>
                <Switch>
                    <Route path="/" exact component={PostList} />
                    <Route path="/posts/:post" component={Post} />
                    <Route component={PageNotFound} />
                </Switch>
            </div>
        </ThemeProvider>
    </BrowserRouter>
);

export default App;
