using Core.Models;

namespace ServiceContract.User;

public interface IUserService
{
    Task<UserReturnModel> Register(UserModel model);
    Task VerifyUser(string token);
    Task<UserReturnModel> GetUserByEmail(string email);
    Task<UserDataModel> GetUserData(string id);
}