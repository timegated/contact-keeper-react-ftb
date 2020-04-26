const express = require('express');
const router = express.Router();


// @routes
// @desc
// @access

router.get('/', (req, res) => {
    res.send('Get all the user\'s contacts')
})

router.post('/', (req, res) => {
    res.send('Add a contact')
})

router.put('/:id', (req, res) => {
    res.send('Update a user\'s contact')
})

router.delete('/:id', (req, res) => {
    res.send('Delete a user\'s contact')
})

module.exports = router;