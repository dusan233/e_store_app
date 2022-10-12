
using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    public class ProductsController : BaseApiController
    {
        private readonly StoreContext _context;

        public ProductsController(StoreContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts([FromQuery] ProductParams productParams)
        {
            var query = _context.Products.AsQueryable();
            query = productParams.OrderBy switch
            {
                "price" => query.OrderBy(p => p.Price),
                "priceDesc" => query.OrderByDescending(p => p.Price),
                _ => query.OrderBy(p => p.Name)
            };

            var brandList = new List<string>();
            var typeList = new List<string>();
            var typeList2 = new List<string>();

            if (!string.IsNullOrEmpty(productParams.Brands))
            {
                brandList.AddRange(productParams.Brands.ToLower().Split(",").ToList());
            }

            if (!string.IsNullOrEmpty(productParams.Types))
            {
                typeList.AddRange(productParams.Types.ToLower().Split(",").ToList());
            }

            if (!string.IsNullOrEmpty(productParams.Types2))
            {
                typeList2.AddRange(productParams.Types2.ToLower().Split(",").ToList());
            }

            query = query.Where(p => brandList.Count == 0 || brandList.Contains(p.Brand.ToLower()));
            query = query.Where(p => typeList.Count == 0 || typeList.Contains(p.Type.ToLower()));
            query = query.Where(p => typeList2.Count == 0 || typeList2.Contains(p.Type2.ToLower()));

            var products = await PagedList<Product>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);

            Response.AddPaginationHeader(products.MetaData);


            return products;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null) return NotFound();

            return product;
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var brands = await _context.Products.Select(p => p.Brand).Distinct().Where(b => !string.IsNullOrEmpty(b)).ToListAsync();
            var types = await _context.Products.Select(p => p.Type).Distinct().Where(b => !string.IsNullOrEmpty(b)).ToListAsync();
            var types2 = await _context.Products.Select(p => p.Type2).Distinct().Where(b => !string.IsNullOrEmpty(b)).ToListAsync();

            return Ok(new
            {
                brands,
                types,
                types2
            });
        }

    }
}