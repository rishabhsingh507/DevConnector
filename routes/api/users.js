const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { check, validationResult } = require('express-validator');
const User = require('../../models/Users');
const { db } = require('../../models/Users');

// @route POST api/users
// @desc  Register User
// @access Public

router.post('/',
    [
        check('name', 'Name is not required')
            .not()
            .isEmpty(),
        check('email', 'Please include a valid email address').isEmail(),
        check('password',
            'Please enter a password with length greater than 6 characters'
        ).isLength({ min : 6})
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            // Check if user already exists
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({errors: [{msg:'User already exists'}]})
            }

            //get image using gravatar
            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm',
            })

            //create new instance of user. Doesn't save it to the db yet
            user = new User({
                name,
                email,
                avatar,
                password
            })

            //encrpyt the password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            //save the user instance to the db
            await user.save();

            res.send('User registered');

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
});

module.exports = router;