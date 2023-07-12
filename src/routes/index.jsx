import React, {useEffect, useState} from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import {useNavigate} from "react-router-dom/dist";

// ------------------------- Containers -------------------------

const Sample = React.lazy(() => import("../containers/Sample"));
const SampleFunctional = React.lazy(() =>
    import("../containers/SampleFunctional")
);
const ProductMaster = React.lazy(() =>
    import("../containers/ProductMaster")
);
const CompanyMaster = React.lazy(() =>
    import("../containers/CompanyMaster")
);
// const Modal = React.lazy(() =>
//   import(
//     "../theme(DontModifyForReference)/component/Notifications/Modals/Modals"
//   )
// );

// const DefaultStructure = React.lazy(() =>
//   import("../containers/DefaultStructure2/TheLayout.jsx")
// );

// ------------------------- Paths Constant -------------------------
const SAMPLE_FUNCTION = "/sampleFunction";

const PRODUCT_MASTER = "/productMaster";

const COMPANY_MASTER = "/companyMaster";

const SAMPLE = "/sample";

// ------------------------- Paths Array -------------------------

export const pathsUniversal = [SAMPLE];

export const pathsUnAuthenticated = [];

export const pathsAuthenticated = [];

// ------------------------- Router -------------------------

const index = (props) => {
    const {isUserAuthenticated} = props;
    const navigate = useNavigate();

    const [state, updateStateValue] = useState({});

    const setState = (value) => {
        updateStateValue((prevState) => ({
            ...prevState,
            ...value,
        }));
    };

    useEffect(() => {
        // Anything in here is fired on component mount.

        return () => {
            // Anything in here is fired on component unmount.
        };
    }, []);

    useEffect(() => {
        // Anything in here is fired on component did update.

        if (!isRedirectPathExistIn(pathsUniversal)) {
            if (isUserAuthenticated) {
                if (isRedirectPathExistIn(pathsUnAuthenticated)) {
                    navigate(SAMPLE);
                }
            } else {
                if (isRedirectPathExistIn(pathsAuthenticated)) {
                    navigate(SAMPLE);
                }
            }
        }
    });

    const isRedirectPathExistIn = (paths) => {
        const isExist =
            paths.filter((item) => window.location.href.indexOf(item) !== -1).length >
            0;
        return isExist;
    };

    return (
        <Routes>
            {/* If no matching path found navigate to sample*/}
            <Route path="*" element={<Navigate to={SAMPLE} replace/>}/>

            <Route path={PRODUCT_MASTER} element={<ProductMaster {...props} />}/>

            <Route path={SAMPLE_FUNCTION} element={<SampleFunctional {...props} />}/>

            <Route path={COMPANY_MASTER} element={<CompanyMaster {...props} />}/>

            {/* <Route
          path="/user-view"
          name="UserView"
          render={(props) => <DefaultStructure {...props} />}
        />
        <Route
          path="/country-view"
          name="CountryView"
          render={(props) => <DefaultStructure {...props} />}
        />
        <Route
          path="/category-view"
          name="CategoryView"
          render={(props) => <DefaultStructure {...props} />}
        />
        <Route
          path="/language-view"
          name="LanguageView"
          render={(props) => <DefaultStructure {...props} />}
        />

        <Route
          path="/tutor-view"
          name="TutorView"
          render={(props) => <DefaultStructure {...props} />}
        />
        <Route
          path="/roledetails-view"
          name="RoledetailsView"
          render={(props) => <DefaultStructure {...props} />}
        />
        <Route
          path="/configdetails-view"
          name="ConfigdetailsView"
          render={(props) => <DefaultStructure {...props} />}
        />
        <Route
          path="/alltransaction-view"
          name="AllTransactionView"
          render={(props) => <DefaultStructure {...props} />}
        />
        <Route
          path="/pagemanagment-view"
          name="PageManagmentView"
          render={(props) => <DefaultStructure {...props} />}
        /> */}
        </Routes>
    );
};

export default index;
