


function orderSocketHandler(socket){

  console.log("New order connection..");

  // const user_id = socket.handshake.query.user_id 


  // console.log("online users", online_users);


  socket.on("disconnect", () => {
    console.log("Socket disconnected");
    // online_users.delete(user_id);
  });

  socket.on("get-orders", (msg) => {
    console.log("message comming from here: ${msg}");
  });
}

export default orderSocketHandler