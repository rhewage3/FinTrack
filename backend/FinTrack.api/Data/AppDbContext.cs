using Microsoft.EntityFrameworkCore;
using FinTrack.Api.Models;

namespace FinTrack.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

        // Users table
        public DbSet<User> Users { get; set; }

        // Accounts table
        public DbSet<Account> Accounts { get; set; }

        // Categories table
        public DbSet<Category> Categories { get; set; }

        // Transactions table 
        public DbSet<Transaction> Transactions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    base.OnModelCreating(modelBuilder);

    modelBuilder.Entity<Transaction>()
        .HasOne(t => t.User)
        .WithMany()
        .HasForeignKey(t => t.UserId)
        .OnDelete(DeleteBehavior.Cascade);

    modelBuilder.Entity<Transaction>()
        .HasOne(t => t.Category)
        .WithMany()
        .HasForeignKey(t => t.CategoryId)
        .OnDelete(DeleteBehavior.SetNull);

    modelBuilder.Entity<Transaction>()
        .HasOne(t => t.FromAccount)
        .WithMany()
        .HasForeignKey(t => t.FromAccountId)
        .OnDelete(DeleteBehavior.SetNull);

    modelBuilder.Entity<Transaction>()
        .HasOne(t => t.ToAccount)
        .WithMany()
        .HasForeignKey(t => t.ToAccountId)
        .OnDelete(DeleteBehavior.SetNull);
}

    }
}
