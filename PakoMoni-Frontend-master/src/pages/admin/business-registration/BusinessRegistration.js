import React, {useEffect, useState} from "react";
import {pure} from "recompose";
import AdminLayout from "../../../layouts/admin/AdminLayout";
import Button from "../../../components/button/Button";
import Status from "./status/Status";
import Panel from "../../../components/panel/Panel";
import StatusUpdateForm from "./forms/StatusUpdateForm";
import {bankAccount, businessDetails, progress, proposedNames, proprietors} from "./data/data";
import BaseModal from "../../../components/base-modal/BaseModal";
import DownloadingModal from "./modals/DownloadingModal";
import HandlerModal from "./modals/HandlerModal";
import ProgressLog from "./progress-log/ProgressLog";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment"
import APP from "../../../store/actions/app-actions";
import ADMIN from "../../../store/actions/admin-actions";
import adminServices from "../../../services/admin-service";
import {useSnackbar} from "notistack";
import { useParams } from "react-router-dom";
import DashboardService from "../../../services/dashboard-services";
import _ from "lodash";
import dashboardService from "../../../services/dashboard-services";

const BusinessRegistration = ({history}) => {
    const businessRegistration = useSelector(state => state.admin.businessRegistration);
    const dispatch = useDispatch();
    const showLoader = () => dispatch({type: APP.SHOW_LOADER});
    const hideLoader = () => dispatch({type: APP.HIDE_LOADER});
    const changeBusiness = (businessRegistration) => dispatch({type: ADMIN.CHANGE_BUSINESS_REGISTRATION, businessRegistration});
    const patchBusiness = (data) => dispatch({type: ADMIN.PATCH_BUSINESS_REGISTRATION, data});
    const { enqueueSnackbar } = useSnackbar();

    const params = useParams();

    const [status, setStatus] = useState("progress");
    const [statusText, setStatusText] = useState("Name Reservation in-progress");
    const [downloadModalOpened, setDownloadModalOpened] = useState(false);
    const [handlerModalOpened, setHandlerModalOpened] = useState(false);
    const [progress, setProgress] = useState([]);
    const [handlers, setHandlers] = useState([]);

    const date = moment(businessRegistration.updated_at).format('D MMMM YYYY');
    const handler = businessRegistration.handler?.full_name || '';
    const proposedNames = businessRegistration.names || [];
    const commencementDate = moment(businessRegistration.commencementdate).format('D MMMM YYYY');
    const proprietors = businessRegistration.proprietors || [];

    useEffect( () => {
        setup(params);
        getHandlers();
    }, []);

    useEffect(() => {
        const sortedProgress = _.orderBy(progress, ['updated_at'], ['desc']);
        setProgress(prevState => {
            return JSON.stringify(prevState) !== JSON.stringify(sortedProgress) ? sortedProgress : prevState;
        })
    }, [progress])

    const setup = async (params) => {
        try {
            let id = businessRegistration?._id;
            if (!id) {
                id = await getBusinessRegistration(params.id);
            }
            getProgress(id);
        } catch (e) {
            console.log(e);
        }
    }

    const getBusinessRegistration = async (id) => {
        try {
            showLoader();
            let {data: {data}} = await DashboardService.getBusiness(id);
            changeBusiness(data);
            hideLoader();
            return data._id;
        } catch (err) {
            enqueueSnackbar(err, {
                variant: 'error'
            });
            hideLoader();
        }
    }

    const getProgress = async (id) => {
        try {
            showLoader();
            let {data: {data}} = await adminServices.getBusinessProgress(id);
            data = data.map(item => {
                return {...item, entity: item.name, status: item.type.toLowerCase(), date: moment(item.updated_at).fromNow()}
            })
            setProgress(prevState => data);
            hideLoader();
        } catch (err) {
            enqueueSnackbar(err, {
                variant: 'error'
            });
            hideLoader();
        }
    }

    const getHandlers = async () => {
        try {
            showLoader();
            const response = await adminServices.getUsers({role: 'Handler'});
            setHandlers(response.data.data);
            hideLoader();
        } catch (err) {
            enqueueSnackbar(err, {
                variant: 'error'
            });
            hideLoader();
        }
    }

    const handleStatusUpdate = () => {
        getProgress(businessRegistration._id);
        enqueueSnackbar('Status updated successfully', {
            variant: 'success'
        });
    };

    const handleAssignHandler = async (handler) => {
        try {
            showLoader();
            const data = {...businessRegistration, handler: handler};
            const handlerName = handlers.find(item => item._id === handler)?.full_name
            data.statuses = data.statuses.map(item => item._id);
            data.owner = data.owner._id;
            await dashboardService.patchBusiness(data, businessRegistration._id);
            patchBusiness({handler: {full_name: handlerName}})
            enqueueSnackbar('Handler Assigned Successfully!', {
                variant: 'success'
            });
        } catch (err) {
            enqueueSnackbar(err, {
                variant: 'error'
            });
        }
        hideLoader();
        setHandlerModalOpened(false);
    }

    return (
        <AdminLayout headerType="blue" history={history}>
            <div className="BusinessRegistration bg-white">
                {/*Header*/}
                <div className="mt-1 mb-2 py-3 BusinessRegistration">
                    <div className="d-xl-flex justify-content-lg-between align-items-center mb-4">
                        <div>
                            <div className="d-md-flex mb-2 mb-md-0">
                                <div className="text-left text-md-center mr-3 text-md-left font-size-lg mb-2 mb-md-0 text-blue font-w600">
                                    Business Registration / PakoMoni
                                </div>
                                <div>
                                    <Status progress={progress} />
                                </div>
                            </div>
                            <div>
                                Submitted: {date} | Handler: {handler}
                            </div>
                        </div>

                        <div className="d-flex mt-2 mt-xl-0">
                            <Button className="Btn-outline-blue font-w100" onClick={() => setDownloadModalOpened(true)}>
                                Download
                            </Button>
                            <Button className="btn-secondary mx-2 font-w100" onClick={() => setHandlerModalOpened(true)}>
                                Assign to handler
                            </Button>
                        </div>
                    </div>
                </div>

                {/*Status updates and progress Logs*/}
                <div className="row mx-0 mb-5">

                    {/*Status Update*/}
                    <div className="col-lg-7 pl-lg-0 px-0 pr-lg-2 mb-3 mb-lg-0">
                        <Panel title="Status Update" className="h-100">
                            <StatusUpdateForm id={businessRegistration._id} onUpdate={handleStatusUpdate} progress={progress} />
                        </Panel>
                    </div>

                    {/*Progress*/}
                    <div className="col-lg-5 pr-lg-0 px-0 pl-lg-2">
                        <Panel title="Progress Logs" className="h-100 progress-log">
                            {
                                progress.map((item, index) => {
                                    return (
                                            <ProgressLog
                                                key={index}
                                                status={item.status}
                                                text={item.text}
                                                date={item.date}
                                                entity={item.entity}
                                                className="mb-2"
                                            />
                                        )
                                })
                            }
                        </Panel>
                    </div>
                </div>

                {/*Proposed Names*/}
                <Panel title="Proposed Names" className="mt-3 mb-5">
                    <ul className="list-group">
                        {
                            proposedNames.map((item, index) => {
                                return (
                                    <li className="list-group-item" key={index}>
                                        <div className="row">
                                            <div className="col-md-4 col-6">
                                                Option {index + 1}
                                            </div>
                                            <div className="col-md-8 col-6">
                                                {item}
                                            </div>
                                        </div>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </Panel>

                {/*Business Details*/}
                <Panel title="Business Details" className="mt-3 mb-5">
                    <ul className="list-group">
                        {/*Address*/}
                        <li className="list-group-item">
                            <div className="row">
                                <div className="col-md-4 col-6">Address</div>
                                <div className="col-md-8 col-6">
                                    {
                                        `
                                            ${businessRegistration?.address?.number || ''}
                                            ${businessRegistration?.address?.street || ''}
                                            ${businessRegistration.address?.lga || ''}
                                            ${businessRegistration.address?.state || ''}
                                        `
                                    }
                                </div>
                            </div>
                        </li>
                        {/*Commencement Date*/}
                        <li className="list-group-item">
                            <div className="row">
                                <div className="col-md-4 col-6">Business Commencement Date</div>
                                <div className="col-md-8 col-6">
                                    {commencementDate}
                                </div>
                            </div>
                        </li>
                        {/*Category*/}
                        <li className="list-group-item">
                            <div className="row">
                                <div className="col-md-4 col-6">Category</div>
                                <div className="col-md-8 col-6">
                                    {businessRegistration.category}
                                </div>
                            </div>
                        </li>
                        {/*SubCategory*/}
                        <li className="list-group-item">
                            <div className="row">
                                <div className="col-md-4 col-6">SubCategory</div>
                                <div className="col-md-8 col-6">
                                    {businessRegistration.subcategory}
                                </div>
                            </div>
                        </li>
                        {/*Description*/}
                        <li className="list-group-item">
                            <div className="row">
                                <div className="col-md-4 col-6">Description</div>
                                <div className="col-md-8 col-6">
                                    {businessRegistration.description}
                                </div>
                            </div>
                        </li>
                    </ul>
                </Panel>

                {/*/!*Proprietors*!/*/}
                {/*{*/}
                {/*    proprietors.map((proprietor, index) => {*/}
                {/*        return  (*/}
                {/*            <Panel title={`Proprietor ${index + 1}`} className="mt-3" key={index}>*/}
                {/*                <ul className="list-group">*/}
                {/*                    <li className="list-group-item">*/}
                {/*                        <div className="row">*/}
                {/*                            <div className="col-md-4 col-6">*/}
                {/*                                Name*/}
                {/*                            </div>*/}
                {/*                            <div className="col-md-8 col-6">*/}
                {/*                                {proprietor.full_name}*/}
                {/*                            </div>*/}
                {/*                        </div>*/}
                {/*                    </li>*/}
                {/*                    <li className="list-group-item">*/}
                {/*                        <div className="row">*/}
                {/*                            <div className="col-md-4 col-6">*/}
                {/*                                Email*/}
                {/*                            </div>*/}
                {/*                            <div className="col-md-8 col-6">*/}
                {/*                                {proprietor.email}*/}
                {/*                            </div>*/}
                {/*                        </div>*/}
                {/*                    </li>*/}
                {/*                    <li className="list-group-item">*/}
                {/*                        <div className="row">*/}
                {/*                            <div className="col-md-4 col-6">*/}
                {/*                                Phone Number*/}
                {/*                            </div>*/}
                {/*                            <div className="col-md-8 col-6">*/}
                {/*                                {proprietor.phone}*/}
                {/*                            </div>*/}
                {/*                        </div>*/}
                {/*                    </li>*/}
                {/*                </ul>*/}
                {/*            </Panel>*/}
                {/*        )*/}
                {/*    })*/}
                {/*}*/}

                {/*Bank Account*/}
                <Panel title="Bank Account" className="my-5">
                    <ul className="list-group">
                        {
                            bankAccount.map(item => {
                                return (
                                    <li className="list-group-item">
                                        <div className="row">
                                            <div className="col-md-4 col-6">
                                                {item.name}
                                            </div>
                                            <div className="col-md-8 col-6">
                                                {item.value}
                                            </div>
                                        </div>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </Panel>

                <div className="pb-5">
                    <div>
                        Comments: <span className="badge badge-primary">0</span>
                    </div>
                    <div className="mt-2">
                        <Button className="btn-success btn-sm">Add Comment</Button>
                    </div>
                </div>

                {/*Download Modal*/}
                <BaseModal
                    openState={downloadModalOpened}
                    maxWidth="sm"
                    fullWidth={true}
                    onClose={() => setDownloadModalOpened(false)}
                >
                    <DownloadingModal onClose={() => setDownloadModalOpened(false)} />
                </BaseModal>

                {/*Handler Modal*/}
                <BaseModal
                    openState={handlerModalOpened}
                    maxWidth="sm"
                    fullWidth={true}
                    onClose={() => setHandlerModalOpened(false)}
                >
                    <HandlerModal handlers={handlers} onAccept={handleAssignHandler} />
                </BaseModal>
            </div>
        </AdminLayout>
    );
}

export default (pure(BusinessRegistration));
