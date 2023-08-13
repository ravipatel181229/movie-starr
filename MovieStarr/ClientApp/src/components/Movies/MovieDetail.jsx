import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import blankProfile from '../../images/blank-profile.png';

const MovieDetail = () => {
    const { id } = useParams();
    const [movieDetail, setMovieDetail] = useState({})
    const [movieVideos, setMovieVideos] = useState([])
    const [movieCredits, setMovieCredits] = useState([])
    const [movieReviews, setMovieReviews] = useState({})
    const [movieReviewPage, setMovieReviewPage] = useState(1)

    useEffect(() => {
        getMovieDetails(id)
    }, [])

    const getMovieDetails = (id) => {
        fetch('movies/movie-details?id=' + id).then((response) => response.json()).then((data) => {
            setMovieDetail(data);
            getMovieCredits(id)
            getMovieReviews(id)
        })
    }

    const getMovieVideos = (id) => {
        fetch('movies/movie-videos?id=' + id).then((response) => response.json()).then((data) => {
            setMovieVideos(data);
        })
    }

    const getMovieCredits = (id) => {
        fetch('movies/movie-credits?id=' + id).then((response) => response.json()).then((data) => {
            setMovieCredits(data);
        })
    }

    const getMovieReviews = (id) => {
        fetch('movies/movie-reviews?id=' + id + '&page=' + movieReviewPage).then((response) => response.json()).then((data) => {
            setMovieReviewPage(data.total_pages > movieReviewPage ? movieReviewPage++ : movieReviewPage);
            data["results"] = movieReviews["results"] ? movieReviews["results"].concat(...data.results) : data.results
            setMovieReviews(data);
        })
    }

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-5 col-md-5 col-sm-6">
                            <div className="white-box text-center"><img src={"http://image.tmdb.org/t/p/w500/" + movieDetail.poster_path} className="img-fluid " /></div>
                        </div>
                        <div className="col-lg-7 col-md-7 col-sm-6">
                            <h2 className="box-title mt-2">{movieDetail.title}</h2>
                            <small>{movieDetail.tagline}</small>
                            <p>{movieDetail.overview}</p>
                            <div className="mb-2">
                                {movieDetail.spoken_languages && movieDetail.spoken_languages.map(lang =>
                                    <strong class="me-1">{lang["name"]}</strong>
                                )}
                            </div>
                            <div className="mb-2">
                                {movieDetail.genres && movieDetail.genres.map(genre =>
                                    <strong class="badge text-success border border-success me-1">{genre["name"]}</strong>
                                )}
                            </div>
                            <div>
                                <strong>Productions</strong>
                                <ul className="mb-2">
                                    {movieDetail.production_companies && movieDetail.production_companies.map(prod =>
                                        <li class="mx-1">{prod["name"]}</li>
                                    )}
                                </ul>
                            </div>
                            <div className="box-title mt-3"><strong>Votes:</strong> {movieDetail.vote_count}</div>
                            <div class="progress"  >
                                <div class="progress-bar bg-info" role="progressbar" style={{ width: movieDetail.vote_average * 10 + "%" }} aria-valuenow={movieDetail.vote_average} aria-valuemin="0" aria-valuemax="10"></div>
                            </div>
                            <div class="row mt-3">
                                <h3>Cast</h3>
                                {movieCredits.cast && movieCredits.cast.map((movieCast, index) =>
                                    movieCast.order <= 5 ?
                                        <>
                                            <div className="col-lg-2 col-md-3 col-6 p-1">
                                                {
                                                    movieCast.profile_path ?
                                                        <img src={"http://image.tmdb.org/t/p/w500/" + movieCast.profile_path} className="img-fluid rounded" />
                                                        :
                                                        <img src={blankProfile} className="img-fluid" />
                                                }
                                                <h6>{movieCast.name} ({movieCast.known_for_department})</h6>
                                                <strong className="text-muted">{movieCast.character}</strong>
                                            </div>
                                        </> : <></>
                                )}
                            </div>
                        </div>
                        <div className="col-12">
                            <h3 className="mt-3">Reviews</h3>
                            <div className="row">
                                {movieReviews.results && movieReviews.results.map((movieReview, index) =>

                                    <div class="col-md-3 p-1" key={index}>
                                        <div class="card h-100">
                                            <div class="card-body">
                                                <h5 class="card-title">{movieReview.author}</h5>
                                                <p class="card-text" title={movieReview.content}>{movieReview.content.slice(0, 100)}. . .</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <button className="btn btn-info" hidden={movieReviews.total_pages == movieReviewPage}>Load More</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}


export default MovieDetail;