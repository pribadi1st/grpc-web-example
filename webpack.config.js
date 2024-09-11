const path = require('path');

module.exports = {
    entry: './index.js', // Entry point for the app (create index.js later)
    output: {
        filename: 'bundle.js', // Output bundle
        path: path.resolve(__dirname, 'dist') // Directory to output the bundled files
    },
    mode: 'development' // Can also use 'production' for production-ready code
};