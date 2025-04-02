const productModel = require("../../models/productModel");

const getSmartProductCategory = async (req, res) => {
    try {
        // Verifica req.body y req.query
        console.log("Cuerpo de la solicitud (body):", req.body);
        console.log("Consulta de la solicitud (query):", req.query);

        const { category } = req?.body || req?.query;

        // Verifica la categoría recibida
        console.log("Categoría recibida en el backend:", category);

        const product = await productModel.find({
            category: { $regex: new RegExp(category, "i") } // Ignora mayúsculas/minúsculas
        });
        // Verifica los productos encontrados
        console.log("Productos encontrados:", product);

        res.json({
            data: product,
            message: "Product",
            success: true,
            error: false
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = getSmartProductCategory;