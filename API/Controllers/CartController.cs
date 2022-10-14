using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class CartController : BaseApiController
    {
        private readonly StoreContext _context;

        public CartController(StoreContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet(Name = "GetCart")]
        public async Task<ActionResult<CartDto>> GetCart()
        {
            var cart = await GetUserCart(GetBuyerId());

            if (cart == null) return NotFound();

            return cart.MapCartToDto();
        }
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<CartDto>> AddItemToCart(int productId, int quantity)
        {
            var cart = await GetUserCart(GetBuyerId());
            if (cart == null) cart = CreateCart();

            var product = await _context.Products.FindAsync(productId);
            if (product == null) return NotFound();

            cart.AddItem(product, quantity);

            var result = await _context.SaveChangesAsync() > 0;
            if (result) return CreatedAtRoute("GetCart", cart.MapCartToDto());

            return BadRequest(new ProblemDetails { Title = "Problem adding item to basket" });

        }

        [Authorize]
        [HttpDelete]
        public async Task<ActionResult> RemoveCartItem(int productId, int quantity)
        {
            var cart = await GetUserCart(GetBuyerId());

            if (cart == null) return NotFound();

            cart.RemoveItem(productId, quantity);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Problem removing item from cart" });
        }

        private Cart CreateCart()
        {
            var buyerId = User.Identity?.Name;
            // if (string.IsNullOrEmpty(buyerId))
            // {
            //     buyerId = Guid.NewGuid().ToString();
            //     var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
            //     Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            // };


            var cart = new Cart { BuyerId = buyerId! };
            _context.Cart.Add(cart);

            return cart;
        }



        private string GetBuyerId()
        {
            return User.Identity?.Name;
        }
        private async Task<Cart?> GetUserCart(string buyerId)
        {
            if (string.IsNullOrEmpty(buyerId))
            {
                // Response.Cookies.Delete("buyerId");
                return null;
            }

            return await _context.Cart
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
        }
    }
}