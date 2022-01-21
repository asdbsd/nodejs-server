const { loadFragment, render } = require('../src/view');

const homeController = (req, res) => {
    loadFragment('index', (homeHtml) => {
        const homeTemplate = render(homeHtml, 'Home');
        res.html(homeTemplate);
    });
};

module.exports = homeController;