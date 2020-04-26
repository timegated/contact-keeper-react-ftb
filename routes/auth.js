const express = require('express');
const router = express.Router();

// @route POST api/auth
// @desc  Get logged in user
// @access PRIVATE

router.get('/', (req, res) => {
    res.send(`Get logged in user`);
});

// @route GET 
// @desc  Get logged in user
// @access PUBLIC

router.post('/', (req, res) => {
    res.send(`Get logged in user`);
});

module.exports = router;