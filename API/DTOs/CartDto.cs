

namespace API.DTOs
{
    public class CartDto
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItemDto> Items { get; set; }
    }
}