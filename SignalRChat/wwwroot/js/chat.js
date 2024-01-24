<script src="https://cdnjs.cloudflare.com/ajax/libs/microsoft-signalr/3.1.10/signalr.min.js"></script>


"use strict";

// Creating connection to hub
var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

// disable send button until connection is established
document.getElementById("sendButton").disabled = true;

// Client side event handler for ReceiveMessage event
// when client receives msg from server, func executed
connection.on("ReceiveMessage", function (user, message) {
    var li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);
    li.textContent = `${user} says ${message}`;
}); 

// Start method to initiate SignalR connection
// after successful connection, enables button 
connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

// Add event listener to button
// when button clicked, retrieves values from userInput & messageInput
// then invokes server side method sendMessage on SignalR connection with provided values
document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("sendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});