import React, {Fragment, useEffect, useState} from "react";
import {pure} from "recompose";
import DashboardLayout from "../../../layouts/dashboard/DashboardLayout";
import APP from "../../../store/actions/app-actions";
import AUTH from "../../../store/actions/auth-actions";
import DASHBOARD from "../../../store/actions/dashboard-actions";
import userService from "../../../services/user-service";
import {useDispatch, useSelector} from "react-redux";
import {useSnackbar} from "notistack";
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import CustomTab from "../../../components/tabs/Tabs";
import Panel from "../../../components/panel/Panel";
import UserInfo from "./info/UserInfo";

const Profile = ({history}) => {

    const user = useSelector(state => state.auth.user);
    const profile = useSelector(state => state.dashboard.profile);
    const dispatch = useDispatch();
    const showLoader = () => dispatch({type: APP.SHOW_LOADER});
    const hideLoader = () => dispatch({type: APP.HIDE_LOADER});
    const changeProfile = (profile) => dispatch({type: DASHBOARD.CHANGE_PROFILE, profile});
    const patchProfile = (data) => dispatch({type: DASHBOARD.PATCH_PROFILE, data});
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        getUser();
    }, [])

    const getUser = async () => {
        try {
            showLoader();
            const {data: {data}} = await userService.getUser(user._id);
            changeProfile(data);
            hideLoader();
        } catch (err) {
            enqueueSnackbar(err, {
                variant: 'error'
            });
            hideLoader();
        }
    }

    const handleEdit = (data) => {
        console.log(data);
    }

    const tabs = ['Profile', 'Registration Documents'];
    const tabsContent = [<UserInfo onEdit={handleEdit} profile={profile} />, 'Registration Documents'];

    return (
        <DashboardLayout title="My Account" history={history}>
            <div className="my-2 py-3 Profile">
                <div className="Profile__header d-flex align-items-center flex-column mb-3">
                    <div><AccountCircleRoundedIcon className="Profile__header-icon" /></div>
                    <div className="font-size-xxl font-w900 text-dark-blue">{profile.full_name}</div>
                </div>

                <Panel>
                    <CustomTab tabs={tabs} tabsContent={tabsContent}/>
                </Panel>
            </div>
        </DashboardLayout>
    );
}

export default (pure(Profile));
