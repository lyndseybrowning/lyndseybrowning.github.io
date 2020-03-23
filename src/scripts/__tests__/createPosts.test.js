require("gray-matter");

const fs = require("fs");
const createPosts = require("../createPosts");
const config = require("../config");

const mockFiles = ["file1"];
const mockMarkdown = `
---
layout: post
title: "Mock Post"
date: March 22, 2020
pageClass: post
---

This is a mock post
`;

jest.mock("gray-matter", () => () => ({
    content: "This is a mock post",
    data: {
        layout: "post",
        title: "Mock Post",
        date: "March 22, 2020",
        pageClass: "post",
    },
    isEmpty: false,
    excerpt: "",
}));

jest.mock("fs", () => ({
    readdir: jest.fn((dir, cb) => cb(null, mockFiles)),
    readFileSync: () => mockMarkdown,
    writeFile: jest.fn((file, contents, cb) => cb(null)),
}));

describe("createPosts", () => {
    afterAll(() => {
        jest.unmock("fs");
    });

    it("should read posts from the provided directory and write the transformed contents to a new file", () => {
        const expectedPostOutput =
            'export default [{"post":"<p>This is a mock post</p>\\n","data":{"layout":"post","title":"Mock Post","date":"March 22, 2020","pageClass":"post"},"slug":"mock-post"}]';

        createPosts();

        expect(fs.readdir).toHaveBeenCalledWith(
            config.POSTS_DIR,
            expect.any(Function),
        );
        expect(fs.writeFile).toHaveBeenCalledWith(
            expect.any(String),
            expectedPostOutput,
            expect.any(Function),
        );
    });
});
