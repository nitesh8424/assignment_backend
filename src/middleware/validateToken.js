const express = require('express');
const jwt = require('jsonwebtoken');

exports.validateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    // Verify token
    jwt.verify(token, 'ABCDEF', (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
        req.user = decoded; 
        next(); 
    });
};

