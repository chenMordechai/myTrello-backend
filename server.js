const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const userService = require('./services/user.service')
const boardService = require('./services/board.service')

const app = express()
const port = 3000




app.use(bodyParser.json())
app.use(cookieParser())

// app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } //if its true its didn't work the: req.sesion.loggedinUser
}))

// if (process.env.NODE_ENV !== 'production') {
const corsOptions = {
    origin: ['http://localhost:8080'],
    credentials: true
};
app.use(cors(corsOptions));
// }



app.get('/', (req, res) => {
    res.send('Hello World!')
})

// user:
app.get('/api/user', (req, res) => {

    userService.query()
        .then(users => {
            res.json(users)

        })
})

app.get('/api/user/:id', (req, res) => {
    const userId = req.params.id
    userService.getById(userId)
        .then(user => {
            res.json(user)
        })
})

app.delete('/api/user/:id', (req, res) => {
    const userId = req.params.id
    userService.remove(userId)
        .then(() => {
            res.end('end')
        })
})

app.put('/api/user/:id', (req, res) => {
    const user = req.body
    userService.save(user)
        .then(savedUser => {
            res.json(savedUser)
        })
})

app.post('/api/user', (req, res) => {
    const user = req.body
    userService.save(user)
        .then(savedUser => {
            res.json(savedUser)
        })
})

app.post('/api/login', (req, res) => {
    const credentials = req.body
    userService.login(credentials)
        .then(user => {
            if (user) {
                req.session.loggedinUser = user;
                ('after login the loggedin user:', req.session.loggedinUser)
                res.json(user)
            } else {
                res.status(401).json({ nsg: 'Invalid Name/Password' })
            }
        })
})

app.post('/api/logout', (req, res) => {
    req.session.destroy();
    res.end()
})

app.get('/api/loggedinUser', (req, res) => {
    const loggedinUser = req.session.loggedinUser
    console.log('get loggedin user' ,loggedinUser )
    // if (loggedinUser) res.json(loggedinUser)
    // else res.status(401).json({ nsg: 'No loggedinUser ' })
    res.json(loggedinUser)
})




// board
app.get('/api/board', (req, res) => {
    boardService.query()
        .then(boards => {
            res.json(boards)

        })
})

app.get('/api/board/:id', (req, res) => {
    const boardId = req.params.id
    boardService.getById(boardId)
        .then(board => {
            res.json(board)
        })
})

app.delete('/api/board/:id', (req, res) => {
    const boardId = req.params.id
    boardService.remove(boardId)
        .then(() => {
            res.end('end')
        })
})

app.put('/api/board/:id', (req, res) => {
    const board = req.body
    boardService.save(board)
        .then(savedBoard => {
            res.json(savedBoard)
        })
})

app.post('/api/board', (req, res) => {
    const board = req.body
    boardService.save(board)
        .then(savedBoard => {
            res.json(savedBoard)
        })
})


app.listen(port, () => console.log(`App listening at http://localhost:${port}`))


