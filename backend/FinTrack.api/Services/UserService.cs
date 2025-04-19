using FinTrack.Api.Models;
using FinTrack.Api.Models.DTOs;
using FinTrack.Api.Data;
using Microsoft.EntityFrameworkCore;

namespace FinTrack.Api.Services
{
    public class UserService
    {
        private readonly AppDbContext _context;

        public UserService(AppDbContext context)
        {
            _context = context;
        }


    //register
        public async Task<User> RegisterUserAsync(RegisterUserDto dto)
        {
            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }


    // Validates user login credentials
        public async Task<User?> LoginUserAsync(LoginUserDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);

            if (user == null)
                return null;

            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash);

            return isPasswordValid ? user : null;
        }

    }
}
