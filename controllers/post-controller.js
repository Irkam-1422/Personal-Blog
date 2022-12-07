const Post = require('../models/post')
const createPath = require('../helpers/create-path')

const handleError = (res, error) => {
    console.log(error)
    res.render(createPath('error'), {title: 'Error'})
}

const getPost = (req,res) => {
    const title = 'Post'
    Post
        .findById(req.params.id)
        .then((post) => res.render(createPath('post'), { title, post }))
        .catch((error) => handleError(res,error))
}

const deletePost = (req, res) => {
    const title = 'Post'
    Post
        .findByIdAndDelete(req.params.id)
        .then(result => {
            result.sendStatus(200)
        })
        .catch((error) => handleError(res,error))
}

const getEditPost = (req, res) => {
    const title = 'Edit Post'
    Post
        .findById(req.params.id)
        .then((post) => res.render(createPath('edit-post'), { title, post }))
        .catch((error) => handleError(res,error))
}

const editPost = (req, res) => {
    const {title,author,text} = req.body
    const {id} = req.params
    Post
        .findByIdAndUpdate(id, {title,author,text})
        .then(result => res.redirect(`/posts/${id}`))
        .catch((error) => handleError(res,error))
}

const getPosts = (req, res) => {
    const title = 'Posts'
    Post
        .find()
        .sort({ createdAt: -1 })
        .then((posts) => res.render(createPath('posts'), { title, posts }))
        .catch((error) => handleError(res,error))
}

const getAddPost = (req, res) => {
    const title = 'Add post'
    res.render(createPath('add-post'), { title })
}

const addPost = (req,res) => {
    // res.send(req.body)
    const {title, author, text} = req.body

    const post = new Post({ title, author, text })
    post.date = (new Date()).toLocaleDateString()
    post
       .save() 
       .then((result) => res.send(result))  
       .catch((error) => handleError(res,error))

    res.redirect('/posts')
    //.then((result) => res.send(result)) 
}

module.exports = {
    getPost,
    deletePost,
    getEditPost,
    editPost,
    getPosts,
    getAddPost,
    addPost
}