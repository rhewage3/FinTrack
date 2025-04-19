using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinTrack.Api.Models
{
    public class Account
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }

        public User? User { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Type { get; set; } = string.Empty; // e.g., bank, cash, credit

        [Required]
        public decimal Balance { get; set; }

        [Required]
        public string Currency { get; set; } = "LKR";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
