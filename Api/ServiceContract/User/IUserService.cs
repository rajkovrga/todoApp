using Core.Models;

namespace ServiceContract.User;

public interface IUserService
{
    Task<UserReturnModel> Register(UserModel model);
    Task<TokenResultModel> CreateToken(LoginModel model);
}