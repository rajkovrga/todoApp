using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Exceptions
{
    public class UserExistException : Exception
    {
        public UserExistException(string message = "User exist")
        : base(message)
        {
        }

    }
}
