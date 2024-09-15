const Post = require('../models/postModel')

exports.getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find()
        res.status(200).json({
            status: 'success',
            results: posts.length,
            data: {
                posts
            }
        })
    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

exports.getPostById = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id)	

        if(!post){
            res.status(404).json({
                status: 'fail',
                message: 'Post not found'
            }) 
        }
        res.status(200).json({
            status: 'success',
            data: {
                post
            }
        })
    }catch(err){
        console.log(err)
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}


exports.postPost = async (req, res, next) => {
    try {
        const post = await Post.create(req.body)
        res.status(201).json({
            status: 'success',
            data: {
                post
            }
        })
    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

exports.updatePost = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id , req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            status: 'success',
            data: {
                post
            }
        })
    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

exports.deletePost = async (req, res, next) => {
    try {
        await Post.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: 'success',
            data: null
        })
    }catch(err){
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}