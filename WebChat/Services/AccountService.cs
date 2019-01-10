using Data;
using Microsoft.AspNetCore.Identity;
using Models;
using Services.interfaces;
using System.Threading.Tasks;
using ViewModels;

namespace Services
{
    public class AccountService : BaseService, IAccountService
    {
        private readonly UserManager<AppUser> userManager;

        public AccountService(ChatAppDbContext db, UserManager<AppUser> userManager)
            : base(db)
        {
            this.userManager = userManager;
        }

        public async Task<IdentityResult> RegisterUser(RegisterInputViewModel model)
        {
            var user = new AppUser { UserName = model.Username, Email = model.Email, NormalizedEmail = model.Username };

            var result = await this.userManager.CreateAsync(user, model.Password);

            return result;

        }
    }
}
