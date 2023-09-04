var createError = require('http-errors')
var express = require('express')
var path = require('path')
var logger = require('morgan')
var bodyParser = require('body-parser')
var flash = require('express-flash')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var nodeRoutes = require('./routes/index')
var registerRoute = require('./routes/register')
var loginRoute = require('./routes/login')
var adminRoute = require('./routes/admin')
var userRoute = require('./routes/users')
var chartRoute = require('./routes/charts')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(
  session({
    secret: '123@abcd',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
  }),
)
app.use(flash())

app.use('/', nodeRoutes)
app.use('/register', registerRoute)
app.use('/login', loginRoute)
app.use('/admin', adminRoute)
app.use('/users', userRoute)
app.use('/charts', chartRoute)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

app.listen(80, function () {
  console.log('Node server running...')
})

// error
app.use(function (err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
