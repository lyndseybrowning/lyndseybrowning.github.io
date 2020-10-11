import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle, { theme } from "./GlobalStyle";
import PostList from "pages/postList";
import Post from "pages/post";
import PageNotFound from "pages/pageNotFound";
import { APP_TITLE, APP_SUBTITLE } from "../scripts/config";

const App = () => {
    return (
        <Router>
            <ThemeProvider theme={theme}>
                <div className="o-wrapper">
                    <GlobalStyle />
                    <header className="header">
                        <h1 className="header__title">
                            <Link to="/">{APP_TITLE}</Link>
                        </h1>
                        <h2 className="header__subtitle">{APP_SUBTITLE}</h2>
                        <img
                            src="/profile.png"
                            alt=""
                            className="header__photo"
                        />
                    </header>
                    <Switch>
                        <Route path="/" exact component={PostList} />
                        <Route path="/posts/:post" component={Post} />
                        <Route component={PageNotFound} />
                    </Switch>
                </div>
            </ThemeProvider>
        </Router>
    );
};

export default App;
