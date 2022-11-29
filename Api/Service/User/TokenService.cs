using AppContext;
using Core.Exceptions;
using Core.Models;
using EntityContext;
using EntityContract;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ServiceContract.User;
using System.IdentityModel.Tokens.Jwt;
using System.Security;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Service.User
{
    public class TokenService : ITokenService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly DataContext _dataContext;
        private readonly IConfiguration _configuration;

        public TokenService(UserManager<AppUser> userManager, DataContext dataContext, IConfiguration configuration)
        {
            _userManager = userManager;
            _dataContext = dataContext;
            _configuration = configuration;
        }

        public async Task<string> CreateVerifyToken(string email, string id)
        {
            var token = Blake3.Hasher.Hash(Encoding.UTF8.GetBytes(email + id + DateTime.Now.Ticks + Path.GetRandomFileName())).ToString();

            token = token.Substring(0, 32);

            var row = new EmailVerification()
            {
                Token = token,
                UserId = id,
                Exp = DateTimeOffset.UtcNow.AddMinutes(45).Ticks
            };
            var verifications = _dataContext.EmailVerifications.Where(x => x.UserId == id).ToList();

            if(verifications is not null && verifications.Any())
            {
                _dataContext.RemoveRange(verifications);
            }

            _dataContext.EmailVerifications.Add(row);
            await _dataContext.SaveChangesAsync();

            return token;
        }

        public async Task<TokenResultModel> CreateAuthToken(LoginModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user is null)
            {
                throw new ModelNotFoundException("User not exists");
            }

            if (!(await _userManager.CheckPasswordAsync(user!, model.Password)))
            {
                throw new NullReferenceException("Password is not correct");
            }

            if(!user.EmailConfirmed)
            {
                throw new IdentityException("User is not verificated");
            }

            var roles = await _userManager.GetRolesAsync(user);

            var refreshToken = CreateRefreshToken();
            var token = CreateJwtToken(user, roles.ToList());

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(Convert.ToDouble(_configuration["Jwt:RefreshTokenDays"]));

            await _dataContext.SaveChangesAsync();

            return new TokenResultModel()
            {
                Token = token,
                RefreshToken = refreshToken
            };

        }
        public async Task<string> RefreshToken(string refreshToken)
        {
            var user = await _dataContext.Users.FirstOrDefaultAsync(x => x.RefreshToken != null && x.RefreshToken.Equals(refreshToken));

            if (user is null)
            {
                throw new ModelNotFoundException("Token is not good");
            }

            if (user.RefreshTokenExpiryTime < DateTime.UtcNow)
            {
                throw new ExpireTokenException("Token is expired");
            }

            var roles = await _userManager.GetRolesAsync(user);

            var token = CreateJwtToken(user, roles.ToList());

            return token;
        }
        private string CreateJwtToken(AppUser user, List<string> roles)
        {
            var claims = new List<Claim>()
            {
                new Claim(JwtRegisteredClaimNames.Sub, user!.Id),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email)
            };

            foreach (var item in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, item));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims.ToArray(),
                signingCredentials: creds,
                expires: DateTime.UtcNow.AddHours(1)
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        private string CreateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }

    }
}
