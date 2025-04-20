namespace FinTrack.Api.Models.DTOs
{
    public class TransactionDto
    {
        public string Type { get; set; } // income | expense | transfer
        public decimal Amount { get; set; }
        public int CategoryId { get; set; }
        public int? FromAccountId { get; set; }
        public int? ToAccountId { get; set; }
        public string? Note { get; set; }
        public string? Label { get; set; }
        public DateTime Date { get; set; }
    }
}
