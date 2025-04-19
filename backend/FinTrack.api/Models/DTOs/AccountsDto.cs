namespace FinTrack.Api.Models.DTOs
{
    public class AccountDto
    {
        public string Name { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public decimal Balance { get; set; }
        public string Currency { get; set; } = "LKR";
    }
}
