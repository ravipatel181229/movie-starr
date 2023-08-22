import React, { useEffect, useState } from 'react';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { useNavigate } from 'react-router-dom';
import MovieItem from './MovieItem';


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

    const onSearchInputChange = (e) => {
        let searchStr = e.currentTarget.value;
        if (searchStr)
            searchMovies(searchStr)
        else
            nowPlayingMoviesData()
    }

    const searchMovies = (search) => {
        fetch('movies/search?query=' + search).then((response) => response.json()).then((data) => {
            setMovies(data);
        })
    }


    return (
        <>
            <div class="input-group mb-3">
                <input type="text" class="form-control"
                    placeholder="Search Movies..." onChange={onSearchInputChange} />
                {/*<span class="input-group-text" id="basic-addon2">@example.com</span>*/}
            </div>
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
                        <MovieItem movie={movie} lstGenre={lstGenre} />
                    )}
                </Masonry>
            </ResponsiveMasonry>
        </>
    );
}

export default Home;