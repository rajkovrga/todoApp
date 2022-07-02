using Core.Models;
using Microsoft.AspNetCore.Mvc;
using ServiceContract.User;

namespace Api.Controllers;

public class UserController : Controller
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateToken([FromBody] LoginModel model)
    {
        if (!ModelState.IsValid) return BadRequest("Model is not good");
        var token = await _userService.CreateToken(model);
        return Ok(token);
    }
    
    [HttpPost]
    public async Task<IActionResult> Register([FromBody] UserModel model)
    {
        if (!ModelState.IsValid) return BadRequest("Model is not good");
        var user = await _userService.Register(model);

        return Ok(user);
    }
}