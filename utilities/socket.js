const socket_IO = require('socket.io');
const userModel = require('../models/userModel');
const driverModel = require('../models/driverModel');

let io;

function initSocket(server) {
    io = socket_IO(server,{
        cors : {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', function(socket){


        socket.on('join', async (data) => {
            const {userId,userType} = data;

            if(userType === 'user'){
                await userModel.findByIdAndUpdate(userId,{$set:{socket_id:socket.id}});
            } else if(userType === 'driver'){
                await driverModel.findByIdAndUpdate(userId,{$set:{socket_id:socket.id}});
            }
        });
        socket.on('driver-location-update', async (data) => {
            const {driverId,latitude,longitude} = data;
           
            await driverModel.findByIdAndUpdate(driverId,{$set:{location:{latitude,longitude}}});
            
        });
    });
}

function sendMessage(socket_id,message){
    if(io){
        io.to(socket_id).emit(message.event,message.data);
    } else {
        console.log('socket not initialized');
    }
}

module.exports = {
    initSocket,
    sendMessage
}