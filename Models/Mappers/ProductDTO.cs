using Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Mappers
{
    public class ProductDTO
    {
        public int ProductId { get; set; }

        public string ProductName { get; set; } = null!;

        public int CategoryId { get; set; }

        public int UnitsInStock { get; set; }

        public decimal UnitPrice { get; set; }
    }
}
