using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using ViewModels.Chat;

namespace BasicChat
{
    [Authorize]
    public class ChatHub : Hub
    {
        public void SendChatMessage(string who, string message)
        {
            string name = Context.User.Identity.Name;

            var newMessage = new MessageInfoViewModel
            {
                Sender = name,
                Content = message
            };

            Clients.Group(who).SendAsync("NewMesage", newMessage);
        }

        public override Task OnConnectedAsync()
        {
            string name = Context.User.Identity.Name;

            Groups.AddToGroupAsync(Context.ConnectionId, name);

            return base.OnConnectedAsync();
        }
    }
}