﻿namespace MovieStarr.Models.Movies
{
    public class MovieModel
    {
        public Dates dates { get; set; }
        public int page { get; set; }
        public List<MoviesList> results { get; set; }
        public int total_pages { get; set; }
        public int total_results { get; set; }
    }
    // Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse);
    public class Dates
    {
        public string maximum { get; set; }
        public string minimum { get; set; }
    }

    public class MoviesList
    {
        public bool adult { get; set; }
        public string backdrop_path { get; set; }
        public List<int> genre_ids { get; set; }
        public int id { get; set; }
        public string original_language { get; set; }
        public string original_title { get; set; }
        public string overview { get; set; }
        public double popularity { get; set; }
        public string poster_path { get; set; }
        public string release_date { get; set; }
        public string title { get; set; }
        public bool video { get; set; }
        public double vote_average { get; set; }
        public int vote_count { get; set; }
    }


}
