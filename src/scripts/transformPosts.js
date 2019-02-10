const fs = require('fs');
const path = require('path');
const marked = require('marked');
const matter = require('gray-matter');

const args = process.argv.splice(2, process.argv.length);
const watchForChanges = args.find(arg => arg === '--watch' || arg === '-w');
const paths = {
    POSTS_DIR: path.resolve(__dirname, '../posts'),
    OUTPUT_DIR: __dirname,
};

const createPosts = () => {
    fs.readdir(paths.POSTS_DIR, (err, files) => {
        if (err) {
            throw new Error('Unable to read directory');
        }

        const posts = files.reduce((postsArray, filename) => {
            const filePath = `${paths.POSTS_DIR}/${filename}`;
            const markdown = fs.readFileSync(filePath, 'utf8');
            const { content, data } = matter(markdown);
            const post = {
                post: marked(content),
                data,
            };

            postsArray.push(post);

            return postsArray;
        }, []);

        const fileContents = `export default ${JSON.stringify(posts)}`;

        fs.writeFile(`${paths.OUTPUT_DIR}/posts.js`, fileContents, err => {
            if (err) {
                throw new Error('Unable to write to posts file');
            }

            console.log('Posts created');

            if (watchForChanges) {
                console.log('Waiting for changes...');
            }
        });
    });
};

createPosts();

if (watchForChanges) {
    fs.watch(paths.POSTS_DIR, () => {
        createPosts();
        console.log('Recreating posts...');
    });
}
