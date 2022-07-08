using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Core.Exceptions;
using Core.Models;
using EntityContext;
using AppContext;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ServiceContract.User;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace Service.User;

public class UserService : IUserService
{
    private readonly UserManager<AppUser> _userManager;
    private readonly DataContext _dataContext;
    private readonly IConfiguration _configuration;

    public UserService(UserManager<AppUser> userManager, DataContext dataContext, IConfiguration configuration)
    {
        _userManager = userManager;
        _dataContext = dataContext;
        _configuration = configuration;
    }

    public async Task<UserReturnModel> Register(UserModel model)
    {
        if (model == null)
        {
            throw new NullReferenceException();
        }

        var appUser = new AppUser()
        {
            Email = model.Email,
            FirstName = model.FirstName,
            LastName = model.LastName,
            UserName = model.Email
        };

        var r = _userManager;
        var result = await _userManager.CreateAsync(appUser, model.Password);
        if (!result.Succeeded)
        {
            throw new Exception();
            throw new IdentityException("User is not registered");
        }

        var newUser = _dataContext.Users.First(x => x.Email == model.Email);

        return new UserReturnModel()
        {
            FirstName = newUser.FirstName,
            LastName = newUser.LastName,
            Email = newUser.Email
        };
    }

    public async Task<TokenResultModel> CreateToken(LoginModel model)
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

        var claims = new Claim[]
        {
            new(JwtRegisteredClaimNames.Sub, user?.Id),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new(JwtRegisteredClaimNames.Email, user.Email)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

        var token = new JwtSecurityToken(
            _configuration["Jwt:Issuer"],
            _configuration["Jwt:Audience"],
            claims,
            signingCredentials: creds,
            expires: DateTime.Now.AddHours(1)
        );

        return new TokenResultModel()
        {
            Token = new JwtSecurityTokenHandler().WriteToken(token)
        };

    }
}