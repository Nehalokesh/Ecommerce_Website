const User = require('../models/userModel');
const bcrypt = require('bcrypt')
const asyncHandler = require('../utils/asyncHandler');
const BaseError = require('../utils/BaseError');


exports.signUp = asyncHandler(async(req, res)=>{

    const{
        name,
        email,
        password
    }=req.body;

    // check if the email already exists
    const existingUser = await User.findOne({email});

    if(existingUser){
        // return 409 conflict response if the email already exists
        throw new BaseError(409,'Email already exists')
    }

    const saltRounds = 10;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    if(!hashedPassword){
        // throw an error as a 400 bad request if password hashing fails
        throw new BaseError(400,"invalid password hash");
    }

    // create a new user record in the database 
    const newUser =  new User({
        name,
        email,
        password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({message:'user created successfully'})
})

exports.login = asyncHandler(async(req,res)=>{
    const {email, password} = req.body


    // find the user by email
    const user = await User.findOne({email}).lean();

    if(!user){
        // if the user not found from the database throw a 404 error as user not found 
        throw new BaseError(404,'User not found')
    }

    // comparing the password with bcrypt password 
    const passwordMatch = await bcrypt.compare(password, user.password);

    if(!passwordMatch){
    //     // if password is not match throw a error as invalid password 
        throw new BaseError(401,'Invalid password');
    }
    // if the hashed password  is matched it will login successfully 
    res.status(200).json({message:'Login successful'})
})

