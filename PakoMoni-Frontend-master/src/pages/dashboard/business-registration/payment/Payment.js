import React, {useEffect, useState} from "react";
import { pure } from "recompose";
import PropTypes from "prop-types";
import PaymentCard from "./payment-card/PaymentCard";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import Accordion from "@material-ui/core/Accordion";
import {makeStyles} from "@material-ui/core";
import {appConfig} from "../../../../config/app-config";
import {usePaystackPayment} from "react-paystack";
import Utils from "../../../../helpers/utils";

const Payment = ({paymentInitiated, user, onDone, onCancel}) => {
    const [fullPayment, setPartPayment] = useState(true);

    useEffect(() => {
        if (paymentInitiated) {
            InitiatePayment();
        }
    }, [paymentInitiated]);

    const generateConfig = (isFullPayment) => {
        const amount = isFullPayment ? appConfig.payment.full : appConfig.payment.part;

        return {
            reference: Utils.generateRandomString(12),
            email: user.email,
            amount: parseInt(amount) * 100,
            publicKey: appConfig.paystack.publicKey,
            metadata: {
                full_name: user.full_name,
                phone_number: user.phone
            }
        };
    }

    const initializePayment = usePaystackPayment(generateConfig(fullPayment));

    const InitiatePayment = () => {
        initializePayment(onSuccess, onClose);
    }

    const onSuccess = (reference) => {
        console.log('reference',  reference);
        onDone();
    }

    const onClose = () => {
        console.log('closed paystack modal');
        onCancel();
    }

    const cardContents = [
        {
            title: 'Full Payment',
            texts: [
                'Pay once for your business registration'
            ],
            amount: "20,000"
        },
        {
            title: 'Pay 2 installments',
            texts: [
                'Pay first installment of N12,000 today',
                'Pay another installment of N12,000 on 7th February 2021',
            ],
            amount: "24,000"
        },
    ];

    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            boxShadow: "none",
            backgroundColor: "#E6F4FE",
        },
        accordionDetails: {
            display: "block"
        }
    }));

    const content = [
        "A registered business name",
        "A Tax Identification Number",
        "A business bank account"
    ];

    const classes = useStyles();

    return (
        <div className="Payment">
            <div className="text-muted mb-3 font-size-lg">Complete your registration by making payments</div>
            <div className="row mx-0">
                <div className="col-md-6 px-0 mb-3">
                    <PaymentCard
                        active={fullPayment}
                        title={cardContents[0].title}
                        texts={cardContents[0].texts}
                        amount={cardContents[0].amount}
                        onClick={() => setPartPayment(true)}
                    />

                    <div className="my-4 font-w600">
                        Also consider,
                    </div>

                    <PaymentCard
                        active={!fullPayment}
                        title={cardContents[1].title}
                        texts={cardContents[1].texts}
                        amount={cardContents[1].amount}
                        onClick={() => setPartPayment(false)}
                    />
                </div>
                <div className="offset-lg-1 col-lg-5 col-md-6 px-0">
                    <Accordion className={classes.root} expanded={true}>
                        <AccordionSummary
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                            className={classes.summary}
                        >
                            <Typography className="font-w600 text-dark-blue">What you get</Typography>
                        </AccordionSummary>
                        <div className="px-3">
                            <hr className="mt-0" />
                        </div>
                        <AccordionDetails className={classes.accordionDetails}>
                            {
                                content.map((item, index) => (
                                    <Typography className="mb-3 d-flex font-size-nm" key={index}>
                                        <FontAwesomeIcon className="text-blue mr-4" icon={faCheck} />
                                        <span className="text-muted flex-grow-1">{item}</span>
                                    </Typography>
                                ))
                            }
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
        </div>
    );
};

Payment.propTypes = {
    paymentInitiated: PropTypes.bool,
    user: PropTypes.any.isRequired,
    onDone: PropTypes.func
};

export default pure(Payment);
