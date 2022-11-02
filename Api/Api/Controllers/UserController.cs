using Core.Models;
using Microsoft.AspNetCore.Mvc;
using ServiceContract.User;
using System.IdentityModel.Tokens.Jwt;

namespace Api.Controllers;

public class UserController : Controller
{
    private readonly IUserService _userService;
    private readonly IEmailService _emailService;
    public UserController(IUserService userService, IEmailService emailService)
    {
        _userService = userService;
        _emailService = emailService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateToken([FromBody] LoginModel model)
    {
        if (!ModelState.IsValid) return BadRequest("Model is not good");
        var token = await _userService.CreateAuthToken(model);
        return Ok(token);
    }

    [HttpPut("/api/user/verify")]
    public async Task<IActionResult> VerifyEmail([FromBody] string token)
    {
        if (token is null)
            return StatusCode(StatusCodes.Status405MethodNotAllowed, "Token is null");

        var jwt = new JwtSecurityTokenHandler().ReadJwtToken(token);

        var exp = jwt.Claims.First(c => c.Type == "exp").Value;
        var ticks = long.Parse(exp);

        if ((DateTime.UtcNow.Ticks / 1000) > ticks)
            return StatusCode(StatusCodes.Status403Forbidden, "Token is expiried");

        string email = jwt.Claims.First(c => c.Type == "email").Value;

        await _userService.VerifyUser(email);

        return NoContent();
    }
    
    [HttpPost]
    public async Task<IActionResult> Register([FromBody] UserModel model)
    {
        if (!ModelState.IsValid) return BadRequest("Model is not good");
        var user = await _userService.Register(model);
        if (user is null)
            return BadRequest("User is not saved");

        var token = _userService.CreateToken(user.Email!, user.Id!);

        await _emailService.Send(new List<string> { user.Email! }, "Subject", 
            $"Register succefully{Environment.NewLine}" +
            $"<a href=" + $"'{Request.Headers.Origin}" + "/user/verify/" + token + "'" + ">Verify account</a>", isHtml: true);

        return StatusCode(StatusCodes.Status201Created);
    }

    [HttpPost("/api/resend/verify")]
    public async Task<IActionResult> ResendVerifyEmail([FromBody] string email)
    {
        var user = await _userService.GetUserByEmail(email);

        if (user is null)
            return NotFound("User not found");

        var token = _userService.CreateToken(user.Email!, user.Id!);

        await _emailService.Send(new List<string> { user.Email! }, "Subject",
            $"Resend verification{Environment.NewLine}" +
            $"<a href=" + $"'{Request.Headers.Origin}" + "/user/verify/" + token + "'" + ">Verify account</a>", isHtml: true);

        return Ok();
    }


}