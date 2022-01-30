import React, {Fragment, useEffect, useState} from "react";
import {pure} from "recompose";
import DashboardLayout from "../../../layouts/dashboard/DashboardLayout";
import HorizontalLinearStepper from "../../../components/horizontal-stepper/HorizontalStepper";
import Button from "../../../components/button/Button";
import Panel from "../../../components/panel/Panel";
import ProposedNameForm from "./forms/ProposedNameForm";
import BusinessDetailsForm from "./forms/BusinessDetailsForm";
import Proprietor from "./proprietor/Proprietor";
import UploadsTable from "./tables/UploadsTable";
import Payment from "./payment/Payment";
import BaseModal from "../../../components/base-modal/BaseModal";
import PaymentSuccessfulModal from "./payment/modals/PaymentSuccessfulModal";
import {connect} from "react-redux";
import APP from "../../../store/actions/app-actions";
import {withSnackbar} from "notistack";
import DASHBOARD from "../../../store/actions/dashboard-actions";
import dashboardService from "../../../services/dashboard-services";
import AUTH from "../../../store/actions/auth-actions";
import storageService from "../../../services/storage-service";
import { usePaystackPayment } from 'react-paystack';
import PaymentService from "../../../services/payment-service";

const BusinessRegistration = ({history, user, businessRegistration, showLoader, hideLoader, patchUser, patchBusiness, enqueueSnackbar}) => {
    const steps = ['Proposed Names', 'Business Details', 'Uploads', 'Payments'];

    const [activeStep, setActiveStep] = useState(0);
    const [nameFormInValid, setNameFormInValid] = useState(true);
    const [detailsFormInValid, setDetailsFormInValid] = useState(true);
    const [modalOpened, setModalOpened] = useState(false);
    const [nameFormValue, setNameFormValue] = useState(null);
    const [paymentInitiated, setPaymentInitiated] = useState(false);

    useEffect(() => {
        if (user.business_ids && user.business_ids.length) {
            getBusiness();
        }
    }, []);

    const handleNext = () => {
        if (activeStep === 0 && !businessRegistration.names.length) {
            submitName();
        } else {
            saveRegistration();
        }
    }

    const handlePrev = () => {
        setActiveStep((prevStep) => prevStep - 1)
    }

    const handleFormNameChange = (e) => {
        setNameFormInValid(e.invalid);
        setNameFormValue(e.value);
    }

    const handleDetailsChange = (e) => {
        setDetailsFormInValid(e.invalid);
        patchBusiness(processDetailsForm(e.value))
    }

    const handleCompleted = () => {
        setModalOpened(false);
        history.push('bank-account')
    };

    const getBusiness = async () => {
        try {
            showLoader();
            const id = user.business_ids[0];
            const response = await dashboardService.getBusiness(id);
            patchBusiness(response.data.data);
            hideLoader();
        } catch (err) {
            enqueueSnackbar(err, {
                variant: 'error'
            });
            hideLoader();
        }
    }

    const submitName = async () => {
        let data = [nameFormValue.option1, nameFormValue.option2, nameFormValue.option3, nameFormValue.option4];
        data = {names: data};
        showLoader();
        try {
            const response = await dashboardService.createBusiness(data);
            patchBusiness(response.data.data);
            const userBusinessIds = [...user.business_ids];
            userBusinessIds.push(response.data.data._id);
            patchUser({business_ids: userBusinessIds});
            await storageService.setItem('user', {...user, business_ids: userBusinessIds});
            hideLoader();
            setActiveStep((prevStep) => prevStep + 1);
        } catch (err) {
            enqueueSnackbar(err, {
                variant: 'error'
            });
            hideLoader();
        }
    }

    const processDetailsForm = (data) => {
        return  {
            address: {
                number: parseInt(data.no) || null,
                street: data.street || '',
                city: data.city || '',
                lga: data.lga || '',
                state: data.state || ''
            },
            commencementdate: data.date || '',
            category: data.category || '',
            subcategory: data.subCategory || '',
            description: data.businessDescription || ''
        };
    }

    /* Models the store */
    const getDetailsData = (data) => {
        const defaultAddress = {
            number: null,
            street: '',
            city: '',
            lga: '',
            state: ''
        };

        const returnData = {};

        if (data.address) returnData.address = data.address;
        if (data.commencementdate) returnData.commencement_date = data.commencementdate;
        if (data.category) returnData.category = data.category;
        if (data.subcategory) returnData.sub_category = data.subcategory;
        if (data.description) returnData.description = data.description;

        // return {
        //     address: data.address || defaultAddress,
        //     commencement_date: data.commencementdate || '',
        //     category: data.category || '',
        //     sub_category: data.subcategory || '',
        //     description: data.description || ''
        // }

        return returnData;
    }

    const saveRegistration = async () => {
        if (activeStep === 2) {
            setActiveStep((prevStep) => prevStep + 1);
        }

        else {
            try {
                showLoader();
                let names = [nameFormValue.option1, nameFormValue.option2, nameFormValue.option3, nameFormValue.option4];
                const detailsData = getDetailsData(businessRegistration);
                const data = {names, ...detailsData};
                await dashboardService.patchBusiness(data, businessRegistration._id);
                patchBusiness(data);
                setActiveStep((prevStep) => prevStep + 1);
                hideLoader();
            } catch (err) {
                enqueueSnackbar(err, {
                    variant: 'error'
                });
                hideLoader();
            }
        }
    }

    const handleSuccessfulPayment = async (reference) => {
        try {
            showLoader();
            await PaymentService.verifyPayment(reference);
            enqueueSnackbar('Your payment has been confirmed', {
                variant: 'success'
            });
            setModalOpened(true); // Show Payment Successful Modal
        } catch(err) {
            enqueueSnackbar(err, {
                variant: 'error'
            });
        }

        hideLoader();
        setPaymentInitiated(false); // return payment to uninitiated
    };

    const handleCancelPayment = () => {
        setPaymentInitiated(false);
    };

    return (
        <DashboardLayout title="Business Registration" history={history}>
            <div className="my-2 py-3 BusinessRegistration">
                <HorizontalLinearStepper steps={steps} activeStep={activeStep} />

                {/*Proposed Names*/}
                {
                    activeStep === 0 &&
                    (
                        <Panel title="Proposed Names" className="mt-4">
                            <div className="row mx-0">
                                <div className="col-lg-6">
                                    <div className="text-muted mb-3 font-size-lg">
                                        Enter four proposed names for your business
                                    </div>

                                    <ProposedNameForm
                                        data={businessRegistration.names} // From redux store
                                        onChange={handleFormNameChange}
                                        onLoad={handleFormNameChange}
                                    />
                                </div>
                            </div>
                        </Panel>
                    )
                }

                {/*Business Details*/}
                {
                    activeStep === 1 &&
                    (
                        <Panel title="Business Details" className="mt-4">
                            <div className="row mx-0">
                                <div className="col-lg-6">
                                    <div className="text-muted mb-3 font-size-lg">
                                        Please provide more information about your business here
                                    </div>
                                    <BusinessDetailsForm
                                        data={businessRegistration}
                                        onChange={handleDetailsChange}
                                        onLoad={handleDetailsChange}
                                    />
                                </div>
                            </div>
                        </Panel>
                    )
                }

                {/*Uploads*/}
                {
                    activeStep === 2 &&
                    (
                        <Fragment>
                            <Proprietor className="mb-5" />

                            <Panel title="Uploads">
                                <div className="text-muted mb-3 font-size-lg">Please upload the following documents</div>

                                <UploadsTable documents={businessRegistration.documents} />

                                <div className="font-italic font-w100 mt-3 text-muted">
                                    ***(NIN Slip, International Passport, Voter's Identity Card)
                                </div>
                            </Panel>
                        </Fragment>
                    )
                }

                {/*Payment*/}
                {
                    activeStep === 3 &&
                    (
                        <Panel title="Payments" className="mt-4">
                            <Payment
                                paymentInitiated={paymentInitiated}
                                user={user}
                                onDone={handleSuccessfulPayment}
                                onCancel={handleCancelPayment}
                            />
                            <BaseModal openState={modalOpened} onClose={() => setModalOpened(false)}>
                                <PaymentSuccessfulModal onFinish={handleCompleted} onClose={() => setModalOpened(false)} />
                            </BaseModal>
                        </Panel>
                    )
                }

                {/*Buttons*/}
                <div className="d-flex justify-content-end mt-4">
                    {/*<Button*/}
                    {/*    className="Btn-outline-blue Btn-standard"*/}
                    {/*    type="button"*/}
                    {/*    onClick={saveRegistration}*/}
                    {/*>*/}
                    {/*    { activeStep > 0 ? 'Save & Exit' : 'Cancel'}*/}
                    {/*</Button>*/}
                    <div className="d-flex justify-content-between">
                        {
                            activeStep !== 0 &&
                            <Button
                                className="Btn-blue Btn-standard mr-3 text-white"
                                onClick={handlePrev}
                                type="button"
                            >
                                Back
                            </Button>
                        }
                        {
                            activeStep !== 3 &&
                            <Button
                                className="Btn-blue Btn-standard text-white justify-content-end"
                                disabled={
                                    (activeStep === 0 && nameFormInValid) ||
                                    (activeStep === 1 && detailsFormInValid)
                                }
                                onClick={handleNext}
                                type="button"
                            >
                                Next
                            </Button>
                        }
                        {
                            activeStep === 3 &&
                            <Button
                                className="Btn-orange Btn-standard"
                                onClick={() => setPaymentInitiated(true)}
                                type="button"
                            >
                                Proceed to payment
                            </Button>
                        }
                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        businessRegistration: state.dashboard.businessRegistration
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showLoader: () => dispatch({type: APP.SHOW_LOADER}),
        hideLoader: () => dispatch({type: APP.HIDE_LOADER}),
        changeBusiness: (businessRegistration) => dispatch({type: DASHBOARD.CHANGE_BUSINESS_REGISTRATION, businessRegistration}),
        patchBusiness: (data) => dispatch({type: DASHBOARD.PATCH_BUSINESS_REGISTRATION, data}),
        patchUser: (data) => dispatch({type: AUTH.PATCH_USER, data})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(pure(BusinessRegistration)));
