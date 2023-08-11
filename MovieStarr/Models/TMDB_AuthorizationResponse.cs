using System.Runtime.Serialization;

namespace MovieStarr.Models
{
    [DataContract]
    public class TMDB_AuthorizationResponse
    {
        [DataMember(Name ="success")]
        public bool Success { get; set; }

        [DataMember(Name = "expires_at")]
        public DateTime ExpireAt { get; set; }

        [DataMember(Name = "request_token")]
        public string Token { get; set; } 
    }
}
