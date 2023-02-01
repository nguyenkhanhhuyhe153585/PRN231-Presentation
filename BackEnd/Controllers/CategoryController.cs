using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Models.Mappers;
using Models.Models;

namespace BackEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private MyStoreDbContext context;
        private IMapper mapper;
        public CategoryController(IMapper mapper)
        {
            context = new MyStoreDbContext();
            this.mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetCategories()
        {
            List<CategoryDTO> categories = mapper.Map<List<CategoryDTO>>(context.Categories.ToList());
            return Ok(categories);
        }
    }
}
