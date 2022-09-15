using Microsoft.AspNetCore.Identity;

namespace EntityContext;

public class AppUser : IdentityUser
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
}