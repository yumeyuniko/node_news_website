const express = require('express')
const newsRouter = express.Router()
const axios = require('axios')

require('dotenv').config();


newsRouter.get('', async (req, res) => {
   try {
     const newsAPI = await axios.get(`https://raddy.co.uk/wp-json/wp/v2/posts/`)
    //  const newsAPI = await axios.get(`https://newsapi.org/v2/top-headlines?country=jp&apiKey=${process.env.NEWS_API_KEY}`)
     
     res.render('news', {articles: newsAPI.data})
    //  console.log('news', newsAPI.data )
    //  console.log(`タイトル: ${newsAPI.data.articles[0].title}`)
   } catch (err) {
     if (err.response) {
      res.render('news', {articles: null})
      console.log(err.response.data)
      console.log(err.response.status)
      console.log(err.response.headers)
     } else if (err.request) {
       res.render('news', {articles: null})
       console.log(err.request)
     } else {
       res.render('news', {articles: null})
       console.error('Error', err.message)
    }
   }
})


newsRouter.get('/:id', async (req, res) => {
  let articleID = req.params.id


   try {
     const newsAPI = await axios.get(`https://raddy.co.uk/wp-json/wp/v2/posts/${articleID}`)     
     res.render('newsSingle', {article: newsAPI.data})
   } catch (err) {
     if (err.response) {
      res.render('newsSingle', {article: null})
      console.log(err.response.data)
      console.log(err.response.status)
      console.log(err.response.headers)
     } else if (err.request) {
       res.render('newsSingle', {article: null})
       console.log(err.request)
     } else {
       res.render('newsSingle', {article: null})
       console.error('Error', err.message)
    }
   }
})

// https://raddy.co.uk/wp-json/wp/v2/posts?search=photoshop
newsRouter.post('', async (req, res) => {
  let search = req.body.search
   try {
     const newsAPI = await axios.get(`https://raddy.co.uk/wp-json/wp/v2/posts?search=${search}`)
     res.render('newsSearch', {articles: newsAPI.data})
   } catch (err) {
     if (err.response) {
      res.render('newsSearch', {articles: null})
      console.log(err.response.data)
      console.log(err.response.status)
      console.log(err.response.headers)
     } else if (err.request) {
       res.render('newsSearch', {articles: null})
       console.log(err.request)
     } else {
       res.render('newsSearch', {articles: null})
       console.error('Error', err.message)
    }
   }
})
module.exports = newsRouter