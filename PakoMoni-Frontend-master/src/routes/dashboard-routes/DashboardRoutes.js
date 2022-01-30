import React, {Fragment} from "react";
import { pure } from "recompose";
import GuardedRoute from "../guraded-route/GuardedRoute";
import Home from "../../pages/dashboard/home/Home";
import BusinessRegistration from "../../pages/dashboard/business-registration/BusinessRegistration";
import BankAccount from "../../pages/dashboard/bank-account/BankAccount";
import Profile from "../../pages/dashboard/profile/Profile";

const DashboardRoutes = ({user}) => {
    return (
        <Fragment>
            {/*<GuardedRoute path="/dashboard" component={Home} redirect="/login" condition={user} exact />*/}
            {/*<GuardedRoute path="/dashboard/business-registration" redirect="/login" condition={user} component={BusinessRegistration} exact />*/}
            {/*<GuardedRoute path="/dashboard/bank-account" redirect="/login" condition={user} component={BankAccount} exact />*/}

            {
                user ?
                    <Fragment>
                        <GuardedRoute path="/dashboard" component={Home} redirect="/admin" condition={!user.Admin} exact />
                        <GuardedRoute path="/dashboard/business-registration" redirect="/admin" condition={!user.Admin} component={BusinessRegistration} exact />
                        <GuardedRoute path="/dashboard/bank-account" redirect="/admin" condition={!user.Admin} component={BankAccount} exact />
                        <GuardedRoute path="/dashboard/profile" redirect="/admin" condition={!user.Admin} component={Profile} exact />
                    </Fragment>
                    :
                    <Fragment>
                        <GuardedRoute path="/dashboard" component={Home} redirect="/login" condition={user} exact />
                        <GuardedRoute path="/dashboard/business-registration" redirect="/login" condition={user} component={BusinessRegistration} exact />
                        <GuardedRoute path="/dashboard/bank-account" redirect="/login" condition={user} component={BankAccount} exact />
                        <GuardedRoute path="/dashboard/profile" redirect="/login" condition={user} component={Profile} exact />
                    </Fragment>
            }
        </Fragment>
    )
}

export default pure(DashboardRoutes);
