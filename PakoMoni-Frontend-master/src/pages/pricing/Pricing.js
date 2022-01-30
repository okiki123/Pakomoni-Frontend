import React from "react";
import  { pure } from "recompose";
import AppLayout from "../../layouts/app/AppLayout";
import PricingCard from "./pricing-card/PricingCard";
import {PERKS} from "./perks";

const Pricing = () => {
    return (
        <AppLayout>
            <div className="Pricing d-flex justify-content-center">
                <div className="p-3">
                    <div className="Pricing__big-text text-blue mb-5 text-center">Pricing to suit all size of businesses</div>
                    <div className="">
                        <ul className="nav nav-pills mb-5 mx-auto" id="pills-tab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active mr-3" id="pills-home-tab" data-toggle="pill" href="#pills-home"
                                   role="tab" aria-controls="pills-home" aria-selected="true">Full Payment</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile"
                                   role="tab" aria-controls="pills-profile" aria-selected="false">Two Installments</a>
                            </li>
                        </ul>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-home" role="tabpanel"
                                 aria-labelledby="pills-home-tab">
                                <div className="row mx-0">
                                    <div className="col-md-6 mb-3">
                                        <PricingCard
                                            className='h-100'
                                            perks={PERKS.unregistered}
                                            businessType="Unregistered"
                                            type="dark"
                                            amount="20,000" />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <PricingCard
                                            className='h-100'
                                            perks={PERKS.registered}
                                            businessType="Registered"
                                            type="light" />
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="pills-profile" role="tabpanel"
                                 aria-labelledby="pills-profile-tab">
                                <div className="row mx-0">
                                    <div className="col-md-6 mb-3">
                                        <PricingCard
                                            className='h-100'
                                            perks={PERKS.unregistered}
                                            businessType="Unregistered"
                                            type="dark"
                                            amount="24,000" />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <PricingCard
                                            className='h-100'
                                            perks={PERKS.registered}
                                            businessType="Registered"
                                            type="light" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default pure(Pricing);
