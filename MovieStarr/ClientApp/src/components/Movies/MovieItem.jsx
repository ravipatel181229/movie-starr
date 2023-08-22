import React from 'react';
import Star from 'star-rating-react-component';


const options = {
    name: 'custom',
    starsWidth: 40,
    color: "#ffffff",
    bgColor: " #e6e6e6",
    borderColor: "orange",
    scoreColor: "inherit"
}

const MovieItem = (props) => {
    return (
        <>
            <a className="grid-item m-1 text-decoration-none" href={"/movie-detail/" + props.movie.id} key={props.movie.id}>
                <div className="card dark-bg" >
                    <div className="card-body">
                        <img className="card-img-top" src={"http://image.tmdb.org/t/p/w500/" + props.movie.poster_path} />
                        <h5 className="card-title mt-2">{props.movie.title}</h5>
                        <span className="" style={{ float: "right" }}> {props.movie.adult ? "A" : "U/A"}</span>
                        <span> {props.movie.release_date}</span>
                        <p className="card-text">{props.movie.overview}</p>
                        <div className="mb-2">
                            {props.lstGenre.length && props.movie.genre_ids.map(genre =>
                                <strong class="badge text-success border border-success me-1">{props.lstGenre.find(x => x.id == genre)["name"]}</strong>
                            )}
                        </div>
                        <span className="card-text">{props.movie.vote_count} Votes</span>
                        <Star options={{
                            name: 'custom',
                            starsWidth: 20,
                            numOfStars: props.movie.vote_average,
                            color: "#ffffff",
                            bgColor: props.movie.vote_average > 7 ? "#198754" : props.movie.vote_average >= 5 ? "#fd7e14" : "#dc3545",
                            scoreColor: "inherit"
                        }} />
                    </div>
                </div>
            </a>
        </>
    );
}

export default MovieItem;