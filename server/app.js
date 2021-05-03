// dependencies
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const expressSession = require('express-session');
// load configuration
const port = process.env.PORT || 8000;
const config = require('./config/jwt')

// express configuration
const app = express();

// cross domain
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})

// parse
app.use(bodyParser.json({ limit : "50mb" }));
app.use(bodyParser.urlencoded({ limit:"50mb", extended: true}));
app.use(cookieParser());

// print the request log on console
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '../build')))
// app.get('*', (req,res) => {
//     res.sendFile(path.join(__dirname, '../build/index.html'))
// })
// app.post('*', (req,res) => {
//     res.sendFile(path.join(__dirname, '../build/index.html'))
// })
// set the secret key variable for jwt
app.set('jwt-secret', config.secret);

// router
app.use('/', require('./routes/index'));
// app.use(
// 	expressSession({
// 	    resave: false,
// 	    saveUninitialized: false,
// 	    secret: process.env.COOKIE_SECRET,
// 	    proxy: true,
// 	    cookie: {
// 		    httpOnly: true,
// 		    secure: process.env.NODE_ENV === 'development' ? false : true,
// 		    sameSite: process.env.NODE_ENV === 'development' ? false : 'none'
// 		},
// 	})
// );
// open server
app.listen(port, () => {
    console.log(`express is running on ${port}`);
})


// connection.end();
