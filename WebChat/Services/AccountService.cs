using Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Models;
using Models.Jwt;
using Services.interfaces;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ViewModels;
using ViewModels.Accounts;

namespace Services
{
    public class AccountService : BaseService, IAccountService
    {
        private readonly UserManager<AppUser> userManager;
        private readonly JwtSettings jwtSettings;

        public AccountService(ChatAppDbContext db, UserManager<AppUser> userManager, IOptions<JwtSettings> jwtSettings)
            : base(db)
        {
            this.userManager = userManager;
            this.jwtSettings = jwtSettings.Value;
        }

        public async Task<IdentityResult> RegisterUser(RegisterInputViewModel model)
        {
            var user = new AppUser { UserName = model.Username, Email = model.Email, NormalizedEmail = model.Username };

            var result = await this.userManager.CreateAsync(user, model.Password);

            return result;
        }

        public async Task<AppUser> Authenticate(string username, string password)
        {
            var user = await this.db.Users.SingleOrDefaultAsync(x => x.UserName == username && x.PasswordHash == password);

            if (user == null)
            {
                return null;
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(this.jwtSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature
                )
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            return user;

        }
    }
}
