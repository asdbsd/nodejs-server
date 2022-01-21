const fs = require('fs');
const { loadFragment, render } = require('../src/view');

const defaultController = (req, res) => {
    res.writeHead(404, {
        'Content-Type': 'text/html'
    });

    loadFragment('404', (defaultPageHtml) => {
        const defaultPageTemplate = render(defaultPageHtml, '404 : Error');
        res.write(defaultPageTemplate);
        res.end();
    })
}

module.exports = defaultController;