using Core.Models;

namespace ServiceContract.User;

public interface IUserService
{
    Task<UserReturnModel> Register(UserModel model);
    Task<TokenResultModel> CreateAuthToken(LoginModel model);
    string CreateToken(string email, string id);
    Task VerifyUser(string user);
    Task<UserReturnModel> GetUserByEmail(string email);
}