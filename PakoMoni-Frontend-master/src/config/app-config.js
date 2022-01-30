export const appConfig = {
    environment: process.env.REACT_APP_ENVIRONMENT,
    baseUrl: process.env.REACT_APP_API_BASE_URL,
    paystack: {
        publicKey: process.env.REACT_APP_PUBLIC_KEY
    },
    payment: {
        full: process.env.REACT_APP_FULL_PAYMENT,
        part: process.env.REACT_APP_PART_PAYMENT
    }
};
