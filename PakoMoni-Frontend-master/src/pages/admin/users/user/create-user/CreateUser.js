import React from "react";
import {pure} from "recompose";
import AdminLayout from "../../../../../layouts/admin/AdminLayout";
import UserForm from "../forms/UserForm";

const CreateUser = ({history}) => {
    return (
        <AdminLayout history={history}>
            <div className="my-1 py-3 BusinessRegistration">
                <div className="mb-4">
                    <div className="font-size-xl mb-2 mb-md-0 font-w600">
                        Add New User
                    </div>
                    <div>
                        Kindly Provide the user details below
                    </div>
                </div>

                <UserForm edit={false} />
            </div>
        </AdminLayout>
    );
}


export default pure(CreateUser);
