import documentWhite from "../../assets/images/icons/document__white.svg"
import documentOrange from "../../assets/images/icons/document__orange.svg"
import accountWhite from "../../assets/images/icons/account__white.svg"
import accountOrange from "../../assets/images/icons/account__orange.svg"
import bankWhite from "../../assets/images/icons/bank__white.svg"
import bankOrange from "../../assets/images/icons/bank__orange.svg"
import homeWhite from "../../assets/images/icons/home__white.svg"
import homeOrange from "../../assets/images/icons/home__orange.svg"
import taxWhite from "../../assets/images/icons/tax__white.svg"
import taxOrange from "../../assets/images/icons/tax__orange.svg"

const items = [
    {
        label: 'Home',
        visible: true,
        url: '/dashboard',
        icon: homeWhite,
        activeIcon: homeOrange,
    },
    {
        label: 'Business Registration',
        visible: true,
        url: '/dashboard/business-registration',
        icon: documentWhite,
        activeIcon: documentOrange,
    },
    // {
    //     label: 'Taxes',
    //     visible: true,
    //     url: '/dashboard/taxes',
    //     icon: taxWhite,
    //     activeIcon: taxOrange,
    // },
    {
        label: 'Bank Account',
        visible: true,
        url: '/dashboard/bank-account',
        icon: bankWhite,
        activeIcon: bankOrange,
    },
    {
        label: 'Profile',
        visible: true,
        url: '/dashboard/profile',
        icon: accountWhite,
        activeIcon: accountOrange,
    },
    {
        label: 'Logout',
        visible: true,
        url: '/login',
        bottom: true
    }
];

export default items;
