const express = require('express');
const router = express.Router();
const User = require ('../models/User');
const { generateToken } = require('../token/auth');
const jwt = require('jsonwebtoken');

// Get user
router.get ('/users', async (req,res) => {
    try{
        const user = await User.find()
        res.status(200).json(user);
    }
    catch (error){
        console.log(error)
        res.status(500).json({message:'Server Error'})
    }
});

//Get user by id
router.get ('/users/:id', async (req,res) => {
    try{
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({message:'User not found!!'})
        }
        res.status(200).json(user);
    }
    catch (error){
        console.log(error)
        res.status(500).json({message:'Server Error'})
    }
});

//Get user by name
router.get ('/users/name/:name', async (req,res) => {
    try{
        const user = await User.findOne({name: req.params.name});
        if (!user) {
            return res.status(404).json({message:'User not found!!'})
        }
        res.status(200).json(user);
    }
    catch (error){
        console.log(error)
        res.status(500).json({message:'Server Error'})
    }
});

//Get user by email
router.get ('/users/email/:email', async (req,res) => {
    try{
        const user = await User.findOne({email: req.params.email});
        if (!user) {
            return res.status(404).json({message:'User not found!!'})
        }
        res.status(200).json(user);
    }
    catch (error){
        console.log(error)
        res.status(500).json({message:'Server Error'})
    }
});

//Check username unique
router.get ('/users/check-username/:username', async (req, res) => 
{
    try{
        const username = req.params.username;
        const checkUser = await User.findOne({name :username})
        res.json( {exists : !!checkUser} )
    }
    catch (error){
        res.status(500).json({message : 'Server Error'});
    }
});

//Check email unique
router.get('/users/check-email/:email', async (req, res) => 
{
    try{
        const email = req.params.email;
        const checkEmail =  await User.findOne({email : email})
        res.json({exists : !!checkEmail})
    }
    catch (error){
        res.status(500).json({message : 'Server Error'});
    }
});

//Post user
router.post ('/users', async(req,res) =>{
    try{
        const { name, email, password} = req.body;
        const user = new User ({
            name,
            email,
            password,
        });
        await user.save();

        const token = generateToken({ id: user._id, email: user.email });
        res.status(201).json({user,token});
    }
    catch (error){
        console.log(error);
        res.status(500).json({message:'server error'});
    }
});

//Post  user login
router.post('/user-login/lgin', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ userId: user._id }, 'yadu');
      res.json({ user, token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

//Edit user
router.put ('/users/:id', async(req,res) =>{
    try{
        const { name, email, password} = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {name, email, password, updatedAt: Date.now()},
            {new:true}
        );
        if (!updatedUser) {
            return res.status(404).json({message:'User not found!!'})
        }
        res.status(200).json(updatedUser);
    }
    catch (error){
        console.log(error)
        res.status(500).json({message:'Server Error'});
    }
});

//Delete User
router.delete ('/users/:id', async(req,res) =>{
    try{
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({message:'User not found!!'})
        }
        res.status(200).json({message:'User succesfully deleted!!'})
    }
    catch (error){
        console.log(error)
        res.status(500).json({message:'Server Error!!'});
    }
})

module.exports = router;