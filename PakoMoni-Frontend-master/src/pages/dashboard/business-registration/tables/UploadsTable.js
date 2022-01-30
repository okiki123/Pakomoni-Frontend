import React, {Fragment, useEffect, useState} from "react";
import {pure} from "recompose";
import Table from "../../../../components/table/Table";
import Button from "../../../../components/button/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUpload} from "@fortawesome/free-solid-svg-icons";
import BaseModal from "../../../../components/base-modal/BaseModal";
import UploadsModal from "../modals/UploadsModal";
import dashboardService from "../../../../services/dashboard-services";
import APP from "../../../../store/actions/app-actions";
import DASHBOARD from "../../../../store/actions/dashboard-actions";
import {connect} from "react-redux";
import {withSnackbar} from "notistack";

const UploadsTable = ({businessRegistration, showLoader, hideLoader, patchBusiness, enqueueSnackbar}) => {
    const [modalOpened, setModalOpened] = useState(false);
    const [document, setDocument] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        const data = [
            {
                id: 1,
                key: 'means_of_identification',
                document: "Means of Identification",
                format: "PDF",
                status: businessRegistration.documents.means_of_identification ? "Uploaded" : "Pending"
            },
            {
                id: 2,
                key: 'signature',
                document: "Signature",
                format: "JPG/PNG",
                status: businessRegistration.documents.signature ? "Uploaded" : "Pending"
            },
            {
                id: 3,
                key: 'passport',
                document: "Passport Photograph",
                format: "PDF",
                status: businessRegistration.documents.passport ? "Uploaded" : "Pending"
            }
        ];
        setData(data);
    }, [businessRegistration])

    const handleClick = (row, index, column, id) => {
        setModalOpened(true);
        setDocument(row.key);
    };

    const handleUpload = async (file) => {
        try {
            showLoader();
            let response = await uploadFile(file);
            const documents = {...businessRegistration.documents, [document]: response.data.data};
            const data = {...businessRegistration, documents};
            await dashboardService.patchBusiness(data, businessRegistration._id);
            patchBusiness(data);
            setModalOpened(false);
            enqueueSnackbar('Business saved successfully!', {
                variant: 'success'
            });
            hideLoader();
        } catch (err) {
            enqueueSnackbar(err, {
                variant: 'error'
            });
            hideLoader();
        }
    }

    const uploadFile = async (file) => {
        return await dashboardService.uploadFile(file);
    }

    const Action = () => (<div className="text-center">Action</div>);

    const columns = [
        {
            name: 'Document',
            selector: 'document',
            sortable: false,
        },
        {
            name: 'Format',
            selector: 'format',
            sortable: false,
        },
        {
            name: 'Status',
            selector: 'status',
            sortable: false,
        },
        {
            name: <Action />,
            sortable: false,
            center: true,
            cell: (row, index, column, id) => {
                return (
                    <Fragment>
                        <Button className="Btn-dark-blue rounded-0 text-white btn-sm font-w200"
                                onClick={(e) => handleClick(row, index, column, id)}
                        >
                            Upload
                            <FontAwesomeIcon icon={faUpload} className="ml-2" />
                        </Button>
                    </Fragment>
                );
            }
        },
    ];

    return (
        <Fragment>
            <Table columns={columns} data={data} pagination={false} />
            <BaseModal openState={modalOpened} onOpen={() => {}}>
                <UploadsModal onClose={() => setModalOpened(false)} onUpload={handleUpload} />
            </BaseModal>
        </Fragment>
    );
};

const mapStateToProps = state => {
    return {
        businessRegistration: state.dashboard.businessRegistration
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showLoader: () => dispatch({type: APP.SHOW_LOADER}),
        hideLoader: () => dispatch({type: APP.HIDE_LOADER}),
        patchBusiness: (data) => dispatch({type: DASHBOARD.PATCH_BUSINESS_REGISTRATION, data})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(pure(UploadsTable)));
