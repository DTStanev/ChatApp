using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.interfaces;
using ViewModels.Chat;

namespace WebChat.Controllers.Chat
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly IChatService chatService;

        public ChatController(IChatService chatService)
        {
            this.chatService = chatService;
        }

        // GET: api/Chat
        [HttpGet]
        [Route("LoadHistory")]
        public IEnumerable<MessageInfoViewModel> LoadHistory([FromQuery]int messagesToSkip)
        {
            var messages = this.chatService.LoadHistory(messagesToSkip);

            return messages;
        }
    }
}
