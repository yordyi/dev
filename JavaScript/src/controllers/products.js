const express = require('express');
const Product = require('../models/product');
const { successResponse } = require('../utils/response');

const router = express.Router();

// 分页、排序、过滤
router.get('/api/products', async (req, res) => {
    const { 
        page = 1, 
        limit = 10, 
        sort = '-createdAt',
        category 
    } = req.query;

    const query = category ? { category } : {};
    
    const products = await Product
        .find(query)
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(Number(limit));

    res.json(successResponse(products));
});

module.exports = router; 