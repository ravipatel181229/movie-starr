using MovieStarr.Models.Movies;
using MovieStarr.Models.TV;

namespace MovieStarr.Common
{
    public interface APIService
    {
        List<Genre> GetAllGenre();
        MovieModel GetNowPlaying(string region);
        MovieModel GetUpcoming(string region);
        MovieModel GetPopular(string region);
        MovieModel GetTopRated(string region);
        MovieDetails GetMovieDetails(int id);
        List<MovieVideos> GetMovieVideos(int id);
        MovieCreditModel GetMovieCredits(int id);
        MovieReviewModel GetMovieReviews(int id,int page);
        MovieModel SearchMovies(string search);
        MovieModel SimilarMovies(int id);
        List<Region> RegionList();


        //For TV-Series
        List<TVSeries> GetOnTheAirSeries();
        List<TVSeries> GetArrivingTodaySeries();
        List<TVSeries> GetPopularSeries();
        List<TVSeries> GetTopRatedSeries();
        List<Genre> GetAllSeriesGenre();
        TVDetails GetTVDetails(int id);
        List<TVSeries> SearchSeries(string search);
    }
}
