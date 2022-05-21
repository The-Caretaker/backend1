const CompanyModel = require('../model/company')
// Create and Save a new user
exports.create = async (req, res) => {
    if (!req.body.company && !req.body.founders && !req.body.year && !req.body.description && !req.body.country && !req.body.status) {
        res.status(400).send({ message: "Content can not be empty!" });
    }

    const company = new CompanyModel({
        company: req.body.company,
        founders: req.body.founders,
        year: req.body.year,
        description: req.body.description,
        country: req.body.country,
        status: req.body.status
    });

    await company.save().then(data => {
        res.send({
            message:"Company successfully!!",
            user:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while adding a new company"
        });
    });
};
// Retrieve all users from the database.
exports.findAll = async (req, res) => {
    try {
        const user = await CompanyModel.find();
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};
// Find a single User with an id
exports.findOne = async (req, res) => {
    try {
        const user = await CompanyModel.findById(req.params.id);
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

    await CompanyModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `User not found.`
            });
        }else{
            res.send({ message: "User updated successfully." })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};
// Delete a user with the specified id in the request
exports.destroy = async (req, res) => {
    await CompanyModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Company not found.`
            });
        } else {
            res.send({
                message: "Company deleted successfully!"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};