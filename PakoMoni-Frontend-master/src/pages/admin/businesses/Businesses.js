import React from "react";
import {pure} from "recompose";
import AdminLayout from "../../../layouts/admin/AdminLayout";
import Select from "../../../components/select/Select";
import BusinessesTable from "./tables/BusinessesTable";

const Businesses = () => {
    return (
        <AdminLayout>
            <div className="my-1 py-3 BusinessRegistration">
                <div className="d-md-flex justify-content-md-between align-items-center mb-4">
                    <div className="text-center text-md-left font-size-lg mb-2 mb-md-0 text-blue font-w600">
                        Businesses
                    </div>
                    <div className="d-flex justify-content-center">
                        <Select
                            name="filter"
                            className="bg-white input-width-150"
                            placeholder="Filter by"
                            options={[{label: "Filter", value: "filter"}]}
                        />
                    </div>
                </div>

                <BusinessesTable />
            </div>
        </AdminLayout>
    );
}


export default pure(Businesses);
