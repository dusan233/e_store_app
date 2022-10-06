using System.ComponentModel.DataAnnotations.Schema;
namespace API.Entities
{
    [Table("Carts")]
    public class Cart
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }

        public string PaymentIntentId { get; set; }
        public string ClientSecret { get; set; }
        public List<BasketItem> Items { get; set; } = new List<BasketItem>();

        public void AddItem(Product product, int quantity)
        {
            if (Items.All(item => item.ProductId != product.Id))
            {
                Items.Add(new BasketItem { Product = product, Quantity = quantity });
            }

            var existingItem = Items.FirstOrDefault(item => item.ProductId == product.Id);

            if (existingItem != null)
            {
                existingItem.Quantity += quantity;
            }
        }

        public void RemoveItem(int productid, int quantity)
        {
            var item = Items.FirstOrDefault(item => item.ProductId == productid);

            if (item == null) return;

            item.Quantity -= quantity;
            if (item.Quantity == 0) Items.Remove(item);
        }
    }
}