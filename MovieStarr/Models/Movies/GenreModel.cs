namespace MovieStarr.Models.Movies
{
    public class GenreModel
    {
        public List<Genre> genres { get; set; }
    }

    public class Genre
    {
        public int id { get; set; }
        public string name { get; set; }
    }
}
