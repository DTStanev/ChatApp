using System;
using System.Collections.Generic;

namespace Models.Chat
{
    public class Message
    {
        public Message()
        {
            this.CreatedOn = DateTime.UtcNow;
        }

        public int Id { get; set; }
               
        public string SenderId { get; set; }
        public AppUser Sender { get; set; }

        public DateTime CreatedOn { get; set; }

        public string Content { get; set; }
    }
}
