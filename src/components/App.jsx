import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle, { theme } from "./GlobalStyle";
import PostList from "pages/PostList";
import Post from "pages/Post";
import PageNotFound from "pages/PageNotFound";
import { APP_TITLE, APP_SUBTITLE } from "../scripts/config";

const App = () => {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <div className="o-wrapper">
                    <GlobalStyle />
                    <header>
                        <h1>{APP_TITLE}</h1>
                        <h2>{APP_SUBTITLE}</h2>
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
};

export default App;
