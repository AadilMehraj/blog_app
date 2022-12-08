//requiring the modules into the project
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const multer = require("multer");
const appfuncs = require(__dirname + "/functions.js");
const lodash = require("lodash");



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const error = file.mimetype === 'image/jpeg'
        ? null
        : new Error('wrong file');
      cb(error, 'public/images/blog-images');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + uniqueSuffix +".png")
      }
  });
  const upload = multer({ storage: storage })
//declaring content variables
const about ="I am a designer and developer. This is my first node and ejs website. I am really excited about it!";
const contact ='You can contact me at aadiladi786@gmail.com';
const homeContent = "Welcome to my blog. Get the latest insights in the tech industry every day!";

//Blog Data
class BlogPost {
    constructor(bt, bd , bsd,  hm, dt) {
        this.header_image = hm;
        this.blog_title = bt,
        this.blog_description = bd;
        this.blog_short_description = bsd;
        this.b_date=dt;
    }
}
let posts = [];

const app = express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set("view engine", "ejs");




app.listen("3000", ()=>{
    console.log("Server started at port 3000");
})

app.get("/", (req,res) => {
    res.render("home",{headline: homeContent, blogList: posts});
})

app.get("/about", (req,res) => {
    res.render("about", {about_adil: about});
})

app.get("/contact", (req,res)=>{
    res.render("contact",{contact_aadil: contact});
})

app.get("/compose", (req,res)=>{
    res.render("compose");
})

// app.get("/post", (req, res) =>{
//     res.render("post");
// })

// app.post("/post", (req, res)=>{
//     let i = req.body.index;
//     res.render("post",{b_img: posts[i].header_image, b_header: posts[i].blog_title, b_body: posts[i].blog_description, p_date: posts[i].b_date})
// })

app.post("/compose", upload.single('blogImage'),(req,res)=>{
    let post = new BlogPost(req.body.blogTitle, req.body.blogDescription, appfuncs.shortDesc(req.body.blogDescription), req.file.filename, appfuncs.postDate());
    posts.push(post);
    res.render("compose");
})

app.post("/post/:postName", function (req, res){
    
    var requestedTitle = lodash.lowerCase(req.params.postName);
    posts.forEach(function(post){
        let savedTitle = lodash.lowerCase(post.blog_title); 

        if (savedTitle == requestedTitle)
        {       
            let postEndpoint = lodash.kebabCase(savedTitle);

            console.log("Match Found!")
            res.render("post",{b_img: post.header_image, b_header: post.blog_title, b_body: post.blog_description, p_date: post.b_date} )
        } 
        else
        {
            console.log("Not Found!");
        }
    
    })
   

})