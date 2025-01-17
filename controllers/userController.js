const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//@desc Get all users
//@route GET /api/user/all
//@access public
const allUser = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

//@desc Create a user
//@route POST api/user/create
//@access public
const createUser = asyncHandler(async (req, res)=>{
    const { username, email, password } = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered");
    }
    //Hash password
    const ROUNDS = parseInt(process.env.ROUNDS,10);
    const hashedPassword = await bcrypt.hash(password, ROUNDS);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    if(user){
        res.status(201).json({ _id: user.id, email: user.email });
    } else{
        res.status(400);
        throw new Error("User data is not valid");
    }
});

//@desc Login user
//@route POST api/user/login
//@access public
const loginUser = asyncHandler(async (req, res)=>{
    const  {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const user = await User.findOne({ email });
    //compare passwords
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id,
                },
            }, 
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "24h" }
        );
        res.status(200).json({ accessToken });
    } else{
        res.status(401);
        throw new Error("email or password is not valid");
    }
});

//@desc Current user info
//@route POST api/user/current
//@access private
const currentUser = asyncHandler(async (req, res)=>{
    res.json(req.user);
});

module.exports = { allUser, createUser, loginUser, currentUser };