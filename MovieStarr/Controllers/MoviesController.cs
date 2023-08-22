using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MovieStarr.Common;
using MovieStarr.Models.Movies;
using static Humanizer.On;

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
            string region = HttpContext.Request.Query["region"].ToString();
            List<MoviesList> res = _apiService.GetNowPlaying(region).results;
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
            string region = HttpContext.Request.Query["region"].ToString();
            List<MoviesList> res = _apiService.GetUpcoming(region).results;
            return res.ToArray();
        }

        [HttpGet]
        [Route("popular")]
        public IEnumerable<MoviesList> Popular()
        {
            string region = HttpContext.Request.Query["region"].ToString();
            List<MoviesList> res = _apiService.GetPopular(region).results;
            return res.ToArray();
        }

        [HttpGet]
        [Route("top-rated")]
        public IEnumerable<MoviesList> TopRated()
        {
            string region = HttpContext.Request.Query["region"].ToString();
            List<MoviesList> res = _apiService.GetTopRated(region).results;
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

        [HttpGet]
        [Route("movie-reviews")]
        public MovieReviewModel MovieReviews()
        {
            int id = Convert.ToInt32(HttpContext.Request.Query["id"]);
            int page = Convert.ToInt32(HttpContext.Request.Query["page"]);
            MovieReviewModel res = _apiService.GetMovieReviews(id, page);
            return res;
        }

        [HttpGet]
        [Route("search")]
        public IEnumerable<MoviesList> Search()
        {
            string search = HttpContext.Request.Query["query"].ToString();
            List<MoviesList> res = _apiService.SearchMovies(search).results;
            return res;
        }

        [HttpGet]
        [Route("similar")]
        public IEnumerable<MoviesList> Similar()
        {
            int id = Convert.ToInt32(HttpContext.Request.Query["id"]);
            List<MoviesList> res = _apiService.SimilarMovies(id).results;
            return res;
        }

        [HttpGet]
        [Route("region-list")]
        public IEnumerable<Region> RegionList()
        {
            List<Region> res = _apiService.RegionList();
            return res;
        }
    }
}
