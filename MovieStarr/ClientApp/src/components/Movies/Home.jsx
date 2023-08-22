import React, { useEffect, useState } from 'react';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { useNavigate } from 'react-router-dom';
import MovieItem from './MovieItem';


const Home = () => {
    const [movies, setMovies] = useState([])
    const [lstGenre, setLstGenre] = useState([])
    const [lstRegion, setLstRegion] = useState([])
    const [region, setRegion] = useState("IN")
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
        regionList();
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
        fetch('movies?region=' + region).then((response) => response.json()).then((data) => {
            setMovies(data);
        })
    }

    const upcomingMovies = () => {
        setActiveTab("UPCOMING")
        fetch('movies/upcoming?region=' + region).then((response) => response.json()).then((data) => {
            setMovies(data);
        })
    }

    const popularMovies = () => {
        setActiveTab("POPULAR")
        fetch('movies/popular?region=' + region).then((response) => response.json()).then((data) => {
            setMovies(data);
        })
    }

    const topRatedMovies = () => {
        setActiveTab("TOP_RATED")
        fetch('movies/top-rated?region=' + region).then((response) => response.json()).then((data) => {
            setMovies(data);
        })
    }

    const regionList = () => {
        fetch('movies/region-list').then((response) => response.json()).then((data) => {
            setLstRegion(data);
        })
    }

    const onSearchInputChange = (e) => {
        let searchStr = e.currentTarget.value;
        if (searchStr)
            searchMovies(searchStr)
        else
            getMovies();
    }

    const searchMovies = (search) => {
        fetch('movies/search?query=' + search).then((response) => response.json()).then((data) => {
            setMovies(data);
        })
    }

    const onRegionSelect = (e) => {
        setRegion(e.currentTarget.value)
    }

    const getMovies = () => {
        switch (activeTab) {
            case "NOW_PLAYING":
                nowPlayingMoviesData();
                break;
            case "UPCOMING":
                upcomingMovies();
                break;
            case "POPULAR":
                popularMovies();
                break;
            case "TOP_RATED":
                topRatedMovies();
                break;
            default:
                nowPlayingMoviesData();
                break;
        }
    }

    useEffect(() => {
        getMovies();
    }, [region])

    return (
        <>
            <div class="input-group mb-3 row">
                <div className="col-12 col-sm-8">
                    <input type="text" class="form-control form-control-lg"
                        placeholder="Search Movies..." onChange={onSearchInputChange} />
                </div>
                <div className="col-12 col-sm-4">
                    <select className="form-control form-control-lg" onChange={onRegionSelect}>
                        <option>Select Region</option>
                        {lstRegion.length > 0 && lstRegion.map(region =>
                            <option value={region.iso_3166_1} key={region.iso_3166_1}>{region.native_name}</option>
                        )}
                    </select>
                </div>
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