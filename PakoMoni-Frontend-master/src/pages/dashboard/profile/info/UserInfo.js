import React, { Fragment, useEffect, useState } from "react";
import { pure } from "recompose";
import PropTypes from "prop-types";
import Button from "../../../../components/button/Button";
import BaseModal from "../../../../components/base-modal/BaseModal";
import EditProfileModal from "../modals/EditProfileModal";

const UserInfo = ({ profile, onEdit }) => {

    const [editUserModalOpened, setEditUserModalOpened] = useState(false);

    useEffect(() => {
    }, []);

    const Item = ({ label, value }) => {
        return (
            <div className="mb-3">
                <div className="mb-1 font-w600">{label}</div>
                <div>{value}</div>
            </div>
        );
    }

    const businessName = profile?.business?.[0]?.names?.[0] || '-';
    const RCNumber = profile.rc_number || '-';
    const TINNumber = profile.tin_number || '-';
    const address = profile.address || '';
    const data = {
        email_address: profile.email || '',
        business_name: businessName !== '-' ? businessName : '',
        rc_number: RCNumber !== '-' ? RCNumber : '',
        tin_number: TINNumber !== '-' ? TINNumber : '',
        address: address !== '-' ? address : '',
    }

    const handleEdit = (data) => {
        setEditUserModalOpened(false);
        onEdit(data);
    }

    return (
        <div className="row mx-0">
            <div className="col-md-6">
                <Item label="Business Name" value={businessName} />
                <Item label="Email address" value={profile.email} />
                <Item label="BN Number" value={RCNumber} />
                <Item label="TIN Number" value={TINNumber} />
            </div>
            <div className="col-md-6">
                <Item label="Address" value={address} />
            </div>
            <div className="col-md-6">
                <Button className="Btn-outline-orange text-dark font-w600" onClick={() => setEditUserModalOpened(true)}>Edit Profile</Button>
            </div>

            {/*Handler Modal*/}
            <BaseModal
                openState={editUserModalOpened}
                maxWidth="sm"
                fullWidth={true}
                onClose={() => setEditUserModalOpened(false)}
            >
                <EditProfileModal onAccept={handleEdit} data={data} onClose={() => setEditUserModalOpened(false)} />
            </BaseModal>
        </div>
    );
}

UserInfo.propTypes = {
    profile: PropTypes.any.isRequired,
    onEdit: PropTypes.func
};

export default (pure(UserInfo));
