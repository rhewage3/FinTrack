using FinTrack.Api.Data;
using FinTrack.Api.Models;
using FinTrack.Api.Models.DTOs;
using Microsoft.EntityFrameworkCore;

namespace FinTrack.Api.Services
{
    public class AccountService
    {
        private readonly AppDbContext _context;

        public AccountService(AppDbContext context)
        {
            _context = context;
        }

        //  Get all accounts for a user
        public async Task<List<Account>> GetAccountsAsync(int userId)
        {
            return await _context.Accounts
                .Where(a => a.UserId == userId)
                .OrderByDescending(a => a.CreatedAt)
                .ToListAsync();
        }

        //  Create a new account
        public async Task<Account> CreateAccountAsync(AccountDto dto, int userId)
        {
            var account = new Account
            {
                Name = dto.Name,
                Type = dto.Type,
                Balance = dto.Balance,
                Currency = dto.Currency,
                UserId = userId
            };

            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();
            return account;
        }

        //  Edit existing account
        public async Task<Account?> UpdateAccountAsync(int accountId, AccountDto dto, int userId)
        {
            var acc = await _context.Accounts.FirstOrDefaultAsync(a => a.Id == accountId && a.UserId == userId);
            if (acc == null) return null;

            acc.Name = dto.Name;
            acc.Type = dto.Type;
            acc.Balance = dto.Balance;
            acc.Currency = dto.Currency;

            await _context.SaveChangesAsync();
            return acc;
        }

        //  Delete account
        public async Task<bool> DeleteAccountAsync(int accountId, int userId)
        {
            var acc = await _context.Accounts.FirstOrDefaultAsync(a => a.Id == accountId && a.UserId == userId);
            if (acc == null) return false;

            _context.Accounts.Remove(acc);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
