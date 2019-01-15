using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;
using ViewModels.Chat;

namespace WebChat.Hubs
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class ChatHub : Hub
    {
        public async Task Send(string message)
        {
            var name = Context.User.Identity.Name;

            var newMeesage = new MessageInfoViewModel
            {
                Sender = name,
                Content = message,               
            };
            
            await this.Clients.All.SendAsync("NewMessage", newMeesage);    
        }

        public async Task SendChatMessage(string who, string message)
        {
            string name = Context.User.Identity.Name;

            var newMessage = new MessageInfoViewModel
            {
                Sender = name,
                Content = message,
            };

            await Clients.Group(who).SendAsync("NewMesage", newMessage);
        }

        public override Task OnConnectedAsync()
        {
            string name = Context.User.Identity.Name;

            Groups.AddToGroupAsync(Context.ConnectionId, name);

            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)

        {
            return base.OnDisconnectedAsync(exception);
        }
    }
}