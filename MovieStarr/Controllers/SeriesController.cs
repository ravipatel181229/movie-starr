using Microsoft.AspNetCore.Mvc;
using MovieStarr.Common;
using MovieStarr.Models.Movies;
using MovieStarr.Models.TV;

namespace MovieStarr.Controllers
{
    [ApiController]
    [Route("tv-series")]
    public class SeriesController : Controller
    {
        private APIService _apiService;

        public SeriesController(APIService apiService)
        {
            _apiService = apiService;
        }

        // GET: Genre List
        [HttpGet]
        [Route("genre-list")]
        public IEnumerable<Genre> AllGenre()
        {
            List<Genre> res = _apiService.GetAllSeriesGenre();
            return res.ToArray();
        }

        [Route("on-the-air")]
        public IEnumerable<TVSeries> OnTheAir()
        {
            return _apiService.GetOnTheAirSeries();
        }

        [Route("arriving")]
        public IEnumerable<TVSeries> ArrivingToday()
        {
            return _apiService.GetArrivingTodaySeries();
        }

        [Route("popular")]
        public IEnumerable<TVSeries> Popular()
        {
            return _apiService.GetPopularSeries();
        }

        [Route("top-rated")]
        public IEnumerable<TVSeries> TopRated()
        {
            return _apiService.GetTopRatedSeries();
        }

        [HttpGet]
        [Route("tv-details")]
        public TVDetails MovieDetails()
        {
            int id = Convert.ToInt32(HttpContext.Request.Query["id"]);
            TVDetails res = _apiService.GetTVDetails(id);
            return res;
        }

        [Route("search")]
        public IEnumerable<TVSeries> Search()
        {
            string search = HttpContext.Request.Query["query"].ToString();
            return _apiService.SearchSeries(search);
        }
    }
}
