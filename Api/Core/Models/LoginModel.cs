using System.ComponentModel.DataAnnotations;

namespace Core.Models;

public class LoginModel
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    
    [Required]
    [MinLength(7)]
    public string Password { get; set; }
}