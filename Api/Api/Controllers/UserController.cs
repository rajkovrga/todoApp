using Core.Models;
using Microsoft.AspNetCore.Mvc;
using ServiceContract.User;
using System.IdentityModel.Tokens.Jwt;

namespace Api.Controllers;

public class UserController : Controller
{
    private readonly IUserService _userService;
    private readonly ITokenService _tokenService;
    private readonly IEmailService _emailService;
    public UserController(IUserService userService, IEmailService emailService, ITokenService tokenService)
    {
        _userService = userService;
        _emailService = emailService;
        _tokenService = tokenService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateToken([FromBody] LoginModel model)
    {
        if (!ModelState.IsValid) return BadRequest("Model is not good");
        var token = await _tokenService.CreateAuthToken(model);
        return Ok(token);
    }

    [HttpPut("user/verify/{token}")]
    public async Task<IActionResult> VerifyEmail(string token)
    {
        if (token is null)
            return StatusCode(StatusCodes.Status405MethodNotAllowed, "Token is null");

        await _userService.VerifyUser(token);

        return NoContent();
    }
    
    [HttpPost]
    public async Task<IActionResult> Register([FromBody] UserModel model)
    {
        if (!ModelState.IsValid) return BadRequest("Model is not good");
        var user = await _userService.Register(model);
        if (user is null)
            return BadRequest("User is not saved");

        var token = await _tokenService.CreateVerifyToken(user.Email!, user.Id!);

        await _emailService.Send(new List<string> { user.Email! }, "Subject", 
            $"Register succefully{Environment.NewLine}" +
            $"<a href=" + $"'{Request.Headers.Origin}" + "/user/verify/" + token + "'" + ">Verify account</a>", isHtml: true);

        return StatusCode(StatusCodes.Status201Created);
    }

    [HttpPost("resend/verify")]
    public async Task<IActionResult> ResendVerifyEmail([FromBody] string email)
    {
        var user = await _userService.GetUserByEmail(email);

        if (user is null)
            return NotFound("User not found");

        var token = await _tokenService.CreateVerifyToken(user.Email!, user.Id!);

        await _emailService.Send(new List<string> { user.Email! }, "Subject",
            $"Resend verification{Environment.NewLine}" +
            $"<a href=" + $"'{Request.Headers.Origin}" + "/user/verify/" + token + "'" + ">Verify account</a>", isHtml: true);

        return Ok();
    }

    [HttpPost("user/refresh")]
    public async Task<IActionResult> RefreshToken([FromBody] TokenResultModel model)
    {
        var token = await _tokenService.RefreshToken(model.RefreshToken);

        return Ok(new TokenResultModel
        {
            Token = token,
            RefreshToken = model.RefreshToken
        });
    }

}