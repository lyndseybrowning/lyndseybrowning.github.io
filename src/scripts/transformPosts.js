const fs = require("fs");
const createPosts = require("./createPosts");
const config = require("./config");

const args = process.argv.splice(2, process.argv.length);
const watchForChanges = args.find(arg => arg === "--watch" || arg === "-w");

createPosts(watchForChanges);

if (watchForChanges) {
    fs.watch(config.POSTS_DIR, () => {
        createPosts();
        console.log("Recreating posts...");
    });
}
