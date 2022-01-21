const fs = require('fs');

const template = fs.readFileSync('./static/layout.html').toString();

function loadFragment(name, cb) {
    fs.readFile(`./static/${name}.html`, (err, data) => cb(data.toString()));
}

const render = (body, title) => {
    return template.replace('{{body}}', body).replace('{{title}}', title);
}

module.exports = {
    loadFragment,
    render
}