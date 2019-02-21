var express = require('express')
var bodyParser = require('body-parser')
var morgan = require("morgan")
var session = require("express-session")
var db = require('./routes/database')

var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(morgan('dev'))
app.use(session({secret:"wesdfgtrftt564324", saveUninitialized:true, resave:true}))

app.use('/colorlib-regform-17/images', express.static('img'))


//session auth

var auth = function(req,res,next){
    if(req.session.loggedIn){
        next();
    }
    else{
        res.redirect('/');
    }
}


//register
var register = require('./routes/register')
app.route('/register').post(register)
app.get('/register',(req,res)=>{
    res.sendFile(__dirname+'/register.html')
})

//login
var login = require('./routes/login')
app.route('/login').post(login)
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/login.html')
})

//logout
app.get('/logout',function(req,res){
    //req.logout();
    req.session.loggedIn=false;
    res.redirect('/');
});


//home
app.get('/home',auth,(req,res)=>{
    res.sendFile(__dirname+'/home.html')
})

//wordCloud
app.get('/wordcloud',auth,(req,res)=>{
    res.sendFile(__dirname+'/wordcloud.html')
})


//quoteGenerator
app.get('/quotegenerator',auth,(req,res)=>{
    res.sendFile(__dirname+'/quotegenerator.html')
})


//scenarioQuote
app.get('/scenarioquote',auth,(req,res)=>{
    res.sendFile(__dirname+'/scenarioquote.html')
})

app.listen(3000)

console.log('server connected....')
