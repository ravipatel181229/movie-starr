import React, { useEffect, useState } from 'react';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const [movies, setMovies] = useState([])
    const [lstGenre, setLstGenre] = useState([])
    const [activeTab, setActiveTab] = useState("NOW_PLAYING")
    const { navigate } = useNavigate()


    //startLoading = () => {
    //    let state = this.state;
    //    state.loading = true;
    //    this.setState(state);
    //}
    useEffect(() => {
        getGenreList();
        nowPlayingMoviesData()
    }, [])

    const getGenreList = () => {
        if (!lstGenre.length) {
            fetch('movies/genre-list').then((response) => response.json()).then((responseJson) => {
                console.log(responseJson);
                setLstGenre(responseJson);
            })
        }
    }

    const nowPlayingMoviesData = () => {
        setActiveTab("NOW_PLAYING")
        //const token = await authService.getAccessToken()
        fetch('movies').then((response) => response.json()).then((data) => {
            setMovies(data);
        })
    }

    const upcomingMovies = () => {
        setActiveTab("UPCOMING")
        fetch('movies/upcoming').then((response) => response.json()).then((data) => {
            setMovies(data);
        })
    }

    const popularMovies = () => {
        setActiveTab("POPULAR")
        fetch('movies/popular').then((response) => response.json()).then((data) => {
            setMovies(data);
        })
    }

    const topRatedMovies = () => {
        setActiveTab("TOP_RATED")
        fetch('movies/top-rated').then((response) => response.json()).then((data) => {
            setMovies(data);
        })
    }


    return (
        <>
            <ul className="nav justify-content-end">
                <li className="nav-item">
                    <a className={"nav-link btn" + (activeTab == "NOW_PLAYING" ? " active" : "")} onClick={nowPlayingMoviesData} >Now Playing</a>
                </li>
                <li className="nav-item">
                    <a className={"nav-link btn" + (activeTab == "UPCOMING" ? " active" : "")} onClick={upcomingMovies} >Upcoming</a>
                </li>
                <li className="nav-item">
                    <a className={"nav-link btn" + (activeTab == "POPULAR" ? " active" : "")} onClick={popularMovies}>Popular</a>
                </li>
                <li class="nav-item">
                    <a className={"nav-link btn" + (activeTab == "TOP_RATED" ? " active" : "")} onClick={topRatedMovies}>Top Rated</a>
                </li>
            </ul>
            <ResponsiveMasonry
                columnsCountBreakPoints={{ 350: 1, 750: 3, 900: 4 }}
            >
                <Masonry>

                    {movies.map(movie =>
                        <a className="grid-item m-1 text-decoration-none" href={"/movie-detail/" + movie.id} key={movie.id}>
                            <div className="card" >
                                <div className="card-body">
                                    <img className="card-img-top" src={"http://image.tmdb.org/t/p/w500/" + movie.poster_path} />
                                    <h5 className="card-title mt-2">{movie.title}</h5>
                                    <span className="text-muted" style={{ float: "right" }}> {movie.adult ? "A" : "U/A"}</span>
                                    <span> {movie.release_date}</span>
                                    <p className="card-text text-muted">{movie.overview}</p>
                                    <div>
                                        {lstGenre.length && movie.genre_ids.map(genre =>
                                            <strong class="badge text-success border border-success mx-1">{lstGenre.find(x => x.id == genre)["name"]}</strong>
                                        )}
                                    </div>
                                    <span className="card-text">{movie.vote_count} Votes</span>
                                    <div class="progress" style={{ height: "5px" }} >
                                        <div class="progress-bar" role="progressbar" style={{ width: movie.vote_average * 10 + "%" }} aria-valuenow={movie.vote_average} aria-valuemin="0" aria-valuemax="10"></div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    )}
                </Masonry>
            </ResponsiveMasonry>
        </>
    );
}

export default Home;