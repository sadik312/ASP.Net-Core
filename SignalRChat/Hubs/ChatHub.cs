using Microsoft.AspNetCore.SignalR;

namespace SignalRChat.Hubs
{
    // Hub is builtin class from SignalR
    // hub class manages connections, groups, messaging
    public class ChatHub : Hub     {
        public async Task SendMessage(string user, string message)
        // sendMessage method invoked by client to send msg to all clients
        // SignalR is asynchronous to provide max stability
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}