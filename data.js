const fs = require('fs').promises;

const readFile = async () => {
    const data = JSON.parse((await fs.readFile('./data/products.json')).toString());
    return data;
}

const getProducts = async() => {
    const data = await readFile();
    return Object.entries(data).map(([_id, item]) => Object.assign({}, item, { _id }));
}

const createProduct = async (product) => {
    const data = await readFile();
    const _id = nextId();
    data[_id] = product;
    
    await fs.writeFile('./data/products.json',JSON.stringify(data, null, 2));
}

const updateProduct = async (product, id) => {
    const data = await readFile();
    data[id] = product;
    await fs.writeFile('./data/products.json', JSON.stringify(data, null, 2));
}

const nextId = () => {
    return 'xxxxxxxx'.replace(/x/g, () => (Math.random() * 16 | 0).toString(16));
}

const getProductById = async (id) => {
    const data = await readFile();
    return data[id];
}

module.exports = {
    getProducts,
    createProduct,
    getProductById,
    updateProduct
};