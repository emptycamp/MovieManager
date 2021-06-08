using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieManager.Models;

namespace MovieManager.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MoviesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MoviesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var movies = await _context.Movies.Include(m => m.Genres).ToListAsync();
            return Ok(movies);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
                return NotFound();

            var movie = await _context.Movies.FirstOrDefaultAsync(m => m.Id == id);
            if (movie == null)
                return NotFound();

            return Ok(movie);
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create(Movie movie)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var ctx = _context.Add(movie);
            await _context.SaveChangesAsync();
            return Ok(ctx.Entity);

        }

        [HttpPost("edit")]
        public async Task<IActionResult> Edit(Movie movie)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var fetchedMovie = await _context.Movies.Where(m => m.Id == movie.Id).Include(m => m.Genres).SingleOrDefaultAsync();
            if (fetchedMovie == null)
                return NotFound();

            fetchedMovie.Genres = movie.Genres;
            fetchedMovie.Name = movie.Name;
            fetchedMovie.ReleaseDate = movie.ReleaseDate;
            await _context.SaveChangesAsync();

            return Ok(movie);

        }

        [HttpPost("{id}/delete")]
        public async Task<IActionResult> Delete(int id)
        {
            var movie = await _context.Movies.FindAsync(id);
            if (movie == null)
                return NotFound();

            _context.Movies.Remove(movie);
            await _context.SaveChangesAsync();
            return Ok(id);
        }
    }
}
