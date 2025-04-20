using System.ComponentModel.DataAnnotations;

namespace FinTrack.Api.Models.DTOs
{
    public class TransactionDto
    {
        
        public required string Type { get; set; } // income | expense | transfer

        [Required]
        public decimal Amount { get; set; }


        public int? CategoryId { get; set; }

        public int? FromAccountId { get; set; }

        public int? ToAccountId { get; set; }

        public string? Note { get; set; }

        public string? Label { get; set; }

        [Required]
        public DateTime Date { get; set; }
    }
}
