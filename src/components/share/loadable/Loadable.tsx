import {Suspense} from 'react';
import {CircularProgress} from "@mui/material";


const Loadable = (Component: any) => (props: any) =>
    (
        <Suspense fallback={<CircularProgress/>}>
            <Component {...props} />
        </Suspense>
    );

export default Loadable;
