using System.ComponentModel.DataAnnotations;
using ViewModels.Common;

namespace ViewModels
{
    public class RegisterInputViewModel
    {
        [Required]    
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string ConfirmPassword { get; set; }

        [Required]
        public string Email { get; set; }
    }
}
