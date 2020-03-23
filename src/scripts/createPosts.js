const fs = require("fs");
const marked = require("marked");
const matter = require("gray-matter");
const config = require("./config");

const OUTPUT_DIR = __dirname;

const createPosts = watchForChanges => {
    fs.readdir(config.POSTS_DIR, (err, files) => {
        /* istanbul ignore next */
        if (err) {
            throw new Error("Unable to read directory");
        }

        const posts = files.reduce((postsArray, filename, index) => {
            const filePath = `${config.POSTS_DIR}/${filename}`;
            const markdown = fs.readFileSync(filePath, "utf8");
            const { content, data } = matter(markdown);
            const slug = data.title.toLowerCase().replace(/\s/g, "-");
            const post = {
                post: marked(content),
                data,
                slug,
            };

            postsArray.push(post);

            return postsArray;
        }, []);

        const fileContents = `export default ${JSON.stringify(posts)}`;

        fs.writeFile(`${OUTPUT_DIR}/posts.js`, fileContents, err => {
            /* istanbul ignore next */
            if (err) {
                throw new Error("Unable to write to posts file");
            }

            console.log("Posts created");

            /* istanbul ignore next */
            if (watchForChanges) {
                console.log("Waiting for changes...");
            }
        });
    });
};

module.exports = createPosts;
