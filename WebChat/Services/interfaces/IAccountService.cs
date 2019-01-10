using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using ViewModels;

namespace Services.interfaces
{
    public interface IAccountService
    {
        Task<IdentityResult> Registeruser(RegisterInputViewModel model);
    }
}
