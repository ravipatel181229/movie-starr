import React, { useEffect, useState } from 'react';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { useNavigate } from 'react-router-dom';
import TVSeriesItem from './TVSeriesItem';


const TVSeries = () => {
    const [series, setSeries] = useState([])
    const [lstGenre, setLstGenre] = useState([])
    const [activeTab, setActiveTab] = useState("ON_THE_AIR")
    const { navigate } = useNavigate()


    //startLoading = () => {
    //    let state = this.state;
    //    state.loading = true;
    //    this.setState(state);
    //}
    useEffect(() => {
        getGenreList();
        nowPlayingSeriesData()
    }, [])

    const getGenreList = () => {
        if (!lstGenre.length) {
            fetch('tv-series/genre-list').then((response) => response.json()).then((responseJson) => {
                console.log(responseJson);
                setLstGenre(responseJson);
            })
        }
    }

    const nowPlayingSeriesData = () => {
        setActiveTab("ON_THE_AIR")
        //const token = await authService.getAccessToken()
        fetch('tv-series/on-the-air').then((response) => response.json()).then((data) => {
            setSeries(data);
        })
    }

    const arrivingTodaySeries = () => {
        setActiveTab("ARRIVING_TODAY")
        fetch('tv-series/arriving').then((response) => response.json()).then((data) => {
            setSeries(data);
        })
    }

    const popularSeries = () => {
        setActiveTab("POPULAR")
        fetch('tv-series/popular').then((response) => response.json()).then((data) => {
            setSeries(data);
        })
    }

    const topRatedSeries = () => {
        setActiveTab("TOP_RATED")
        fetch('tv-series/top-rated').then((response) => response.json()).then((data) => {
            setSeries(data);
        })
    }


    return (
        <>
            <ul className="nav justify-content-end">
                <li className="nav-item">
                    <a className={"nav-link btn" + (activeTab == "ON_THE_AIR" ? " active" : "")} onClick={nowPlayingSeriesData} >On The Air</a>
                </li>
                <li className="nav-item">
                    <a className={"nav-link btn" + (activeTab == "ARRIVING_TODAY" ? " active" : "")} onClick={arrivingTodaySeries} >Arriving Today</a>
                </li>
                <li className="nav-item">
                    <a className={"nav-link btn" + (activeTab == "POPULAR" ? " active" : "")} onClick={popularSeries}>Popular</a>
                </li>
                <li class="nav-item">
                    <a className={"nav-link btn" + (activeTab == "TOP_RATED" ? " active" : "")} onClick={topRatedSeries}>Top Rated</a>
                </li>
            </ul>
            <ResponsiveMasonry
                columnsCountBreakPoints={{ 350: 1, 750: 3, 900: 4 }}
            >
                <Masonry>

                    {series.map(seriesItem =>
                        <TVSeriesItem seriesItem={seriesItem} lstGenre={lstGenre} />
                    )}
                </Masonry>
            </ResponsiveMasonry>
        </>
    );
}

export default TVSeries;