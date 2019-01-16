using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.interfaces;
using ViewModels.Accounts;

namespace WebChat.Controllers.Accounts
{   
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly IAccountService accountService;

        public AccountsController(IAccountService accountService)
        {
            this.accountService = accountService;
        }

        // GET: api/Accounts
        [HttpGet]
        [Route("GetPersonalData")]
        public PersonalDataViewModel GetUsers()
        {
            var name = this.User.Identity.Name;
            var user = this.accountService.GetPersonalData(name);

            return user;
        }

        [HttpGet]
        [Route("GetUsers")]
        public IEnumerable<RegisteredUsersInfoViewModel> GetPersonalData()
        {
            var users = this.accountService.GetRegisteredUsers();

            return users;
        }
        
        // POST: api/Accounts
        [AllowAnonymous]
        [HttpPost]
        [Route("Register")]
        public async Task<string> RegisterPost([FromBody] RegisterInputViewModel model)
        {

            var result = await this.accountService.RegisterUser(model);

            if (result.Succeeded)
            {
                return "success";
            }

            return "Registration Failed!";
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> LoginPost([FromBody] LoginInputViewModel model)
        {
            if (string.IsNullOrWhiteSpace(model.Username) || string.IsNullOrWhiteSpace(model.Password))
            {
                //TODO logic ...
            }

            var user = await this.accountService.Authenticate(model.Username, model.Password);

            if (user == null)
            {
                return BadRequest(new { message = "Username or password is incorect" });
            }

            return Ok(user);
        }
    }
}
