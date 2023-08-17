using MovieStarr.Models.Movies;
using MovieStarr.Models.TV;

namespace MovieStarr.Common
{
    public interface APIService
    {
        List<Genre> GetAllGenre();
        MovieModel GetNowPlaying();
        MovieModel GetUpcoming();
        MovieModel GetPopular();
        MovieModel GetTopRated();
        MovieDetails GetMovieDetails(int id);
        List<MovieVideos> GetMovieVideos(int id);
        MovieCreditModel GetMovieCredits(int id);
        MovieReviewModel GetMovieReviews(int id,int page);
        MovieModel SearchMovies(string search);


        //For TV-Series
        List<TVSeries> GetOnTheAirSeries();
        List<TVSeries> GetArrivingTodaySeries();
        List<TVSeries> GetPopularSeries();
        List<TVSeries> GetTopRatedSeries();
        List<Genre> GetAllSeriesGenre();
        TVDetails GetTVDetails(int id);
    }
}
