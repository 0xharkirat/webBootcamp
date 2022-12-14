//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true });

const arcticleSchema = {
    title: String,
    content: String
}

const Article = mongoose.model("Article", arcticleSchema);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

//TODO
app.route("/articles")
    .get(function (req, res) {
        Article.find(function (err, foundArticles) {
            if (err) {
                res.send(err);
            }
            else {
                res.send(foundArticles);
            }
        })})

    .post(function (req, res) {
        console.log(req.body.title);
        console.log(req.body.content);

        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        })

        newArticle.save(function (err) {
            if (err) {
                res.send(err);
            }
            else {
                res.send("Successfully added a new article");
            }
        })})

    .delete(function (req, res) {
        Article.deleteMany(function (err) {
            if (err) {
                res.send(err);
            }
            else {
                res.send("Successfully deleted all articles");
            }
        })});


app.route("/articles/:articleName")

.get(function (req, res) {
    const articleName = req.params.articleName;

    Article.findOne({title: articleName}, function (err, foundArticle) {
        if(err){
            res.send(err);
        }
        else{

            if(foundArticle){
                res.send(foundArticle)

            }
            else{
                res.send("No such article found")
            }
        }
    });
})

.put(function (req, res) {

    const articleName = req.params.articleName;
    Article.updateOne(
        {title: articleName},
        {title: req.body.title, content: req.body.content},
        function (err) {
            if (err){
                res.send(err);
            }
            else{
                res.send("Successfully updated article")
            }
        }
    );
})

.patch(function (req, res) {
    const articleName = req.params.articleName;
    Article.updateOne(
        {title: articleName},
        {$set: req.body},
        function (err) {
            if(err){
                res.send(err);
            }
            else{
                res.send("successfully updated")
            }
        }
    );
})

.delete(function (req, res){
    const articleName = req.params.articleName;
    Article.deleteOne(
        {title: articleName},
        function (err) {
            if(err){
                res.send(err);
            }
            else{
                res.send("Successfully deleted the article")
            }
        }
    )
})


app.listen(3000, function () {
    console.log("Server started on port 3000");
});