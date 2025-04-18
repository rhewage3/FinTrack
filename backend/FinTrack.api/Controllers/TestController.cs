using Microsoft.AspNetCore.Mvc;

namespace FinTrack.Api.Controllers
{
    [ApiController]
    [Route("api/test")]
    public class TestController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("API is working 🎉");
        }
    }
}
