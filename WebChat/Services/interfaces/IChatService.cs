using System.Collections.Generic;
using System.Threading.Tasks;
using ViewModels.Chat;

namespace Services.interfaces
{
    public interface IChatService
    {
        IEnumerable<MessageInfoViewModel> GetMessages(int messageCount = 50);

        Task StoreMessage(MessageInfoViewModel message);

        IEnumerable<MessageInfoViewModel> LoadHistory(int messagesToSkip);
    }
}
