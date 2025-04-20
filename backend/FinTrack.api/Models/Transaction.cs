using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinTrack.Api.Models
{
    public class Transaction
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }

        [Required]
        public string Type { get; set; }  // income | expense | transfer

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }

        [Required]
        public int CategoryId { get; set; }

        [ForeignKey("CategoryId")]
        public Category Category { get; set; }

        public int? FromAccountId { get; set; }

        [ForeignKey("FromAccountId")]
        public Account? FromAccount { get; set; }

        public int? ToAccountId { get; set; }

        [ForeignKey("ToAccountId")]
        public Account? ToAccount { get; set; }

        public string? Note { get; set; }
        public string? Label { get; set; }

        [Required]
        public DateTime Date { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
