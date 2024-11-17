const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios= require('axios');
const cookieParser = require('cookie-parser');
require('dotenv').config();


const app=express();
app.use(express.json());
app.use(cookieParser());

const MONGO_URI = process.env.MONGO_URI;
console.log('MONGO_URI:', process.env.MONGO_URI);

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    
    .catch((err) => console.error(err));


// User schema and model
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    preferences: { type: Object, default: {} },
});

const User = mongoose.model('User', userSchema);


const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};
app.post('/api/register',async(req,res)=>{
    const {username,password}=req.body;
    try{
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).send('User registered successfully');
    } catch (err) {
        res.status(400).send('Error registering user');
    }
    
});
app.post('/api/login',async(res,req)=>{
    const{username,password}=req.body;
    try{
        const user=await user.findone({username});
        if(!user) return res.status(404).send('User not found');
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).send('Invalid password');

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true }).send('Login successful');
    }catch (err) {
        res.status(400).send('Error logging in');
    }
    
})
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));