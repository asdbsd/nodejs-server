const fs = require('fs');
const { getProducts, createProduct, getProductById, updateProduct } = require('../src/data');
const { loadFragment, render } = require('../src/view');

const catalogController = async (req, res) => {
    const products = await getProducts();
    const fragment = loadFragment('catalog', fragment => {
        const catalogHtml = fragment.replace(
            '{{items}}', 
            products.map(p => `<li>${p.name} - ${p.price}</li> <a href="/edit?id=${p._id}"><strong>Edit</strong></a>`).join('\n')
        );
        const catalogTemplate = render(catalogHtml, 'Catalog');
        res.write(catalogTemplate);
        res.end();
    });
}

const createAction = (req, res) => {
    loadFragment('create', (createHtml) => {
        res.html(render(createHtml, 'Create Product'));
    });
}

const saveAction = (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async() => {
        console.log(body);
        const formData = body.split('&')
        .map(prop => prop.split('='))
        .reduce((r, [k, v]) => Object.assign(r, { [k]: decodeURIComponent(v.split('+').join(' ')) }), {});
        await createProduct(formData);
        res.redirect('/catalog');
    });
}

const editAction = async (req, res) => {
    const productId = req.url.searchParams.get('id');
    const product = await getProductById(productId);
    loadFragment('edit', (fragment) => {
        const editHtml = fragment
                            .replace('{{id}}', productId)
                            .replace('{{name}}', product.name)
                            .replace('{{price}}', product.price);
        const editTemplate = render(editHtml, 'Edit Page')
        res.html(editHtml);
    });
}

const saveEditAction = async (req, res) => {
    let body = '';
    const productId = req.url.searchParams.get('id');
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        const formData = body.split('&')
                            .map(prop => prop.split('='))
                            .reduce((r, [k, v]) => Object.assign(r, { [k]: decodeURIComponent(v.split('+').join(' ')) }), {});
        await updateProduct(formData, productId);
        res.redirect('/catalog');
    });
}

module.exports = {
    catalogController,
    createAction,
    saveAction,
    editAction,
    saveEditAction
};