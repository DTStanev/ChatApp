using Data;
using Models.Chat;
using Services.interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ViewModels.Chat;

namespace Services
{
    public class ChatService : BaseService, IChatService
    {
        public ChatService(ChatAppDbContext db)
            : base(db)
        {
        }

        public IEnumerable<MessageInfoViewModel> GetMessages(int messageCount = 0)
        {
            if (messageCount == 0)
            {
                messageCount = 50;
            }
            

            var messages = this.db.MessagesHistory
                .OrderByDescending(x => x.CreatedOn)
                .Take(messageCount)
                .Select(x => new MessageInfoViewModel
                {
                    Id = x.Id,
                    Sender = x.Sender.UserName,
                    Content = x.Content,
                })
                .ToArray()
                .Reverse()
                .ToArray();

            return messages;

        }

        public async Task StoreMessage(MessageInfoViewModel message)
        {
            var userId = this.db.Users.SingleOrDefault(x => x.UserName.ToLower() == message.Sender.ToLower()).Id;

            var newMessage = new Message
            {
                CreatedOn = DateTime.Now,
                SenderId = userId,
                Content = message.Content
            };

            await this.db.MessagesHistory.AddAsync(newMessage);
            await this.db.SaveChangesAsync();
        }
    }
}
