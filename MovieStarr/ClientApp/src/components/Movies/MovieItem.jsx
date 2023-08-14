import React from 'react';

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
                        <div>
                            {props.lstGenre.length && props.movie.genre_ids.map(genre =>
                                <strong class="badge text-success border border-success mx-1">{props.lstGenre.find(x => x.id == genre)["name"]}</strong>
                            )}
                        </div>
                        <span className="card-text">{props.movie.vote_count} Votes</span>
                        <div class="progress" style={{ height: "5px" }} >
                            <div class="progress-bar" role="progressbar" style={{ width: props.movie.vote_average * 10 + "%" }} aria-valuenow={props.movie.vote_average} aria-valuemin="0" aria-valuemax="10"></div>
                        </div>
                    </div>
                </div>
            </a>
        </>
    );
}

export default MovieItem;