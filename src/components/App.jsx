import React, { Fragment } from 'react';
import GlobalStyle from './GlobalStyle';
import PostList from './PostList';
import posts from '../scripts/posts';

const App = () => (
    <Fragment>
        <GlobalStyle />
        <PostList posts={posts} />
    </Fragment>
);

export default App;
