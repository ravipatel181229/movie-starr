﻿import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";


const TVDetail = () => {
    const { id } = useParams();
    const [tvDetail, setTvDetail] = useState({})
    const [movieVideos, setMovieVideos] = useState([])

    useEffect(() => {
        gettvDetails(id)
    }, [])

    const gettvDetails = (id) => {
        fetch('tv-series/tv-details?id=' + id).then((response) => response.json()).then((data) => {
            document.body.style.background = "url(http://image.tmdb.org/t/p/w1280/" + data.backdrop_path + ")";
            document.body.style.backgroundSize = "cover";
            setTvDetail(data);
            //getMovieVideos(id)
        })
    }

    //const getMovieVideos = (id) => {
    //    fetch('movies/movie-videos?id=' + id).then((response) => response.json()).then((data) => {
    //        setMovieVideos(data);
    //    })
    //}

    return (
        <>
            <div className="card transparent-bg">
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-5 col-md-5 col-sm-6">
                            <div className="white-box text-center"><img src={"http://image.tmdb.org/t/p/w500/" + tvDetail.poster_path} className="img-fluid " /></div>
                        </div>
                        <div className="col-lg-7 col-md-7 col-sm-6">
                            <h2 className="box-title mt-2">{tvDetail.name}</h2>
                            <small>{tvDetail.tagline}</small>
                            <p>{tvDetail.overview}</p>
                            <div className="mb-2">
                                {tvDetail.spoken_languages && tvDetail.spoken_languages.map(lang =>
                                    <strong class="me-1">{lang["name"]}</strong>
                                )}
                            </div>
                            <div className="mb-2">
                                {tvDetail.genres && tvDetail.genres.map(genre =>
                                    <strong class="badge text-success border border-success me-1">{genre["name"]}</strong>
                                )}
                            </div>
                            <div>
                                <strong>Productions</strong>
                                <ul className="mb-2">
                                    {tvDetail.production_companies && tvDetail.production_companies.map(prod =>
                                        <li class="mx-1">{prod["name"]}</li>
                                    )}
                                </ul>
                            </div>
                            <div className="box-title mt-2"><strong>Votes:</strong> {tvDetail.vote_count}</div>
                            <div class="progress"  >
                                <div class="progress-bar bg-info" role="progressbar" style={{ width: tvDetail.vote_average * 10 + "%" }} aria-valuenow={tvDetail.vote_average} aria-valuemin="0" aria-valuemax="10"></div>
                            </div>
                            <div class="row mt-2">
                                {tvDetail.seasons && tvDetail.seasons.map((season, index) => <>
                                    <div className="col-md-3 p-1">
                                        {season.poster_path &&
                                            <img src={"http://image.tmdb.org/t/p/w500/" + season.poster_path} className="img-fluid" />
                                        }
                                        <h4>{season.name}</h4>
                                        <small>{season.air_date}</small>
                                        <p>Episodes: {season.episode_count}</p>
                                    </div>
                                </>)}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );

}


export default TVDetail;