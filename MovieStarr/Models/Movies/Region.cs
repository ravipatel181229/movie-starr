﻿namespace MovieStarr.Models.Movies
{
    // Root myDeserializedClass = JsonConvert.DeserializeObject<Root>(myJsonResponse);
    public class Region
    {
        public string iso_3166_1 { get; set; }
        public string english_name { get; set; }
        public string native_name { get; set; }
    }

    public class RegionModel
    {
        public List<Region> results { get; set; }
    }
}
