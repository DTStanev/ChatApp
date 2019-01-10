using System.ComponentModel.DataAnnotations;
using ViewModels.Common;

namespace ViewModels
{
    public class RegisterInputViewModel
    {
        [Required]
        [StringLength(30, MinimumLength = 4)]
        [RegularExpression(ViewModelConstants.UsernameValidationRegex)]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string ConfirmPassword { get; set; }

        [Required]
        [RegularExpression(ViewModelConstants.EmailValidationRegex)]
        public string Email { get; set; }
    }
}
