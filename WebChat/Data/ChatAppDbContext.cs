using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Models;
using Models.Chat;
using System;

namespace Data
{
    public class ChatAppDbContext : IdentityDbContext<AppUser>
    {
        public ChatAppDbContext(DbContextOptions<ChatAppDbContext> options)
            : base(options) { }

        public DbSet<Message> MessagesHistory { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
