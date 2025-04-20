using Microsoft.EntityFrameworkCore;
using FinTrack.Api.Models;

namespace FinTrack.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

        //use table
        public DbSet<User> Users { get; set; }
        //account table
        public DbSet<Account> Accounts { get; set; } 
        //Category table
        public DbSet<Category> Categories { get; set; }

    }
}
