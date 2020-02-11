import React from "react";
import { render } from "@testing-library/react";

import useDocumentTitle from "../useDocumentTitle";

describe("useDocumentTitle custom hook", () => {
    const MockComponent = () => {
        useDocumentTitle("custom title");

        return <p>Mock Component</p>;
    };

    it("should update the document title with the specified text", () => {
        render(<MockComponent />);

        expect(document.title).toContain("custom title");
    });
});
