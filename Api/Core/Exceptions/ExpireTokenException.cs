using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Exceptions
{
    public class ExpireTokenException : Exception
    {
        public ExpireTokenException(string message = "Token expired") : base(message)
        {

        }
    }
}
