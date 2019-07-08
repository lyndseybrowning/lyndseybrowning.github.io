const createPages = require("../create-pages");

describe("create-pages", () => {
    it("should return an array", () => {
        const actual = Array.isArray(createPages([], 5));

        expect(actual).toBe(true);
    });

    it("should return the correct number of pages", () => {
        const pages = ["1", "2", "3", "4", "5"];
        const pageSize = 2;
        const [page1, page2, page3] = createPages(pages, pageSize);

        expect(page1).toEqual(["1", "2"]);
        expect(page2).toEqual(["3", "4"]);
        expect(page3).toEqual(["5"]);
    });
});
