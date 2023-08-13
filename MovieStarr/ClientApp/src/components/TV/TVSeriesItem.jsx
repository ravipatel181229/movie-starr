import React, { useEffect, useState } from 'react';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { useNavigate } from 'react-router-dom';


const TVSeriesItem = (props) => {

    return (
        <a className="grid-item m-1 text-decoration-none" href={"/tv-detail/" + props.seriesItem.id} key={props.seriesItem.id}>
            <div className="card" >
                <div className="card-body">
                    <img className="card-img-top" src={"http://image.tmdb.org/t/p/w500/" + props.seriesItem.poster_path} />
                    <h5 className="card-title mt-2">{props.seriesItem.name}</h5>
                    <span className="text-muted" style={{ float: "right" }}> {props.seriesItem.adult ? "A" : "U/A"}</span>
                    <span> {props.seriesItem.release_date}</span>
                    <p className="card-text text-muted">{props.seriesItem.overview}</p>
                    <div>
                        {props.lstGenre.length && props.seriesItem.genre_ids.map(genre =>
                            <strong class="badge text-success border border-success mx-1">{props.lstGenre.find(x => x.id == genre)["name"]}</strong>
                        )}
                    </div>
                    <span className="card-text">{props.seriesItem.vote_count} Votes</span>
                    <div class="progress" style={{ height: "5px" }} >
                        <div class="progress-bar" role="progressbar" style={{ width: props.seriesItem.vote_average * 10 + "%" }} aria-valuenow={props.seriesItem.vote_average} aria-valuemin="0" aria-valuemax="10"></div>
                    </div>
                </div>
            </div>
        </a>
    );
}

export default TVSeriesItem;