﻿namespace MovieStarr.Models.Movies
{
    // Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse);
    public class AuthorDetails
    {
        public string name { get; set; }
        public string username { get; set; }
        public string avatar_path { get; set; }
        public double? rating { get; set; }
    }

    public class MovieReview
    {
        public string author { get; set; }
        public AuthorDetails author_details { get; set; }
        public string content { get; set; }
        public DateTime created_at { get; set; }
        public string id { get; set; }
        public DateTime updated_at { get; set; }
        public string url { get; set; }
    }

    public class MovieReviewModel
    {
        public int id { get; set; }
        public int page { get; set; }
        public List<MovieReview> results { get; set; }
        public int total_pages { get; set; }
        public int total_results { get; set; }
    }


}
