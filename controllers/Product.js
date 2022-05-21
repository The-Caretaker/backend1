const ProductModel = require('../model/game')
// Create and Save a new product
exports.create = async (req, res) => {
    if (!req.body.name && !req.body.developer && !req.body.publisher && !req.body.year && !req.body.genre && !req.body.rating && !req.body.description) {
        res.status(400).send({ message: "Content can not be empty!" });
    }

    const user = new ProductModel({
        name: req.body.name,
        developer: req.body.developer,
        publisher: req.body.publisher,
        year: req.body.year,
        genre: req.body.genre,
        rating: req.body.rating,
        description: req.body.description
    });

    await user.save().then(data => {
        res.send({
            message:"Product added successfully!!",
            user:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while adding product"
        });
    });
};
// Retrieve all users from the database.
exports.findAll = async (req, res) => {
    try {
        const user = await ProductModel.find();
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};
// Find a single User with an id
exports.findOne = async (req, res) => {
    try {
        const user = await ProductModel.findById(req.params.id);
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
};
// Update a user by the id in the request
exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    await ProductModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Product not found.`
            });
        }else{
            res.send({ message: "Product updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
// Delete a user with the specified id in the request
exports.destroy = async (req, res) => {
    await ProductModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Product not found.`
            });
        } else {
            res.send({
                message: "Product deleted successfully!"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};