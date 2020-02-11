import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";

import PageNotFound from "../";

describe("PageNotFound component", () => {
    it("should display 404: Page not found in the document title", () => {
        render(
            <MemoryRouter>
                <PageNotFound />
            </MemoryRouter>,
        );

        expect(document.title).toContain("404: Page not found");
    });
});
