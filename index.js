// using commonjs environment 
const express = require('express')

const mongoose = require('mongoose')

const session = require('express-session')

const redis = require('redis')

const cors = require('cors')

let RedisStore = require('connect-redis').default  // set redis as the session store


const { MONGO_USER, 
    MONGO_PASSWORD, 
    MONGO_IP, 
    MONGO_PORT,
    REDIS_URL,
    REDIS_PORT,
    SECRET_REDIS
} = require('./config/config')

let redisClient = redis.createClient({
    url: `redis://${REDIS_URL}:${REDIS_PORT}`
    // host: REDIS_URL, // redis URL
    // port: REDIS_PORT // redis port
}) // An instance of redis or the interface that connects your express app to express server.

redisClient.connect().catch(err => console.error(err))

const app = express() 

const postRouter = require('./routes/postRoutes')

const userRouter = require('./routes/userRoutes')

// database or IP address of the database
const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

const connectWithRetry = () => {
    mongoose.connect(mongoUrl) 
        .then(() => console.log('Connected to MongoDB...'))
        .catch(err => {
            console.error('Could not connect to MongoDB...', err)
            setTimeout(connectWithRetry, 5000)
        });
        
}

connectWithRetry()

app.enable('trust proxy') // to make sure that the request is coming from the same origin
app.use(cors({})) // to allow the request from the client to the server 
app.use(session({   
    store: new RedisStore({ client: redisClient}), // store manage the session data
    secret: SECRET_REDIS,
    cookie: { // this cookie holds the id of the session related to the user who sent the request
        secure: false,
        resave: false,
        saveUninitialized: false,
        httpOnly: true,
        maxAge: 300000 // the time that the session will be stored in the server after that it will be deleted
    }
    }) // sessions allow you to store data that persist ( should stay, or usually needed) without storing it directly in client
)

app.use(express.json()) // to parse the body of the request and attached it to request

app.get('/api/v1' , (req , res) => {

    res.send('<h1>Welcome to express API v1 !</h1>')
    console.log("Hello from the server !")
    })



// if the request comes to posts endpoint ot will send it to the postRouter
app.use("/api/v1/posts", postRouter)
app.use("/api/v1/users", userRouter)

const port = process.env.PORT || 3000 // means that if the environment variable called portis set to a value we gonna take it else we gonna use 3000 

app.listen( port , () =>  console.log(`Hello ${process.env.NAME} !, from port ${port}`))



