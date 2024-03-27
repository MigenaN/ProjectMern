require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const socket = require('socket.io');
const app = express();
// const myFirstSecret = process.env.FIRST_SECRET_KEY;
app.use(cookieParser());
// Change the app.use(cors()) to the one below
app.use(cors({credentials: true, origin: 'http://localhost:5173'}));

app.use(express.json());                           /* This is new and allows JSON Objects to be posted */
app.use(express.urlencoded({ extended: true }));   /* This is new and allows JSON Objects with strings and arrays*/
require('./config/mongoose.config');    /* This is new */
require('./routes/book.routes')(app);
require('./routes/user.routes')(app);
const server = app.listen(8000, () => {
    console.log("Listening at Port 8000")
})

// const io = socket(server, {
//     cors: {
//         origin: 'http://localhost:5173',
//         methods: ['GET', 'POST'],
//         allowedHeaders: ['*'],
//         credentials: true,
//     }
// });

// io.on("connection", socket => {

//     console.log("we just connected");
//     socket.on("createdNewBook", data => {

//         // send a message with "data" to ALL clients EXCEPT for the one that emitted the
//     	//     "event_from_client" event
//         socket.broadcast.emit("createdNew", data);
//     });
    
//     // We add our additional event listeners right inside this function
//     // NOTE: "connection" is a BUILT IN events listener
// });