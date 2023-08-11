import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import Home from "./components/Home";
import MovieDetail from './components/MovieDetail';

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
    ...ApiAuthorzationRoutes
];

export default AppRoutes;
