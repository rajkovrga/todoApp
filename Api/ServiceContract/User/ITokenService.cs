using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceContract.User
{
    public interface ITokenService
    {
        Task<TokenResultModel> CreateAuthToken(LoginModel model);
        Task<string> CreateVerifyToken(string email, string userId);
        Task<string> RefreshToken(string refreshToken);
    }
}
