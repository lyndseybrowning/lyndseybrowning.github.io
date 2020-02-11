import "@testing-library/jest-dom/extend-expect";

import React from "react";
import { render } from "@testing-library/react";

import Tags from "../";

describe("Tags component", () => {
    it("should render a list of keywords", async () => {
        const keywords = ["one", "two"];

        const { getAllByRole } = render(<Tags keywords={keywords} />);
        const listItems = getAllByRole("listitem");

        expect(listItems.length).toBe(keywords.length);
        expect(listItems[0]).toHaveTextContent("one");
        expect(listItems[1]).toHaveTextContent("two");
    });
});
