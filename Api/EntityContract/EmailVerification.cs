using Microsoft.AspNetCore.Builder;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityContract
{
    public class EmailVerification
    {
        public int Id { get; set; }
        public double Exp { get; set; }
        public string Token { get; set; } = String.Empty;
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public string UserId { get; set; }
    }
}
