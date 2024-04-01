const User = require('../models/user.models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();


module.exports.register = (req, res) => {
    
    User.create(req.body)
    .then(user => {
        const userToken = jwt.sign({
            id: user._id
        }, "first key value");
 
        res.cookie("usertoken", userToken, {
                httpOnly: true
            })
            .json({ msg: "success!", user: user });
    })
    .catch(err => res.json(err));

}
module.exports.login = async (req, res) => {
    console.log(req.body.password);
    const user = await User.findOne({ email: req.body.email });

    if (user === null) {
    return res.status(400).json({
        errors: { email: { message: "There is no user with this email" } },
    });
    }
    console.log(user.password);

    const correctPassword = await bcrypt.compare(
        req.body.password,
        user.password
    );
    console.log(correctPassword);
    if (!correctPassword) {
        return res
        .status(400)
        .json({ errors: { password: { message: "The password is incorrect" } } });
    }

    console.log("Err");
    const userToken = jwt.sign(
        {
        id: user._id,
        },
        process.env.SECRET_KEY
    );

    res
    .cookie("usertoken", userToken, {httpOnly: true,})
    .json({ msg: "success!" , user:user});
};
module.exports.getUserById = (req, res) => {
    User.findById(req.params.id)
        .then(user => {
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
        })
        .catch(error => {
        console.error(error);
        res.status(400).json({ error: 'Bad request' });
        });
};

module.exports.logout= (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
}