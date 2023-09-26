const User = require('../models/user.model')
const logger = require('../logger/logger')


exports.findAll = async(req, res) => {
    console.log('Find all users')

    try {
        const result = await User.find() // await because of async
        res.status(200).json({status: true, data: result})
        console.log('Success in reading all users')
        logger.info('Log info success in reading all users')
        // logger.log('Logger success in reading all users')
    } catch (err) {
        res.status(400).json({status: false, data:err})
        logger.error("Error in reading all users")
        console.log('Error in reading all users')
    }

}

// Callback instead of async - await for mongoose < 7.0
// exports.findAll = function(req, res ) {
//     console.log('Find all users')

//     User.find((err, results) => {
//         if (err) {
//             res.status(400).json({status: false, data:err})
//             console.log('Error in reading all users')
//         } else {
//             res.status(200).json({status: true, data: results})
//             console.log('Success in reading all users')
//         }
//     })
// }

exports.findOne = async(req, res) => {
    const username = req.params.username
    console.log('Find user with username ', username)

    try {
        const result = await User.find({username: username})
        res.status(200).json({status: true, data: result})

    } catch (err) {
        res.status(400).json({status: false, data:err})
        console.log('Error in reading user with username ', username)
    }
} 

exports.create = async(req, res) => {
    console.log(req.body)
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        products: req.body.products
    })
    
    console.log('Insert user with username: ', req.body.username)

    try {
        const result = await newUser.save();
        res.status(200).json({status: true, data: result})
        console.log('Success in inserting user with username', req.body.username)
    } catch (err) {
        res.status(400).json({status: false, data:err})
        console.log('Error in inserting user with username ', req.body.username)
    }
}

exports.update = async (req, res) => {
    const username = req.body.username
    console.log("Update user with username: ", username)

    const updateUser = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone
    }

    try {
        const result = await User.findOneAndUpdate({username: username}, updateUser, {new: true}) //if user doesn't exist, it is created
        res.status(200).json({status: true, data: result})
        console.log('Success in inserting user with username', username)
    } catch (err) {
        res.status(400).json({status: false, data:err})
        console.log('Error in updating user with username ', username)
    }
}

exports.delete = async (req, res) => {
    const username = req.params.username
    console.log("Delete user with username: ", username)

    try {
        const result = await User.findOneAndRemove({username: username})
        res.status(200).json({status: true, data: result})
        console.log('Success in deleting user with username', username)
    } catch (err) {
        res.status(400).json({status: false, data:err})
        console.log('Error in deleting user with username ', username)

    }
}