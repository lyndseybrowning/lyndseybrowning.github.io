import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";

import posts from "scripts/posts";
import Post from "../";

describe("Post component", () => {
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

    it("should render the post when it is a valid post", () => {
        const validPost = {
            params: {
                post: "mock-post",
            },
        };
        const mockPost = posts.find(p => p.slug === validPost.params.post);

        const { getByRole } = render(
            <MemoryRouter>
                <Post match={validPost} />
            </MemoryRouter>,
        );

        expect(getByRole("article").textContent).toBe(mockPost.post);
    });
});
