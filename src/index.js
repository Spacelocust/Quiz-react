import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from "recoil";

import 'bootstrap/dist/css/bootstrap.min.css';

import App from "./App";

ReactDOM.render(
    <React.StrictMode>
        <RecoilRoot>
            <App />
        </RecoilRoot>
    </React.StrictMode>,
    document.getElementById('root')
);
