//  'use strict';
// var clients=[]
// // function whosOnline(user1){
// //   //return list of online users
// // }
// function printClients(list){
//   for (var count=0;count<list.length;count++){
//     console.log(list[count].id+'    '+ list[count].username);
//   }
// }
// function constructClient(name,id){ //use mongoose model eventually
//   // console.log(name);
//   var client={username:name,id:id};
//   return client;
// }
// function findId(username){
//   for (var x=0;x<clients.length;x++){
//     if (clients[x].username==username){
//       return clients[x].id;
//     }
//   }
//   return null;
// }
// function updateClients(username,socketid){//add online offline circumtstances
//   //search client list and update new socket for user
//   //do something like- if find(id)!=null, then set id to whatever
//   var x;
//   for (x=0;x<clients.length;x++){
//     if (clients[x].username==username){
//       clients[x].id=socketid;
//
//     }
//   }
//   if (x==clients.length){
//     clients.push(constructClient(username,socketid));
//   }
// }
// module.exports= function(io){
//   io.on('connection', function(socket){
//     // console.log('user connected');
//     // socket.username="user1";
//     // clients.push({(socket.handshake.query.UserName):socket.id});
//     // var clientObj=constructClient(socket.handshake.query.UserName,socket.id);
//     // clients.push(clientObj);
//     updateClients(socket.handshake.query.UserName,socket.id);
//     printClients(clients);
//     console.log('end');
//     // console.log(socket.handshake.query.UserName);
//     // printClients(clients);
//     // console.log(socket);
//     socket.on('chat message', function(msg){
//       // msg={msg content, sendee}
//       // check if sendee online via clients[sendee.socketid] if not send message to inbox, else send message
//       // console.log('message: '+ msg.content);
//       var recipient=findId(msg.recipient);
//       // io.emit('chat message', msg);
//       console.log("sender:"+msg.sender+" recipient: "+ msg.recipient + "message: "+ msg.content)
//       // io.sockets.emit("chat message",socket.username,msg+socket.username);
//       io.sockets.connected[recipient].emit("chat message",msg);
//     });
//     socket.on('disconnect',function(){
//       console.log('disconnected');
//       //save to database on disconnect
//     })
//     socket.on('request chat',function(req){
//         //check if recipient is online
//         //set up method for live chat room
//
//     });
//   });
// };
