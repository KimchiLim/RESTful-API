const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handing GET requests to /products'
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handing POST requests to /products'
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if (id === 'special') {
        res.status(200).json({
            message: 'You found the special ID!',
            ID: id
        })
    } else {
        res.status(200).json({
            message: 'You passed an ID',
            ID: id
        });
    }
});

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated product'
    });
});

router.delete('/:productID', (req, res, nest) => {
    res.status(200).json({
        message: 'Deleted product'
    });
});

module.exports = router;