using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using ViewModels;

namespace Services.interfaces
{
    public interface IAccountService
    {
        Task<IdentityResult> RegisterUser(RegisterInputViewModel model);
    }
}
