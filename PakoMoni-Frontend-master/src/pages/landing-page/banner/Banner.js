import { pure } from "recompose";
import Button from "../../../components/button/Button";
import bannerImage from "../../../assets/images/landing-page/banner.png"

const Banner = () => {
    return (
        <div className="Banner">
            <div className="mxw-1200">
                <div className="d-lg-flex">
                    <div className="col-lg-6 d-flex align-items-center">
                        <div className="Banner__texts text-center text-lg-left">
                            <div className="Banner__big-text text-dark-blue">
                                Register your business and get a corporate account without stress
                            </div>
                            <div className="Banner__small-text mt-2">
                                PakoMoni helps businesses in Nigeria register their business and open a business account easily
                            </div>
                            <Button link="/signup" className="Btn-orange Btn-standard mt-3">
                                Get Started
                            </Button>
                        </div>
                    </div>

                    <div className="col-lg-6 d-lg-flex justify-content-lg-end mt-4 mt-lg-0 px-0 px-md-2">
                        <div className="text-center">
                            <img className="Banner__image" src={bannerImage} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default pure(Banner);
