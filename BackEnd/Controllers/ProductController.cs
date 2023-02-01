using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Models.Mappers;
using Models.Models;

namespace BackEnd.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class ProductController : ControllerBase
    {
        private MyStoreDbContext context;
        private IMapper mapper;
        public ProductController(IMapper mapper)
        {
            context = new MyStoreDbContext();
            this.mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetProducts()
        {
            List<Product> productRaw = context.Products.OrderByDescending(e => e.ProductId).ToList();
            List<ProductDTO> products = mapper.Map<List<ProductDTO>>(productRaw);
            return Ok(products);
        }

        [HttpPost]
        public async Task<IActionResult> PostCreate([FromBody] ProductDTO product)
        {
            try
            {
                Product newProduct = mapper.Map<Product>(product);
                await context.Products.AddAsync(newProduct);
                context.SaveChanges();
                return Ok();
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
