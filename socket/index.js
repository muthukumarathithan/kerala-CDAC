const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const db = require('./models')

const port = process.env.PORT || 4001;
const app = express();

// our server instance
const server = http.createServer(app);
// This creates our socket using the instance of the server
const io = socketIO(server);



io.on("connection", socket => {
    console.log("New client connected" + socket.id);

    //console.log(socket);
  // Returning the initial data of food menu from FoodItems collection
    socket.on("get_data", (user) => {
         db.Vehicle.find({customer:user.id}).then(docs => {
        io.sockets.emit("get_data", docs);
      });
      
      
    });

/**
  changeStream.on('change', function(change) {
      console.log('COLLECTION CHANGED');

      db.Vehicle.find({}, (err, data) => {
          if (err) throw err;

          if (data) {
              // RESEND ALL USERS
              io.sockets.emit("get_data", data);
            }
      });
  });
 */
   
  
  // disconnect is fired when a client leaves the server
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });

  server.listen(port, () => console.log(`Listening on port ${port}`));
