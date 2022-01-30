import React, {Fragment} from "react";
import { pure } from "recompose";
import PropTypes from "prop-types";
import Panel from "../../../../components/panel/Panel";

const Summary = ({ bank, personalDetails, businessDetails }) => {
    return (
        <Fragment>
            <Panel title="Summary" className="mt-3 mb-5">
                {/*Bank*/}
                <ul className="list-group my-4">
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col-12 mb-3 font-w600">
                                Bank
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col-md-4 col-6">
                                Name
                            </div>
                            <div className="col-md-8 col-6">
                                {bank || '-'}
                            </div>
                        </div>
                    </li>
                </ul>

                {/*Personal Details*/}
                <ul className="list-group my-4">
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col-12 mb-3 font-w600">
                                Personal Details
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col-md-4 col-6">
                                Title
                            </div>
                            <div className="col-md-8 col-6">
                                {(personalDetails && personalDetails.title) || '-'}
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col-md-4 col-6">
                                Name
                            </div>
                            <div className="col-md-8 col-6">
                                {(personalDetails && personalDetails.name) || '-'}
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col-md-4 col-6">
                                Gender
                            </div>
                            <div className="col-md-8 col-6">
                                {(personalDetails && personalDetails.gender) || '-'}
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col-md-4 col-6">
                                Date of Birth
                            </div>
                            <div className="col-md-8 col-6">
                                {(personalDetails && personalDetails.dateOfBirth) || '-'}
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col-md-4 col-6">
                                State
                            </div>
                            <div className="col-md-8 col-6">
                                {(personalDetails && personalDetails.state) || '-'}
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col-md-4 col-6">
                                LGA
                            </div>
                            <div className="col-md-8 col-6">
                                {(personalDetails && personalDetails.lga) || '-'}
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col-md-4 col-6">
                                Address
                            </div>
                            <div className="col-md-8 col-6">
                                {(personalDetails && personalDetails.address) || '-'}
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col-md-4 col-6">
                                BVN
                            </div>
                            <div className="col-md-8 col-6">
                                {(personalDetails && personalDetails.bvn) || '-'}
                            </div>
                        </div>
                    </li>
                </ul>

                {/*Business Details*/}
                <ul className="list-group my-4">
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col-12 mb-3 font-w600">
                                Business Details
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col-md-4 col-6">
                                Business Name
                            </div>
                            <div className="col-md-8 col-6">
                                {(businessDetails && businessDetails.business_name) || '-'}
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col-md-4 col-6">
                               RC Number
                            </div>
                            <div className="col-md-8 col-6">
                                {(businessDetails && businessDetails.rc_number) || '-'}
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col-md-4 col-6">
                                TIN Number
                            </div>
                            <div className="col-md-8 col-6">
                                {(businessDetails && businessDetails.tin_number) || '-'}
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col-md-4 col-6">
                                State
                            </div>
                            <div className="col-md-8 col-6">
                                {(businessDetails && businessDetails.state) || '-'}
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col-md-4 col-6">
                                LGA
                            </div>
                            <div className="col-md-8 col-6">
                                {(businessDetails && businessDetails.lga) || '-'}
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item">
                        <div className="row">
                            <div className="col-md-4 col-6">
                                Business Address
                            </div>
                            <div className="col-md-8 col-6">
                                {(businessDetails && businessDetails.business_address) || '-'}
                            </div>
                        </div>
                    </li>
                </ul>
            </Panel>
        </Fragment>
    );
}

Summary.propTypes = {
    bank: PropTypes.any,
    personalDetails: PropTypes.any,
    businessDetails: PropTypes.any
};

export default pure(Summary);
