


function orderSocketHandler(socket, io) {
  console.log("New order connection..");

  socket.on("sendMessage", (msg) => {
    io.emit("get-message", msg);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });
}

export default orderSocketHandler