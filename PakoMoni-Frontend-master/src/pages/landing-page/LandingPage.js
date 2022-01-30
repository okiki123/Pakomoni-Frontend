import { pure } from 'recompose';
import React from "react";
import Banner from "./banner/Banner";
import WhatYouGet from "./what-you-get/WhatYouGet";
import Aim from "./aim/Aim";
import Setup from "./setup/Setup";
import Featured from "./featured/Featured";
import Try from "./try/Try";
import AppLayout from "../../layouts/app/AppLayout";

const LandingPage = () => {
    return (
        <AppLayout>
            <Banner />
            <WhatYouGet />
            <Aim />
            <Setup />
            <Featured />
            <Try />
        </AppLayout>
    );
};

export default pure(LandingPage);
