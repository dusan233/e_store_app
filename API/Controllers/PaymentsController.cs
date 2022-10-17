using API.Data;
using API.DTOs;
using API.Entities;
using API.Entities.OrderAggregate;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe;

namespace API.Controllers
{
    public class PaymentsController : BaseApiController
    {
        private readonly PaymentService _paymentService;
        private readonly StoreContext _context;
        private readonly IConfiguration _config;
        // private readonly ILogger _logger;
        public PaymentsController(PaymentService paymentService, IConfiguration config, StoreContext context)
        {
            _paymentService = paymentService;
            _context = context;
            _config = config;
            // _logger = logger;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<CartDto>> CreateOrUpdatePaymentIntent()
        {
            var cart = await _context.Cart.GetCartWithItems(User.Identity.Name).FirstOrDefaultAsync();

            if (cart == null) return NotFound();

            var intent = await _paymentService.CreateOrUpdatePaymentIntent(cart);

            if (intent == null) return BadRequest(new ProblemDetails { Title = "Problem creating payment" });




            cart.PaymentIntentId = string.IsNullOrEmpty(cart.PaymentIntentId) ? intent.Id : cart.PaymentIntentId;
            cart.ClientSecret = string.IsNullOrEmpty(cart.ClientSecret) ? intent.ClientSecret : cart.ClientSecret;
            _context.Update(cart);


            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return BadRequest(new ProblemDetails { Title = "Problem updating cart with intent" });

            return cart.MapCartToDto();
        }

        [HttpPost("webhook")]
        public async Task<ActionResult> StripeWebhook()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();

            var stripeEvent = EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"], _config["StripeSettings:WhSecret"]);
            var charge = (Charge)stripeEvent.Data.Object;

            var order = await _context.Orders.FirstOrDefaultAsync(x => x.PaymentIntentId == charge.PaymentIntentId);
            if (charge.Status == "succeeded") order.OrderStatus = OrderStatus.PaymentReceived;

            await _context.SaveChangesAsync();

            return new EmptyResult();
        }
    }
}