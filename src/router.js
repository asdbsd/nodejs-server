const { defaultController } = require('../src/controllersManager');
const routes = {};

const router = (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    req.url = url;

    let handler;
    const actions = routes[url.pathname];

    if(actions) {
        handler = actions[req.method]
    }

    if(typeof handler == 'function') {
        res.html = page => {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.write(page);
            res.end();
        };
        
        res.redirect = (location) => {
            res.writeHead(301, {
                'Location': location
            });
            res.end();
        }
        handler(req, res);
    } else {
        defaultController(req, res);
    }
}

function registerController(method, path, handler) {
    if(routes[path] == undefined) {
        routes[path] = {};
    }

    routes[path][method] = handler;
}

const get = (path, handler) => registerController('GET', path, handler);
const post = (path, handler) => registerController('POST', path, handler);

module.exports = {
    router,
    get,
    post
};