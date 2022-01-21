const homeController = require('../controllers/homeController');
const { catalogController, createAction, saveAction } = require('../controllers/catalogController');
const defaultController = require('../controllers/defaultController');

module.exports = {
    homeController,
    catalogController,
    defaultController,
    createAction,
    saveAction
}
