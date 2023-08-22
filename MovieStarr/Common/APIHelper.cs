using System.Net.Http.Headers;
using System.Security.Cryptography.Xml;
using System;
using RestSharp;
using MovieStarr.Models;
using Newtonsoft.Json;
using MovieStarr.Models.Movies;
using Microsoft.Extensions.Options;
using MovieStarr.Models.TV;

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

        public MovieModel GetNowPlaying(string region)
        {
            MovieModel res = new MovieModel();

            var options = new RestClientOptions("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&region="+region);
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

        public MovieModel GetUpcoming(string region)
        {
            MovieModel res = new MovieModel();

            var options = new RestClientOptions("https://api.themoviedb.org/3/movie/upcoming?region=" + region);
            var client = new RestClient(options);
            var request = new RestRequest("");
            request.AddHeader("accept", "application/json");
            request.AddHeader("Authorization", "Bearer " + token);
            var response = client.Get(request);

            res = JsonConvert.DeserializeObject<MovieModel>(response.Content);
            return res;
        }

        public MovieModel GetPopular(string region)
        {
            MovieModel res = new MovieModel();

            var options = new RestClientOptions("https://api.themoviedb.org/3/movie/popular?region=" + region);
            var client = new RestClient(options);
            var request = new RestRequest("");
            request.AddHeader("accept", "application/json");
            request.AddHeader("Authorization", "Bearer " + token);
            var response = client.Get(request);

            res = JsonConvert.DeserializeObject<MovieModel>(response.Content);
            return res;
        }

        public MovieModel GetTopRated(string region)
        {
            MovieModel res = new MovieModel();

            var options = new RestClientOptions("https://api.themoviedb.org/3/movie/top_rated?region=" + region);
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

        public List<MovieVideos> GetMovieVideos(int id)
        {
            var options = new RestClientOptions("https://api.themoviedb.org/3/movie/" + id + "/videos");
            var client = new RestClient(options);
            var request = new RestRequest("");
            request.AddHeader("accept", "application/json");
            request.AddHeader("Authorization", "Bearer " + token);
            var response = client.Get(request);

            var res = JsonConvert.DeserializeObject<MovieVideoModel>(response.Content);
            return res.results;
        }

        public MovieCreditModel GetMovieCredits(int id)
        {
            var options = new RestClientOptions("https://api.themoviedb.org/3/movie/" + id + "/credits");
            var client = new RestClient(options);
            var request = new RestRequest("");
            request.AddHeader("accept", "application/json");
            request.AddHeader("Authorization", "Bearer " + token);
            var response = client.Get(request);

            var res = JsonConvert.DeserializeObject<MovieCreditModel>(response.Content);
            return res;
        }

        public MovieReviewModel GetMovieReviews(int id, int page)
        {
            var options = new RestClientOptions("https://api.themoviedb.org/3/movie/" + id + "/reviews?page=" + page);
            var client = new RestClient(options);
            var request = new RestRequest("");
            request.AddHeader("accept", "application/json");
            request.AddHeader("Authorization", "Bearer " + token);
            var response = client.Get(request);

            var res = JsonConvert.DeserializeObject<MovieReviewModel>(response.Content);
            return res;
        }

        public MovieModel SearchMovies(string search)
        {
            var options = new RestClientOptions("https://api.themoviedb.org/3/search/movie?query=" + search);
            var client = new RestClient(options);
            var request = new RestRequest("");
            request.AddHeader("accept", "application/json");
            request.AddHeader("Authorization", "Bearer " + token);
            var response = client.Get(request);

            var res = JsonConvert.DeserializeObject<MovieModel>(response.Content);
            return res;
        }

        public MovieModel SimilarMovies(int id)
        {
            var options = new RestClientOptions($"https://api.themoviedb.org/3/movie/{id}/similar?page=1");
            var client = new RestClient(options);
            var request = new RestRequest("");
            request.AddHeader("accept", "application/json");
            request.AddHeader("Authorization", "Bearer " + token);
            var response = client.Get(request);

            var res = JsonConvert.DeserializeObject<MovieModel>(response.Content);
            return res;
        }

        public List<Region> RegionList()
        {
            var options = new RestClientOptions($"https://api.themoviedb.org/3/watch/providers/regions");
            var client = new RestClient(options);
            var request = new RestRequest("");
            request.AddHeader("accept", "application/json");
            request.AddHeader("Authorization", "Bearer " + token);
            var response = client.Get(request);

            var res = JsonConvert.DeserializeObject<RegionModel>(response.Content);
            return res.results;
        }




        ////////// TV
        ///
        public List<Genre> GetAllSeriesGenre()
        {
            var options = new RestClientOptions("https://api.themoviedb.org/3/genre/tv/list");
            var client = new RestClient(options);
            var request = new RestRequest("");
            request.AddHeader("accept", "application/json");
            request.AddHeader("Authorization", "Bearer " + token);
            var response = client.Get(request);

            var result = JsonConvert.DeserializeObject<GenreModel>(response.Content);

            return result.genres;
        }
        public List<TVSeries> GetOnTheAirSeries()
        {
            var options = new RestClientOptions("https://api.themoviedb.org/3/tv/on_the_air");
            var client = new RestClient(options);
            var request = new RestRequest("");
            request.AddHeader("accept", "application/json");
            request.AddHeader("Authorization", "Bearer " + token);
            var response = client.Get(request);

            var res = JsonConvert.DeserializeObject<TVSeriesModel>(response.Content);
            return res.results;
        }
        public List<TVSeries> GetArrivingTodaySeries()
        {
            var options = new RestClientOptions("https://api.themoviedb.org/3/tv/airing_today");
            var client = new RestClient(options);
            var request = new RestRequest("");
            request.AddHeader("accept", "application/json");
            request.AddHeader("Authorization", "Bearer " + token);
            var response = client.Get(request);

            var res = JsonConvert.DeserializeObject<TVSeriesModel>(response.Content);
            return res.results;
        }
        public List<TVSeries> GetPopularSeries()
        {
            var options = new RestClientOptions("https://api.themoviedb.org/3/tv/popular");
            var client = new RestClient(options);
            var request = new RestRequest("");
            request.AddHeader("accept", "application/json");
            request.AddHeader("Authorization", "Bearer " + token);
            var response = client.Get(request);

            var res = JsonConvert.DeserializeObject<TVSeriesModel>(response.Content);
            return res.results;
        }
        public List<TVSeries> GetTopRatedSeries()
        {
            var options = new RestClientOptions("https://api.themoviedb.org/3/tv/top_rated");
            var client = new RestClient(options);
            var request = new RestRequest("");
            request.AddHeader("accept", "application/json");
            request.AddHeader("Authorization", "Bearer " + token);
            var response = client.Get(request);

            var res = JsonConvert.DeserializeObject<TVSeriesModel>(response.Content);
            return res.results;
        }

        public TVDetails GetTVDetails(int id)
        {
            TVDetails res = new TVDetails();

            var options = new RestClientOptions("https://api.themoviedb.org/3/tv/" + id);
            var client = new RestClient(options);
            var request = new RestRequest("");
            request.AddHeader("accept", "application/json");
            request.AddHeader("Authorization", "Bearer " + token);
            var response = client.Get(request);

            try
            {
                res = JsonConvert.DeserializeObject<TVDetails>(response.Content);
            }
            catch (Exception ex)
            {
                string s = ex.Message;
            }
            return res;
        }
        public List<TVSeries> SearchSeries(string search)
        {
            var options = new RestClientOptions("https://api.themoviedb.org/3/search/tv?query=" + search);
            var client = new RestClient(options);
            var request = new RestRequest("");
            request.AddHeader("accept", "application/json");
            request.AddHeader("Authorization", "Bearer " + token);
            var response = client.Get(request);

            var res = JsonConvert.DeserializeObject<TVSeriesModel>(response.Content);
            return res.results;
        }
    }
}
