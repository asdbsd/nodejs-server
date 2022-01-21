const http = require('http');
const fs = require('fs');

const { router, get, post } = require('./src/router');

const { homeController, catalogController, createAction, saveAction } = require('./src/controllersManager');
const { editAction, saveEditAction } = require('./controllers/catalogController');


get('/', homeController);
get('/catalog', catalogController);
get('/create', createAction);
post('/create', saveAction);
get('/edit', editAction);
post('/edit', saveEditAction);



http.createServer((req, res) => {
    if(req.url == '/favicon.ico') {
        fs.createReadStream(`./static/images/favicon.ico`).pipe(res);
    } else if (req.url.startsWith('/css/')) {
        fs.createReadStream(`./static/css/static.css`).pipe(res);
    } else {
        router(req, res);
    }

}).listen(3000)