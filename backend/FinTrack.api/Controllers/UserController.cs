using Microsoft.AspNetCore.Mvc;
using FinTrack.Api.Models.DTOs;
using FinTrack.Api.Services;

namespace FinTrack.Api.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly UserService _userService;

        public UsersController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserDto dto)
        {
            var user = await _userService.RegisterUserAsync(dto);
            return Ok(new { user.Id, user.Name, user.Email });
        }
    }
}
