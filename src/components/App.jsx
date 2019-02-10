import React, { Fragment } from 'react';
import GlobalStyle from './GlobalStyle';
import posts from '../scripts/posts';

console.log(posts);

const createPosts = () =>
    posts.map(({ post }, index) => (
        <div
            key={index}
            dangerouslySetInnerHTML={{
                __html: post,
            }}
        />
    ));

const App = () => (
    <Fragment>
        <GlobalStyle />
        {createPosts()}
    </Fragment>
);

export default App;
