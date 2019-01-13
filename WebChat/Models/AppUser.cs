using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace Models
{
    public class AppUser : IdentityUser
    {
        public string Token { get; set; }        
    }
}
