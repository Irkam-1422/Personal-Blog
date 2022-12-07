const express = require('express')
const chalk = require('chalk')
const mongoose = require('mongoose');
require('dotenv').config();
const methodOverride = require('method-override')
const postRoutes = require('./routes/post-routes')
const postApiRoutes = require('./routes/api-post-routes')
const contactRoutes = require('./routes/contact-routes')
const createPath = require('./helpers/create-path')

const errorMsg = chalk.bgKeyword('white').redBright;
const successMsg = chalk.bgKeyword('green').white;

const app = express()
app.set('view engine', 'ejs')

mongoose
    .connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((res) => console.log(successMsg('Connected to DB')))
    .catch((error) => console.log(errorMsg(error)))

//const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`)

app.listen(process.env.PORT, (error) => {
    error ? console.log(errorMsg(error)) : console.log(successMsg(`Listening port ${process.env.PORT}`));
})

// app.use((req,res,next) => {
//     console.log(`path: ${req.path}`);
//     console.log(`path: ${req.method}`);
//     next()
// })

app.use(express.urlencoded({extended: false}))

app.use(express.static('styles'))

app.use(methodOverride('_method'))

app.get('/', (req, res) => {
    const title = 'Home'
    res.render(createPath('index'), { title })
})

// app.get('/contacts', (req, res) => {
//     const title = 'Contacts'
//     Contact
//         .find()
//         .then((contacts) => res.render(createPath('contacts'), { title, contacts }))
//         .catch((error) => {
//             console.log(error)
//             res.render(createPath('error'), {title: 'Error'})
//            })
// })

// app.get('/posts/:id', (req, res) => {
//     const title = 'Post'
//     Post
//         .findById(req.params.id)
//         .then((post) => res.render(createPath('post'), { title, post }))
//         .catch((error) => {
//             console.log(error)
//             res.render(createPath('error'), {title: 'Error'})
//            })
// })

// app.delete('/posts/:id', (req, res) => {
//     const title = 'Post'
//     Post
//         .findByIdAndDelete(req.params.id)
//         .then(result => {
//             result.sendStatus(200)
//         })
//         .catch((error) => {
//             console.log(error)
//             res.render(createPath('error'), {title: 'Error'})
//            })
// })

// app.get('/edit/:id', (req, res) => {
//     const title = 'Edit Post'
//     Post
//         .findById(req.params.id)
//         .then((post) => res.render(createPath('edit-post'), { title, post }))
//         .catch((error) => {
//             console.log(error)
//             res.render(createPath('error'), {title: 'Error'})
//            })
// })

// app.put('/edit/:id', (req, res) => {
//     const {title,author,text} = req.body
//     const {id} = req.params
//     Post
//         .findByIdAndUpdate(id, {title,author,text})
//         .then(result => res.redirect(`/posts/${id}`))
//         .catch((error) => {
//             console.log(error)
//             res.render(createPath('error'), {title: 'Error'})
//            })
// })

// app.get('/posts', (req, res) => {
//     const title = 'Posts'
//     Post
//         .find()
//         .sort({ createdAt: -1 })
//         .then((posts) => res.render(createPath('posts'), { title, posts }))
//         .catch((error) => {
//             console.log(error)
//             res.render(createPath('error'), {title: 'Error'})
//            })
//     // const posts = [
//     //     {
//     //         id: '1',
//     //         title: 'My Day',
//     //         text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem sit vel ad expedita totam cumque ullam odit, iste recusandae ratione, debitis assumenda cupiditate asperiores laboriosam, numquam dolorem eaque dignissimos incidunt!',
//     //         date: '05.12.2022',
//     //         author: 'Iryna'
//     //     }
//     // ]
//     //res.render(createPath('posts'), { title, posts })
// })

// app.post('/add-post', (req,res) => {
//     // res.send(req.body)
//     const {title, author, text} = req.body

//     const post = new Post({ title, author, text })
//     post.date = (new Date()).toLocaleDateString()
//     post
//        .save() 
//        .then((result) => res.send(result)) 
//        .catch((error) => {
//         console.log(error)
//         res.render(createPath('error'), {title: 'Error'})
//        })
//     res.render(createPath('post'), { title, post })
// })

// app.get('/add-post', (req, res) => {
//     const title = 'Add post'
//     res.render(createPath('add-post'), { title })
// })

app.get('/about-us', (req, res) => {
    res.redirect('/contacts')
})

app.use(postRoutes)
app.use(postApiRoutes)
app.use(contactRoutes)

app.use((req, res) => {
    const title = 'Error'
    //res.statusCode = 404
    res
    .status(404)
    .render(createPath('error'), { title })
})

