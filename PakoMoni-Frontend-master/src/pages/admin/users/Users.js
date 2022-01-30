import React, {useEffect} from "react";
import {pure} from "recompose";
import AdminLayout from "../../../layouts/admin/AdminLayout";
import Select from "../../../components/select/Select";
import UsersTable from "./tables/UsersTable";
import Button from "../../../components/button/Button";
import APP from "../../../store/actions/app-actions";
import ADMIN from "../../../store/actions/admin-actions";
import {connect} from "react-redux";
import {withSnackbar} from "notistack";
import adminServices from "../../../services/admin-service";
import Filter from "../../../components/filter/Filter";

const Users = ({history, showLoader, hideLoader, enqueueSnackbar, users, changeUsers, changeUser}) => {
    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async (query = {}) => {
        try {
            showLoader();
            const response = await adminServices.getUsers(query);
            changeUsers(response.data.data);
            hideLoader();
        } catch (err) {
            enqueueSnackbar(err, {
                variant: 'error'
            });
            hideLoader();
        }
    }

    const filterOptions = [
        {
            name: 'role',
            label: 'Role',
            type: 'select',
            options: [
                {label: 'Handler', value: 'Handler'},
                {label: 'Admin', value: 'Admin'},
            ]
        }
    ];

    return (
        <AdminLayout history={history}>
            <div className="my-1 py-3 BusinessRegistration">
                <div className="d-md-flex justify-content-md-between align-items-center mb-3 mb-md-4">
                    <div className="text-center d-flex justify-content-center text-md-left font-size-lg mb-3 mb-md-0 text-blue font-w600">
                        <div className="mr-3">Users</div>
                        <Button className="btn-sm Btn-blue text-white" link="/admin/user/create">Add User</Button>
                    </div>
                    <div className="d-flex justify-content-center">
                        <Filter filterOptions={filterOptions} onFilter={getUsers} />
                    </div>
                </div>

                <UsersTable data={users} onSelect={changeUser} />
            </div>
        </AdminLayout>
    );
}

const mapStateToProps = state => {
    return {
        users: state.admin.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showLoader: () => dispatch({type: APP.SHOW_LOADER}),
        hideLoader: () => dispatch({type: APP.HIDE_LOADER}),
        changeUsers: (users) => dispatch({type: ADMIN.CHANGE_USERS, users}),
        changeUser: (user) => dispatch({type: ADMIN.CHANGE_USER, user}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(pure(Users)));
