using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Net;

namespace BackEnd.Controllers
{
    [ApiController]
    [Route("api/image")]
    public class ImageController : Controller
    {

        string imageDir = "";
        string imageFolder = "resource";
        string imageName = "Music_Icon.jpg";
        public ImageController()
        {
            imageDir = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "resource", imageName);
        }

        [HttpGet("base64")]
        public IActionResult GetImageBase64()
        {
            Byte[] b = System.IO.File.ReadAllBytes(imageDir);
            string image = Convert.ToBase64String(b);
            return Ok(image);
        }

        [HttpGet]
        public IActionResult Get()
        {
            Byte[] b = System.IO.File.ReadAllBytes(imageDir);
            return File(b, "image/jpg");
        }

        [HttpPost]
        public async Task<IActionResult> Post(IFormCollection form)
        {
            try
            {
                if(form.Files.Count == 0) {
                    return BadRequest("Empty Upload");
                }
                //IFormFile file = form.Files[0];
                foreach (var file in form.Files)
                {
                    string filePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, imageFolder, file.FileName);
                    Stream fileStream = new FileStream(filePath, FileMode.Create);
                    await file.CopyToAsync(fileStream);
                }
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
