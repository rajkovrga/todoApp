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
using Microsoft.EntityFrameworkCore;
using EntityContract;
using System.Data.Entity;

namespace Service.User;

public class UserService : IUserService
{
    private readonly UserManager<AppUser> _userManager;
    private readonly DataContext _dataContext;
    public UserService(UserManager<AppUser> userManager, DataContext dataContext)
    {
        _userManager = userManager;
        _dataContext = dataContext;
    }

    public async Task<UserReturnModel> Register(UserModel model)
    {
        if (model is null)
        {
            throw new NullReferenceException();
        }

        if(_dataContext.Users.Any(x => x.Email == model.Email))
        {
            throw new UserExistException();
        }

        var appUser = new AppUser()
        {
            Email = model!.Email,
            FirstName = model.FirstName!,
            LastName = model.LastName!,
            UserName = model.Email,
            EmailConfirmed = false
        };

        var result = await _userManager.CreateAsync(appUser, model?.Password);
        if (!result.Succeeded)
        {
            throw new IdentityException("User is not registered");
        }

        var newUser = _dataContext.Users.First(x => x.Email == model!.Email);
        
        await _userManager.AddToRoleAsync(newUser, "user");

        return new UserReturnModel()
        {
            FirstName = newUser.FirstName,
            LastName = newUser.LastName,
            Email = newUser.Email,
            Id = newUser.Id
        };
    }

    public async Task VerifyUser(string token)
    {
        var tokenRow = _dataContext.EmailVerifications.FirstOrDefault(x => x.Token.Equals(token));

        if(tokenRow is null)
        {
            throw new ModelNotFoundException("Token not found");
        }

        if ((DateTime.UtcNow.Ticks / 1000) > tokenRow.Exp)
        {
            throw new ExpireTokenException();
        }

        var user = await _dataContext.Users.FirstOrDefaultAsync(x => x.Id == tokenRow!.UserId);

        if (user is null)
            throw new ModelNotFoundException("User not found");

        if (user.EmailConfirmed)
            throw new ModelNotFoundException("User just verified");

        user.EmailConfirmed = true;

        _dataContext.Remove(tokenRow);

        await _dataContext.SaveChangesAsync();
    }

    public async Task<UserReturnModel> GetUserByEmail(string email)
    {
        var user = await _dataContext.Users.FirstOrDefaultAsync(x => x.Email == email);

        if (user is null)
            throw new ModelNotFoundException("User not found");

        if (user.EmailConfirmed)
            throw new ModelNotFoundException("User just verified");

        return new UserReturnModel
        {
            Id = user.Id,
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName
        };
    }

    public async Task<UserDataModel> GetUserData(string id)
    {
        var user = _dataContext.Users.FirstOrDefault(x => x.Id == id);

        if(user == null)
        {
            throw new ModelNotFoundException("User not found");
        }

        var data = new UserDataModel
        {
            FirstName = user.FirstName,
            LastName = user.LastName,
        };
        var roles = await _userManager.GetRolesAsync(user);

        var permissions = _dataContext.RoleClaims.Where(x => roles.Any(s => s == x.ClaimType)).Select(x => x.ClaimValue).ToList();
        if(permissions is not null)
        {
            data.Permissions = permissions.Select(x => x).ToList();
        }

        return data;
    }
}