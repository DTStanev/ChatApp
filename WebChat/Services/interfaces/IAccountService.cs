using Microsoft.AspNetCore.Identity;
using Models;
using System.Threading.Tasks;
using ViewModels.Accounts;

namespace Services.interfaces
{
    public interface IAccountService
    {
        Task<IdentityResult> RegisterUser(RegisterInputViewModel model);

        Task<AppUser> Authenticate(string username, string password);

        AppUser GetUserByUsername(string username);

        RegisteredUsersInfoViewModel[] GetRegisteredUsers();
    }
}
