import {Suspense} from "react";
import Loader from "../components/Shared/Loader";

export const withSuspense = (Component) => {
    const ComponentWithRouterProp = (props) => {
        return (
            <Suspense fallback={<Loader/>}>
                <Component {...props} />
            </Suspense>
        );
    };

    return ComponentWithRouterProp;
};
