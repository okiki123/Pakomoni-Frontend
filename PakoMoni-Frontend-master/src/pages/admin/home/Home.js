import React, {useEffect, useState} from "react";
import {pure} from "recompose";
import AdminLayout from "../../../layouts/admin/AdminLayout";
import InfoCard from "./info-card/InfoCard";
import RegisteredBusinessChart from "./charts/RegisteredBusinessChart";
import BankAccountsChart from "./charts/BankAccountsChart";
import APP from "../../../store/actions/app-actions";
import {connect} from "react-redux";
import {withSnackbar} from "notistack";
import AdminService from "../../../services/admin-service";
import DateRangePicker from "../../../components/date-range-picker/DateRangePicker";

const Home = ({history, showLoader, hideLoader, enqueueSnackbar}) => {
    useEffect(() => {
        getSummary();
    }, []);

    const [noOfRegisteredBusinesses, setNoOfRegisteredBusiness] = useState('-');
    const [noOfBankAccounts, setNoOfBankAccounts] = useState('-');
    const [noOfBusinesses, setNoOfBusiness] = useState('-');
    const [noOfOngoingRegisterations, setNoOfOngoingRegisterations] = useState('-');
    const [registeredBusinessData, setRegisteredBusinessData] = useState([]);
    const [bankAccountData, setBankAccountData] = useState([]);

    const getSummary = async (start = null, end = null) => {
        try {
            showLoader();
            const response = start && end ? await AdminService.getSummary(start, end) : await AdminService.getSummary();
            const data = response.data.data;
            setNoOfRegisteredBusiness(data.registered_businesses);
            setNoOfBankAccounts(data.bank_accounts);
            setNoOfBusiness(data.businesses);
            setNoOfOngoingRegisterations(data.ongoing_registrations);
            setRegisteredBusinessData(data.registered_businesses_data);
            setBankAccountData(data.bank_accounts_data);
            hideLoader();
        } catch (err) {
            enqueueSnackbar(err, {
                variant: 'error'
            });
            hideLoader();
        }
    }

    const handleSelectDateRange = (event, picker) => {
        getSummary(picker.startDate.toDate(), picker.endDate.toDate())
    }

    return (
        <AdminLayout history={history}>
            <div className="my-1 py-3 BusinessRegistration">
                <div className="d-md-flex justify-content-md-between align-items-center mb-4">
                    <div className="text-center text-md-left font-size-lg mb-2 mb-md-0 text-blue font-w600">
                        Overview
                    </div>
                    <div className="d-flex justify-content-center">
                        <DateRangePicker label="Duration" onApply={handleSelectDateRange} />
                    </div>
                </div>

                {/*Cards*/}
                <div className="d-flex justify-content-center flex-wrap flex-xl-nowrap mb-5">
                    <InfoCard
                        className="mx-sm-2"
                        title="No of Registered Business"
                        body={noOfRegisteredBusinesses}
                        color="orange"
                    />
                    <InfoCard
                        className="mx-sm-2"
                        title="No of Bank Accounts"
                        body={noOfBankAccounts}
                        color="darkBlue"
                    />
                    <InfoCard
                        className="mx-sm-2"
                        title="No of Business"
                        body={noOfBusinesses}
                        color="blue"
                    />
                    <InfoCard
                        className="mx-sm-2"
                        title="No of Ongoing Registration"
                        body={noOfOngoingRegisterations}
                        color="red"
                    />
                </div>

                {/*Charts*/}
                <div className="row mb-5">
                    <div className=" offset-lg-1 col-lg-10">
                        <RegisteredBusinessChart chartData={registeredBusinessData} />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className=" offset-lg-1 col-lg-10">
                        <BankAccountsChart chartData={bankAccountData} />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        showLoader: () => dispatch({type: APP.SHOW_LOADER}),
        hideLoader: () => dispatch({type: APP.HIDE_LOADER})
    }
}


export default connect(null, mapDispatchToProps)(withSnackbar(pure(Home)));
