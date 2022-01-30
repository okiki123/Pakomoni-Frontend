import React, {useEffect, useState} from "react";
import {pure} from "recompose";
import AdminLayout from "../../../layouts/admin/AdminLayout";
import BusinessRegistrationsTable from "./tables/BusinessRegistrationsTable";
import APP from "../../../store/actions/app-actions";
import ADMIN from "../../../store/actions/admin-actions";
import {connect} from "react-redux";
import {withSnackbar} from "notistack";
import adminServices from "../../../services/admin-service";
import Filter from "../../../components/filter/Filter";
import StaticService from "../../../services/static-service";

const BusinessRegistrations = ({history, showLoader, hideLoader, enqueueSnackbar, changeBusinesses, changeBusiness, businessRegistrations = []}) => {

    const [filterOptions, setFilterOptions] = useState([]);

    useEffect(() => {
        getBusinesses();
        getFilters();
    }, []);

    const getBusinesses = async (query = {}) => {
        try {
            showLoader();
            const response = await adminServices.getBusinesses(query);
            changeBusinesses(response.data.data);
            hideLoader();
        } catch (err) {
            enqueueSnackbar(err, {
                variant: 'error'
            });
            hideLoader();
        }
    }

    const getFilters = async () => {
        const categories = await StaticService.getCategories();
        const filters = [
            {
                name: 'category',
                label: 'Category',
                type: 'select',
                options: categories
            },
            {
                name: 'status',
                label: 'Status',
                type: 'text'
            },
            {
                name: 'date',
                label: 'Date',
                type: 'date_range'
            },
        ]
        setFilterOptions(prevState => filters);
    };

    return (
        <AdminLayout history={history}>
            <div className="my-1 py-3 BusinessRegistration">
                <div className="d-md-flex justify-content-md-between align-items-center mb-4">
                    <div className="text-center text-md-left font-size-lg mb-2 mb-md-0 text-blue font-w600">
                        Business Registrations
                    </div>
                    <div className="d-flex justify-content-center">
                        <Filter filterOptions={filterOptions} onFilter={getBusinesses} />
                    </div>
                </div>

                <BusinessRegistrationsTable data={businessRegistrations} changeBusinessRegistration={changeBusiness} />
            </div>
        </AdminLayout>
    );
}

const mapStateToProps = state => {
    return {
        businessRegistrations: state.admin.businessRegistrations
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showLoader: () => dispatch({type: APP.SHOW_LOADER}),
        hideLoader: () => dispatch({type: APP.HIDE_LOADER}),
        changeBusinesses: (businessRegistrations) => dispatch({type: ADMIN.CHANGE_BUSINESS_REGISTRATIONS, businessRegistrations}),
        changeBusiness: (businessRegistration) => dispatch({type: ADMIN.CHANGE_BUSINESS_REGISTRATION, businessRegistration}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(pure(BusinessRegistrations)));

