const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {
    check,
    validationResult
} = require('express-validator');

const User = require('../models/User');


// @route POST api/users
// @desc  Register a user. Alot of method chanining happening here.
// @access PUBLIC

router.post(
    '/',
    [
        check('name', 'name is required')
        .not()
        .isEmpty(),
        check('email', 'email can\'t be empty')
        .isEmail(),
        check('password', 'enter a valid password, 6 character min')
        .isLength({
            min: 6
        })
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }
        const {
            name,
            email,
            password
        } = req.body;

        try {

            // If values in the req.body and database are the same: just enter the value itself

            let user = await User.findOne({
                email
            });
            if (user) {
                return res.status(400).json({
                    msg: 'user already exists'
                })
            }
            user = new User({
                name,
                email,
                password
            });

            // Sodium

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            };
            // console.log(payload);

            jwt.sign(payload, config.get('jwtSecret'), {
                expiresIn: 3600000
            }, (err, token) => {
                if (err) throw err;
                res.json({
                    token
                });
            });

        } catch (err) {
            console.error(err.message);

            res.status(500).send('Server Error')
        }
    });

module.exports = router;