import React, {Fragment} from "react";
import { pure } from "recompose";
import GuardedRoute from "../guraded-route/GuardedRoute";
import AdminHome from "../../pages/admin/home/Home";
import AdminLogin from "../../pages/admin/login/Login"
import BusinessRegistrations from "../../pages/admin/business-registrations/BusinessRegistrations";
import User from "../../pages/admin/users/user/User";
import Users from "../../pages/admin/users/Users";
import CreateUser from "../../pages/admin/users/user/create-user/CreateUser";
import EditUser from "../../pages/admin/users/user/edit-user/EditUser";

const AdminRoutes = ({user}) => {
    return (
        <Fragment>
            {
                user ?
                    <Fragment>
                        <GuardedRoute path="/admin" component={AdminHome} redirect="/dashboard" condition={user.Admin} exact />
                        <GuardedRoute path="/admin/login" redirect="/admin" condition={false} component={AdminLogin} exact />
                        <GuardedRoute path="/admin/business-registrations" redirect="/dashboard" component={BusinessRegistrations} condition={user.Admin} exact />
                        <GuardedRoute path="/admin/user/create" component={CreateUser} redirect="/dashboard" condition={user.Admin} exact />
                        <GuardedRoute path="/admin/user/:id(\w{24})" component={User} redirect="/dashboard" condition={user.Admin} exact />
                        <GuardedRoute path="/admin/users" component={Users} redirect="/dashboard" condition={user.Admin} exact />
                        <GuardedRoute path="/admin/user/update/:id" component={EditUser} redirect="/dashboard" condition={user.Admin} exact />
                    </Fragment>
                    :
                    <Fragment>
                        <GuardedRoute path="/admin" component={AdminHome} redirect="/admin/login" condition={user} exact />
                        <GuardedRoute path="/admin/login" redirect="/admin" condition={true} component={AdminLogin} exact />
                        <GuardedRoute path="/admin/business-registrations" redirect="/admin/login" component={BusinessRegistrations} condition={user} exact />
                        <GuardedRoute path="/admin/user/create" component={CreateUser} redirect="/admin/login" condition={user} exact />
                        <GuardedRoute path="/admin/user/:id(\w{24})" component={User} redirect="/admin/login" condition={user} exact />
                        <GuardedRoute path="/admin/users" component={Users} redirect="/admin/login" condition={user} exact />
                        <GuardedRoute path="/admin/user/update/:id" component={EditUser} redirect="/admin/login" condition={user} exact />
                    </Fragment>
            }
        </Fragment>
    )
}

export default pure(AdminRoutes);
