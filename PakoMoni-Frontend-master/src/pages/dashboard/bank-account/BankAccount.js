import React, {Fragment, useState} from "react";
import {pure} from "recompose";
import DashboardLayout from "../../../layouts/dashboard/DashboardLayout";
import HorizontalLinearStepper from "../../../components/horizontal-stepper/HorizontalStepper";
import Button from "../../../components/button/Button";
import Panel from "../../../components/panel/Panel";
import PersonalDetailsForm from "./forms/PersonalDetailsForm";
import BusinessDetailsForms from "./forms/BusinessDetailsForms";
import Bank from "./bank/Bank";
import banks from "./bank/banks";
import Summary from "./summary/Summary";
import APP from "../../../store/actions/app-actions";
import {connect} from "react-redux";
import {useSnackbar, withSnackbar} from "notistack";
import dashboardService from "../../../services/dashboard-services";
import AUTH from "../../../store/actions/auth-actions";
import storageService from "../../../services/storage-service";
import DASHBOARD from "../../../store/actions/dashboard-actions";

const BankAccount = ({history, user, bankAccount, showLoader, hideLoader, patchUser, patchBankAccount}) => {
    const steps = ['Select Bank', 'Personal Details', 'Business Details', 'Summary'];

    const [activeStep, setActiveStep] = useState(0);
    const [bank, setBank] = useState(null);
    const [personalDetailsFormInValid, setPersonalDetailsFormInValid] = useState(true);
    const [businessDetailsFormInValid, setBusinessDetailsFormInValid] = useState(true);
    const [personalDetailsValue, setPersonalDetailsValue] = useState(null);
    const [businessDetailsValue, setBusinessDetailsValue] = useState(null)

    const { enqueueSnackbar } = useSnackbar();

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1)
    }

    const handlePrev = () => {
        setActiveStep((prevStep) => prevStep - 1)
    }

    const handleImageSelect = (e) => {
        setBank(e);
    }

    const handlePersonalDetailsChange = (e) => {
        setPersonalDetailsFormInValid(e.invalid);
        setPersonalDetailsValue(e.value);
    }

    const handleBusinessDetailsChange = (e) => {
        setBusinessDetailsFormInValid(e.invalid);
        setBusinessDetailsValue(e.value);
    }

    const handleSubmit = async () => {
        const data = {
            bank_name: bank,
            dob: personalDetailsValue.dateOfBirth,
            ...personalDetailsValue,
            ...businessDetailsValue,
            address: {
                street: personalDetailsValue.address,
                state: personalDetailsValue.state,
                lga: personalDetailsValue.lga
            },
            business_address: {
                street: businessDetailsValue.business_address,
                state: businessDetailsValue.state,
                lga: businessDetailsValue.lga
            }
        };

        delete data.state;
        delete data.lga;
        delete data.dateOfBirth;
        delete data.have_tin;

        showLoader();
        try {
            const response = await dashboardService.createBank(data);
            const userBankIds = [...user.bank_ids];
            userBankIds.push(response.data.data._id);
            patchUser({bank_ids: userBankIds});
            await storageService.setItem('user', {...user, bank_ids: userBankIds});
            patchBankAccount(response.data.data);
            enqueueSnackbar('Bank Added Successfully', {
                variant: 'success'
            });
            history.push('/dashboard')
            hideLoader();
        } catch (err) {
            enqueueSnackbar(err, {
                variant: 'error'
            });
            hideLoader();
        }
        console.log(data);
    };

    return (
        <DashboardLayout title="Business Registration" history={history}>
            <div className="my-2 py-3 BankAccount">
                <HorizontalLinearStepper steps={steps} activeStep={activeStep} />

                {/*Proposed Names*/}
                {
                    activeStep === 0 &&
                    (
                        <Panel title="Select a bank" className="mt-4">
                            <div className="row mx-0">
                                <div className="">
                                    <div className="text-muted mb-3 font-size-lg">
                                        Select any bank of your choice
                                    </div>

                                    <div className="d-flex flex-wrap">
                                        {
                                            banks.map((item, index) => {
                                                return (
                                                        <Bank
                                                            className={`
                                                                mx-2 mb-3 cursor-pointer ${bank === item.value ? "border-orange" : ""}
                                                            `}
                                                            src={item.src}
                                                            key={index}
                                                            label={item.label}
                                                            value={item.value}
                                                            onSelect={handleImageSelect}
                                                        />
                                                    )
                                            })
                                        }
                                        <Bank />
                                    </div>
                                </div>
                            </div>
                        </Panel>
                    )
                }

                {/*Personal Details*/}
                {
                    activeStep === 1 &&
                    (
                        <Panel title="Personal Details" className="mt-4">
                            <div className="row mx-0">
                                <div className="col-lg-6">
                                    <div className="text-muted mb-3 font-size-lg">
                                        Please provide more information about your business here
                                    </div>
                                    <PersonalDetailsForm data={personalDetailsValue} onChange={handlePersonalDetailsChange} />
                                </div>
                            </div>
                        </Panel>
                    )
                }

                {/*Business Details*/}
                {
                    activeStep === 2 &&
                    (
                        <Panel title="Business Details" className="mt-4">
                            <div className="row mx-0">
                                <div className="col-lg-6">
                                    <div className="text-muted mb-3 font-size-lg">
                                        Enter your business details here
                                    </div>
                                    <BusinessDetailsForms data={businessDetailsValue} onChange={handleBusinessDetailsChange} />
                                </div>
                            </div>
                        </Panel>
                    )
                }

                {/*Summary*/}
                {
                    activeStep === 3 &&
                    (
                        <Summary
                            bank={bank}
                            personalDetails={personalDetailsValue}
                            businessDetails={businessDetailsValue}
                        />
                    )
                }

                <div className={`d-flex mt-4 justify-content-between`}>
                    {
                        activeStep === 0 &&
                        <Button
                            className="Btn-outline-blue Btn-standard"
                            type="button"
                        >
                            Cancel
                        </Button>
                    }
                    {
                        activeStep !== 0 &&
                        <Button
                            className="Btn-outline-blue Btn-standard"
                            type="button"
                            onClick={handlePrev}
                        >
                            Back
                        </Button>
                    }
                    {
                        activeStep !== 3 ?
                            (
                                <Fragment>
                                    <Button
                                        className="Btn-blue Btn-standard text-white"
                                        disabled={
                                            (activeStep === 0 && !bank) ||
                                            (activeStep === 1 && personalDetailsFormInValid) ||
                                            (activeStep === 2 && businessDetailsFormInValid)
                                        }
                                        onClick={handleNext}
                                        type="button"
                                    >
                                        Next
                                    </Button>
                                </Fragment>
                            )
                            :
                            (
                                <Fragment>
                                    <Button
                                        className="Btn-orange Btn-standard text-white"
                                        type="button"
                                        onClick={handleSubmit}
                                    >
                                        Submit
                                    </Button>
                                </Fragment>
                            )
                    }
                </div>

            </div>
        </DashboardLayout>
    );
}

BankAccount.propTypes = {

};

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        bankAccount: state.dashboard.bankAccount
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showLoader: () => dispatch({type: APP.SHOW_LOADER}),
        hideLoader: () => dispatch({type: APP.HIDE_LOADER}),
        patchUser: (data) => dispatch({type: AUTH.PATCH_USER, data}),
        patchBankAccount: (data) => dispatch({type: DASHBOARD.PATCH_BANK_ACCOUNT, data})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(pure(BankAccount));
