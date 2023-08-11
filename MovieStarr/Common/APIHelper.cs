using System.Net.Http.Headers;
using System.Security.Cryptography.Xml;
using System;
using RestSharp;
using MovieStarr.Models;
using Newtonsoft.Json;
using MovieStarr.Models.Movies;
using Microsoft.Extensions.Options;
using static MovieStarr.Common.SettingsApp;

namespace MovieStarr.Common
{
    public class APIHelper : APIService
    {
        private readonly TMDBSecrets _secrets;
        private string token;

        public APIHelper(IOptions<TMDBSecrets> config)
        {
            _secrets = config.Value;
            token = _secrets.TMDBToken;
        }

        public MovieModel GetNowPlaying()
        {
            MovieModel res = new MovieModel();

            var options = new RestClientOptions("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1");
            var client = new RestClient(options);
            var request = new RestRequest("");
            request.AddHeader("accept", "application/json");
            request.AddHeader("Authorization", "Bearer " + token);
            var response = client.Get(request);

            res = JsonConvert.DeserializeObject<MovieModel>(response.Content);

            return res;
        }

        public List<Genre> GetAllGenre()
        {
            var options = new RestClientOptions("https://api.themoviedb.org/3/genre/movie/list");
            var client = new RestClient(options);
            var request = new RestRequest("");
            request.AddHeader("accept", "application/json");
            request.AddHeader("Authorization", "Bearer " + token);
            var response = client.Get(request);

            var result = JsonConvert.DeserializeObject<GenreModel>(response.Content);

            return result.genres;
        }

        public MovieModel GetUpcoming()
        {
            MovieModel res = new MovieModel();

            var options = new RestClientOptions("https://api.themoviedb.org/3/movie/upcoming");
            var client = new RestClient(options);
            var request = new RestRequest("");
            request.AddHeader("accept", "application/json");
            request.AddHeader("Authorization", "Bearer " + token);
            var response = client.Get(request);

            res = JsonConvert.DeserializeObject<MovieModel>(response.Content);
            return res;
        }

        public MovieModel GetPopular()
        {
            MovieModel res = new MovieModel();

            var options = new RestClientOptions("https://api.themoviedb.org/3/movie/popular");
            var client = new RestClient(options);
            var request = new RestRequest("");
            request.AddHeader("accept", "application/json");
            request.AddHeader("Authorization", "Bearer " + token);
            var response = client.Get(request);

            res = JsonConvert.DeserializeObject<MovieModel>(response.Content);
            return res;
        }

        public MovieModel GetTopRated()
        {
            MovieModel res = new MovieModel();

            var options = new RestClientOptions("https://api.themoviedb.org/3/movie/top_rated");
            var client = new RestClient(options);
            var request = new RestRequest("");
            request.AddHeader("accept", "application/json");
            request.AddHeader("Authorization", "Bearer " + token);
            var response = client.Get(request);

            res = JsonConvert.DeserializeObject<MovieModel>(response.Content);
            return res;
        }

        public MovieDetails GetMovieDetails(int id)
        {
            MovieDetails res = new MovieDetails();

            var options = new RestClientOptions("https://api.themoviedb.org/3/movie/" + id);
            var client = new RestClient(options);
            var request = new RestRequest("");
            request.AddHeader("accept", "application/json");
            request.AddHeader("Authorization", "Bearer " + token);
            var response = client.Get(request);

            res = JsonConvert.DeserializeObject<MovieDetails>(response.Content);
            return res;
        }
    }
}
