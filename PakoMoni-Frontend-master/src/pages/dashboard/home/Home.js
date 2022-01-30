import React, {Fragment, useEffect, useState} from "react";
import { pure } from "recompose";
import ActionCard from "./action-card/ActionCard";
import documentBlue from "../../../assets/images/icons/document.svg";
import documentBlack from "../../../assets/images/icons/document__black.svg";
import DashboardLayout from "../../../layouts/dashboard/DashboardLayout";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import CircularProgressWithLabel from "../../../components/circular-progress-with-label/ProgressBarWithLabel";
import BaseModal from "../../../components/base-modal/BaseModal";
import WelcomeModal from "./modals/WelcomeModal";
import {connect} from "react-redux";
import APP from "../../../store/actions/app-actions";
import AUTH from "../../../store/actions/auth-actions";
import UserService from "../../../services/user-service";
import storageService from "../../../services/storage-service";
import {withSnackbar} from "notistack";
import CheckBoxRoundedIcon from '@material-ui/icons/CheckBoxRounded';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';

const EntityStatus = ({condition}) => {
    return (
        <Fragment>
            {
                condition ?
                    <CheckBoxRoundedIcon color="primary" className="mr-3" /> :
                    <IndeterminateCheckBoxIcon color="disabled" className="mr-3" />
            }
        </Fragment>
    );
};

const Home = ({history, user, showLoader, hideLoader, patchUser, enqueueSnackbar, businessRegistration: business}) => {
    const [modalOpened, setModalOpened] = useState(false);
    const [haveRegisteredBusiness, setHaveRegisteredBusiness] = useState(false);
    const [businessRegistration, setBusinessRegistration] = useState(null);

    useEffect(() => {
        if (!user.answer_business_question) {
            setModalOpened(true)
        }
        setBusinessRegistration(business);
    }, [business]);

    const handleClosed = () => setModalOpened(false);

    const handleModalAccept = async (e) => {
        showLoader();
        try {
            const data = {has_business: e, answer_business_question: true};
            await UserService.patchUser(data);
            setModalOpened(false);
            setHaveRegisteredBusiness(e);
            const user = await storageService.getItem('user');
            storageService.setItem('user', {...user, ...data})
            patchUser(data);
            hideLoader();
        } catch (e) {
            enqueueSnackbar(e, {
                variant: 'error'
            });
            hideLoader();
        }
    }

    return (
        <DashboardLayout title="Home" history={history}>
            <div className="my-5 Home container">
                <div className="text-center mb-5">
                    <div className="text-dark-blue mb-1 font-size-lg font-weight-bold">
                        Welcome {user.full_name}
                    </div>
                    <div className="text-muted">
                        Here is an overview of your business status
                    </div>
                </div>

                <div className="d-lg-flex justify-content-lg-center mb-5 pb-lg-5">
                    {
                        !haveRegisteredBusiness &&
                        <ActionCard
                            className="mx-auto mx-lg-3 mb-3"
                            icon={documentBlack}
                            activeIcon={documentBlue}
                            label="Register Business"
                            showButton={!(user?.business_ids?.length)}
                            showStatus={!!(user?.business_ids?.length)}
                            statusText="In progress"
                            link="/dashboard/business-registration"
                        />

                    }

                    <ActionCard
                        className="mx-auto mx-lg-3 mb-3"
                        icon={documentBlack}
                        activeIcon={documentBlue}
                        label="Get TIN Number"
                        disabled={!haveRegisteredBusiness}
                        showButton={haveRegisteredBusiness}
                    />

                    <ActionCard
                        className="mx-auto mx-lg-3 mb-3"
                        icon={documentBlack}
                        activeIcon={documentBlue}
                        label="Open Bank Account"
                        disabled={!haveRegisteredBusiness}
                        showButton={haveRegisteredBusiness}
                        link="/dashboard/bank-account"
                        statusText="Completed"
                        showStatus={!!(user?.bank_ids?.length)}
                    />
                </div>

                <div className="row mx-0 justify-content-center Home__information">
                    <div className="col-lg-6 px-0 mb-4">
                        <div className="mb-4 font-size-lg font-w600 text-muted text-center text-lg-left">
                            Your business Information
                        </div>

                        <Accordion className="bg-white">
                            <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                                <Typography>
                                    <EntityStatus condition={user?.business_ids?.length} />
                                    <span className="text-muted">Business Registration Number</span>
                                </Typography>
                            </AccordionSummary>
                        </Accordion>

                        <Accordion>
                            <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                                <Typography>
                                    <EntityStatus condition={user?.bank_ids?.length} />
                                    <span className="text-muted">Bank Account</span>
                                </Typography>
                            </AccordionSummary>
                        </Accordion>

                        <Accordion>
                            <AccordionSummary id="panel1a-header">
                                <Typography>
                                    <EntityStatus condition={false} />
                                    <span className="text-muted">Tax Identification Number (TIN)</span>
                                </Typography>
                            </AccordionSummary>
                        </Accordion>

                    </div>

                    {/*Business Score*/}
                    <div className="col-lg-6 px-0 mb-4">
                        <div className="d-lg-flex align-items-lg-center flex-column">
                            <div className="mb-4 font-size-lg text-muted font-w600 mb-3 text-center text-lg-left">
                                Your business score
                            </div>
                            <div className="text-center">
                                <CircularProgressWithLabel
                                    label={<div className="text-center px-4 font-size-xs"><span className="font-size-xxl font-w600">980</span><br />points away from your first loan</div>}
                                    value={25}
                                    size={150}
                                    thickness={6} />
                            </div>
                        </div>
                    </div>

                </div>

                {/*First Time Modal*/}
                <BaseModal openState={modalOpened}>
                    <WelcomeModal onClose={() => setModalOpened(false)} onAccept={handleModalAccept} />
                </BaseModal>

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
        changeUser: (user) => dispatch({type: AUTH.CHANGE_USER, user}),
        patchUser: (data) => dispatch({type: AUTH.PATCH_USER, data})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(pure(Home)));
