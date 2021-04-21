const app = require("./app");
const debug = require("debug")("node-angular");
const http = require("http");
const mongoose = require('mongoose');
const {
  mongoURL,
  port: appPort,
  httpProtocol,
  clientHostname,
  clientPort
} = require("./configuration");

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// change the db
mongoose.connect(`mongodb+srv://${mongoURL}/OSTteam?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .then(() => {
    console.log('everything in place');
  })
  .catch(() => {
    console.log('connection failed');
  });

const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || appPort);
app.set("port", port);

const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: `${httpProtocol}://${clientHostname}:${clientPort}`,
    methods: ["GET", "POST"]
  }
});

// io.on('connection', socket => {
//   let counter = 0;
//   setInterval(() => {
//     socket.emit('new order', ++counter);
//     // console.log(counter);
//   }, 1000);
// });

server.on("error", onError);
server.on("listening", onListening);
server.listen(port);

//passing the server
app.set('socketio', io);
