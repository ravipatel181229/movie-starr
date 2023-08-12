using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieStarr.Common;
using MovieStarr.Models.Movies;

namespace MovieStarr.Controllers
{
    [ApiController]
    [Route("movies")]
    public class MoviesController : Controller
    {
        private APIService _apiService;

        public MoviesController(APIService apiService)
        {
            _apiService = apiService;
        }

        // GET: Now Playing
        [HttpGet]
        public IEnumerable<MoviesList> Index()
        {
            List<MoviesList> res = _apiService.GetNowPlaying().results;
            return res.ToArray();
        }

        // GET: Genre List
        [HttpGet]
        [Route("genre-list")]
        public IEnumerable<Genre> AllGenre()
        {
            List<Genre> res = _apiService.GetAllGenre();
            return res.ToArray();
        }

        [HttpGet]
        [Route("upcoming")]
        public IEnumerable<MoviesList> Upcoming()
        {
            List<MoviesList> res = _apiService.GetUpcoming().results;
            return res.ToArray();
        }

        [HttpGet]
        [Route("popular")]
        public IEnumerable<MoviesList> Popular()
        {
            List<MoviesList> res = _apiService.GetPopular().results;
            return res.ToArray();
        }

        [HttpGet]
        [Route("top-rated")]
        public IEnumerable<MoviesList> TopRated()
        {
            List<MoviesList> res = _apiService.GetTopRated().results;
            return res.ToArray();
        }

        [HttpGet]
        [Route("movie-details")]
        public MovieDetails MovieDetails()
        {
            int id = Convert.ToInt32(HttpContext.Request.Query["id"]);
            MovieDetails res = _apiService.GetMovieDetails(id);
            return res;
        }

        [HttpGet]
        [Route("movie-videos")]
        public IEnumerable<MovieVideos> MovieVideos()
        {
            int id = Convert.ToInt32(HttpContext.Request.Query["id"]);
            List<MovieVideos> res = _apiService.GetMovieVideos(id);
            return res;
        }

        [HttpGet]
        [Route("movie-credits")]
        public MovieCreditModel MovieCredits()
        {
            int id = Convert.ToInt32(HttpContext.Request.Query["id"]);
            MovieCreditModel res = _apiService.GetMovieCredits(id);
            return res;
        }
    }
}
