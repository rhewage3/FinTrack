using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using FinTrack.Api.Services;
using FinTrack.Api.Models.DTOs;

namespace FinTrack.Api.Controllers
{
    [ApiController]
    [Route("api/transactions")]
    [Authorize]
    public class TransactionsController : ControllerBase
    {
        private readonly TransactionService _service;

        public TransactionsController(TransactionService service)
        {
            _service = service;
        }

        // POST: api/transactions
        [HttpPost]
        public async Task<IActionResult> CreateTransaction(TransactionDto dto)
        {
            int userId = GetUserId();
            var transaction = await _service.CreateTransactionAsync(dto, userId);
            return Ok(transaction);
        }


        // GET: api/transactions
        [HttpGet]
        public async Task<IActionResult> GetTransactions()
        {
            int userId = GetUserId();
            var transactions = await _service.GetTransactionsAsync(userId);

            var result = transactions.Select(tx => new
            {
                id = tx.Id,
                amount = tx.Amount,
                type = tx.Type,
                category = tx.Category?.Name,
                fromAccount = tx.FromAccount?.Name,
                toAccount = tx.ToAccount?.Name,
                date = tx.Date.ToString("yyyy-MM-dd"),
                label = tx.Label,
                note = tx.Note
            });

            return Ok(result);
        }


        //  Helper method to extract user ID from JWT
        private int GetUserId()
        {
            return int.Parse(User.FindFirst("id")?.Value ?? "0");
        }

        
    }
}
