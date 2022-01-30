import React from "react";
import {pure} from "recompose";
import AdminLayout from "../../../../layouts/admin/AdminLayout";

const Business = ({history}) => {
    return (
        <AdminLayout history={history}>
            <div className="my-1 py-3 BusinessRegistration">
                <div className="d-md-flex justify-content-md-between align-items-center mb-4">
                    <div className="text-center text-md-left font-size-lg mb-2 mb-md-0 text-blue font-w600">
                        Business - PakoMoni
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}


export default pure(Business);
