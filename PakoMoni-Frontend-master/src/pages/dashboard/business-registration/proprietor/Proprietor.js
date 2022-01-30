import React, {Fragment, useEffect, useState} from "react";
import {pure} from "recompose";
import Panel from "../../../../components/panel/Panel";
import Radio from "@material-ui/core/Radio";
import Button from "../../../../components/button/Button";
import ProprietorForm from "./forms/ProprietorForm";
import ProprietorTable from "./tables/ProprietorTable";
import APP from "../../../../store/actions/app-actions";
import DASHBOARD from "../../../../store/actions/dashboard-actions";
import {connect} from "react-redux";
import {withSnackbar} from "notistack";
import dashboardService from "../../../../services/dashboard-services";

const Proprietor = ({className, businessRegistration, user, showLoader, hideLoader, enqueueSnackbar, patchBusiness}) => {
    const [openedRadio, setOpenedRadio] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [localProprietors, setLocalProprietors] = useState([]);
    const [showRadio, setShowRadio] = useState(true);

    useEffect(() => {
        const proprietors = businessRegistration.proprietors || [];
        setLocalProprietors(proprietors)
        const userIsProprietor = proprietors.some(item => item.email === user.email);
        setShowRadio(!userIsProprietor);
    }, [businessRegistration]);

    const handleClickRadio = () => {
        setOpenedRadio(!openedRadio);
        if (!openedRadio) {
            const proprietor = {
                full_name: user.full_name,
                email: user.email,
                phone: user.phone || '',
                address: user.address || ''
            };

            handleAddProprietor(proprietor);
        }
    }

    const handleClick = () => {
        setShowForm(true);
    }

    const handleAddProprietor = async (proprietor) => {
        try {
            showLoader();
            const proprietors = businessRegistration.proprietors ?
                [...businessRegistration.proprietors, proprietor] :
                [proprietor]
            const data = {...businessRegistration, proprietors};
            await dashboardService.patchBusiness(data, businessRegistration._id);
            patchBusiness(data);
            enqueueSnackbar('Business saved successfully!', {
                variant: 'success'
            });
            hideLoader();
        } catch (err) {
            enqueueSnackbar(err, {
                variant: 'error'
            });
            hideLoader();
        }
        setShowForm(false);
    }

    const handleHideProprietor = () => {
        setShowForm(false);
    }

    return (
        <Panel title="Business Details" className={`mt-4 ${className}`}>
            <div className="text-muted mb-3 font-size-lg">Please enter proprietor details for this business</div>

            <div className="d-flex align-items-center mb-3">
                {
                    showRadio &&
                        <Fragment>
                            <Radio
                                checked={openedRadio}
                                onClick={handleClickRadio}
                                value="a"
                                color="primary"
                                name="radio-button-demo"
                                inputProps={{ 'aria-label': 'A' }}
                                className="mr-2"
                            />
                            <div>I am a proprietor to this business</div>
                        </Fragment>
                }
            </div>

            { !!localProprietors.length && <ProprietorTable data={localProprietors} /> }

            { !showForm && <Button onClick={handleClick} className="Btn-dark-blue Btn-standard text-white mt-3">Add New Proprietor</Button> }

            { showForm && <ProprietorForm onAdd={handleAddProprietor} onCancel={handleHideProprietor} /> }

        </Panel>
    );
};

const mapStateToProps = state => {
    return {
        businessRegistration: state.dashboard.businessRegistration,
        user: state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showLoader: () => dispatch({type: APP.SHOW_LOADER}),
        hideLoader: () => dispatch({type: APP.HIDE_LOADER}),
        patchBusiness: (data) => dispatch({type: DASHBOARD.PATCH_BUSINESS_REGISTRATION, data})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(pure(Proprietor)));
