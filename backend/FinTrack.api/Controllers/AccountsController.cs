using Microsoft.AspNetCore.Mvc;
using FinTrack.Api.Services;
using FinTrack.Api.Models.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace FinTrack.Api.Controllers
{
    [ApiController]
    [Route("api/accounts")]
    [Authorize]
    public class AccountsController : ControllerBase
    {
        private readonly AccountService _service;

        public AccountsController(AccountService service)
        {
            _service = service;
        }

        //  Get all accounts for logged-in user
        [HttpGet]
        public async Task<IActionResult> GetAccounts()
        {
            int userId = GetUserId();
            var accounts = await _service.GetAccountsAsync(userId);
            return Ok(accounts);
        }

        //  Create a new account
        [HttpPost]
        public async Task<IActionResult> CreateAccount([FromBody] AccountDto dto)
        {
            int userId = GetUserId();
            var account = await _service.CreateAccountAsync(dto, userId);
            return Ok(account);
        }

        //  Update existing account
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAccount(int id, [FromBody] AccountDto dto)
        {
            int userId = GetUserId();
            var updated = await _service.UpdateAccountAsync(id, dto, userId);
            if (updated == null) return NotFound("Account not found");
            return Ok(updated);
        }

        // Delete account
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAccount(int id)
        {
            int userId = GetUserId();
            var success = await _service.DeleteAccountAsync(id, userId);
            return success ? Ok() : NotFound("Account not found");
        }

        //  Helper method to get user ID from JWT token
        private int GetUserId()
        {
            return int.Parse(User.FindFirst("id")?.Value ?? "0");
        }
    }
}
