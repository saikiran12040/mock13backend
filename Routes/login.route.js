const express=require("express");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { UserModel } = require("../Models/User.model");
const loginRouter=express.Router();

loginRouter.post("/",async(req,res)=>{
    const { email, password } = req.body;
   
    try {
      // Find the user by email
      const user = await UserModel.findOne({ email: email });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
      // Compare the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
     
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Incorrect password.' });
      }
  
      // Password is correct, generate a JWT token
      const token = jwt.sign({ userId: user._id }, 'secret-key', { expiresIn: '1h' });
  
      // Send the token to the frontend
      res.json({ token });
    } catch (err) {
      res.status(500).json({ error: 'Failed to login.' });
    }
})

module.exports={
    loginRouter
}