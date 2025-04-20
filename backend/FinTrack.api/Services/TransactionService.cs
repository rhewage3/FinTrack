using FinTrack.Api.Data;
using FinTrack.Api.Models;
using FinTrack.Api.Models.DTOs;
using Microsoft.EntityFrameworkCore;

namespace FinTrack.Api.Services
{
    public class TransactionService
    {
        private readonly AppDbContext _context;

        public TransactionService(AppDbContext context)
        {
            _context = context;
        }

        //  Save new transaction to database
        public async Task<Transaction> CreateTransactionAsync(TransactionDto dto, int userId)
        {
            var transaction = new Transaction
            {
                UserId = userId,
                Type = dto.Type,
                Amount = dto.Amount,
                CategoryId = dto.CategoryId,
                FromAccountId = dto.FromAccountId,
                ToAccountId = dto.ToAccountId,
                Note = dto.Note,
                Label = dto.Label,
                Date = DateTime.SpecifyKind(dto.Date, DateTimeKind.Utc),
                CreatedAt = DateTime.UtcNow,
            };

            _context.Transactions.Add(transaction);

            //  Optionally auto-update account balances
            if (dto.Type == "income" && dto.FromAccountId != null)
{
    var toAcc = await _context.Accounts.FindAsync(dto.FromAccountId);
    if (toAcc != null)
        toAcc.Balance += dto.Amount;
}

            else if (dto.Type == "expense" && dto.FromAccountId != null)
            {
                var fromAcc = await _context.Accounts.FindAsync(dto.FromAccountId);
                if (fromAcc != null)
                    fromAcc.Balance -= dto.Amount;
            }
            else if (dto.Type == "transfer" && dto.FromAccountId != null && dto.ToAccountId != null)
            {
                var fromAcc = await _context.Accounts.FindAsync(dto.FromAccountId);
                var toAcc = await _context.Accounts.FindAsync(dto.ToAccountId);
                if (fromAcc != null && toAcc != null)
                {
                    fromAcc.Balance -= dto.Amount;
                    toAcc.Balance += dto.Amount;
                }
            }

            await _context.SaveChangesAsync();
            return transaction;
        }

        // (Later) Get all transactions for a user
        public async Task<List<Transaction>> GetTransactionsAsync(int userId)
        {
            return await _context.Transactions
                .Include(t => t.Category)
                .Include(t => t.FromAccount)
                .Include(t => t.ToAccount)
                .Where(t => t.UserId == userId)
                .OrderByDescending(t => t.Date)
                .ToListAsync();
        }
    }
}
