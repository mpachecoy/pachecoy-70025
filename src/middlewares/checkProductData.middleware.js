export const checkProductData = async (req, res, next) => {
    try {
        const { title, description, price, thumbnail, code, stock, category, status } = req.body;
        const newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock, 
            category, 
            status
        };

        if(Object.values(newProduct).includes(undefined)) {
            return res.status(400).json({ status: "error", msg: "Todos los campos son obligatorios"});
        };
        next(); 

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", msg: " Error interno del servidor "});
    }
}