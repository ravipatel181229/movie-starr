import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import Home from "./components/Movies/Home";
import MovieDetail from './components/Movies/MovieDetail';
import TVDetail from './components/TV/TVDetail';
import TVSeries from './components/TV/TVSeries';

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/movie-detail/:id',
        requireAuth: false,
        element: <MovieDetail />
    },
    {
        path: '/tv',
        requireAuth: false,
        element: <TVSeries />
    },
    {
        path: '/tv-detail/:id',
        requireAuth: false,
        element: <TVDetail />
    },
    ...ApiAuthorzationRoutes
];

export default AppRoutes;
