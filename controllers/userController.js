const User = require('../models/UserModel')

const  bcrypt = require('bcryptjs')

exports.signUp = async (req, res, next) => {
    const {username, password} = req.body
    const hashedPassword = await bcrypt.hash(password, 12)
    try {
        const newUser = await User.create({username, password:hashedPassword})
        req.session.user = newUser
        res.status(201).json({
            status: 'success',
            data: {
                newUser
            },
            message: 'User created'
        })
    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }  
}

exports.login = async (req, res, next) => {
    const {username, password} = req.body
    try {
        
        const user = await User.findOne({ 
                username:username 
            })
        if(!user){
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            })
        }
        const result = await bcrypt.compare(password , user.password)
        if(!result){
            return res.status(400).json({
                status: 'fail',
                message: 'Incorrect password'
            })
        }else {
            // store user data in session ( redis db )
            req.session.user = user
            res.status(200).json({
                status: 'success',
                data: {
                    username 
                }
            })
        }
    }catch(err){
        console.log(err)
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}
