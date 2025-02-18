import { Socket, Server } from "socket.io";
import http from "http";
import { app } from "./app.js";
import { config } from "dotenv";
import { connect } from "./utils/db.js";
import { acceptOffer, rejectOffer } from './utils/tradeHandlers.js'; // Assuming these functions update your database accordingly
import { isKeyObject } from "util/types";

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

config({
  path: "./config.env",
});

connect();

io.on("connection", (socket) => {
  console.log("USER CONNECTED:", socket.id);

  socket.on('joinTradeRoom', (tradeId) => {
    console.log(`User ${socket.id} joined room ${tradeId}`);
    socket.join(tradeId);
  });

  socket.on('leaveTradeRoom', (tradeId) => {
    console.log(`User ${socket.id} left room ${tradeId}`);
    socket.leave(tradeId);
  });

  socket.on('newOffer', ({ tradeId, offer }) => {
    // Assuming offer includes all necessary details
    console.log(`New offer on trade ${tradeId} by ${socket.id}`);
    // Broadcast this offer to everyone in the room except the sender
    socket.to(tradeId).emit('newOffer', offer);
  });

 // Server-side Socket.IO event handling
  socket.on('acceptOffer', async ({ tradeId, offerId }) => {
    const result = await acceptOffer(tradeId, offerId);
    if (result.success) {
        // Notify everyone in the trade room that the offer was accepted
        io.in(tradeId).emit('offerAccepted', offerId);
        // Close the trade and notify users
        io.in(tradeId).emit('tradeClosed', { tradeId, offerId });
        // Disconnect all users from the trade room
        const socketsInRoom = await io.in(tradeId).fetchSockets();
        socketsInRoom.forEach((socket) => {
          socket.leave(tradeId);
        });
    } else {
        socket.emit('error', result.message);
    }
});


  socket.on('rejectOffer', async ({ tradeId, offerId }) => {
    const result = await rejectOffer(tradeId, offerId);
    if (result.success) {
        // Notify specific clients or take other actions as needed
        socket.to(tradeId).emit('offerRejected', offerId);
    } else {
        socket.emit('error', result.message);
    }
  });

});

server.listen(8000, () => {
  console.log("Server is running on port 8000");
});
