import "@testing-library/jest-dom";

import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";

import posts from "scripts/posts";
import PostList from "../";

describe("PostList component", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = render(
            <MemoryRouter>
                <PostList />
            </MemoryRouter>,
        );
    });

    it("should render each post as an article", () => {
        expect(wrapper.getAllByRole("article")).toHaveLength(posts.length);
    });

    it("should render information for each post", () => {
        const { getByTestId } = wrapper;

        posts.forEach(post => {
            const item = getByTestId(post.slug);

            expect(item).toHaveTextContent(post.data.title);
            expect(item).toHaveTextContent(post.data.description);
            expect(item).toHaveTextContent(post.data.date);
        });
    });

    it.each(posts)("should render keywords for each post", ({ slug, data }) => {
        const item = wrapper.getByTestId(slug);
        const { keywords } = data;

        keywords.forEach(keyword => expect(item).toHaveTextContent(keyword));
    });
});
