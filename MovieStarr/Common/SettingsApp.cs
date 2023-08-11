using MovieStarr.Models.Movies;

namespace MovieStarr.Common
{
    public class SettingsApp
    {
        public interface APIService
        {
            List<Genre> GetAllGenre();
            MovieModel GetNowPlaying();
            MovieModel GetUpcoming();
            MovieModel GetPopular();
            MovieModel GetTopRated();
            MovieDetails GetMovieDetails(int id);
        }
    }
}
