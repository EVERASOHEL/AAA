import {useLocation, useNavigate, useParams} from "react-router-dom";

export const withRouter = (Component) => {
    const ComponentWithRouterProp = (props) => {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        let match = {
            location: location,
            navigate: navigate,
            params: params,
        };
        return <Component {...props} match={match}/>;
    };

    return ComponentWithRouterProp;
};
