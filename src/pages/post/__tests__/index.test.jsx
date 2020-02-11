import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";

import posts from "scripts/posts";
import Post from "../";

describe("Post component", () => {
    describe("when the requested post does not exist", () => {
        it("should display the PageNotFound component when the requested post does not exist", () => {
            const invalidPost = {
                params: {
                    post: "invalid-post",
                },
            };

            render(
                <MemoryRouter>
                    <Post match={invalidPost} />
                </MemoryRouter>,
            );

            expect(document.title).toContain("404: Page not found");
        });
    });

    describe("when a valid post exists", () => {
        const validPost = {
            params: {
                post: "mock-post",
            },
        };

        const mockPost = posts.find(p => p.slug === validPost.params.post);

        let wrapper;

        beforeEach(() => {
            wrapper = render(
                <MemoryRouter>
                    <Post match={validPost} />
                </MemoryRouter>,
            );
        });

        it("should render the post when it is a valid post", () => {
            const post = wrapper.getByRole("article");
            expect(post.textContent).toBe(mockPost.post);
        });

        it("should display the post name in the document title", () => {
            expect(document.title).toContain(mockPost.data.title);
        });
    });
});
