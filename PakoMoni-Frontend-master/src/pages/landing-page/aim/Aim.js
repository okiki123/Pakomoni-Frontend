import { pure } from "recompose";
import aimImage from "../../../assets/images/landing-page/aim.webp"

const Aim = () => {
    return (
        <div className="Aim">
            <div className="mxw-1200">
                <div className="d-lg-flex">
                    <div className="col-lg-6 d-lg-flex justify-content-lg-start mt-4 mt-lg-0 px-0 px-md-2">
                        <div className="text-center">
                            <img className="Aim__image mb-4" alt="describing aim" src={aimImage} />
                        </div>
                    </div>

                    <div className="col-lg-6 d-flex align-items-center">
                        <div className="Aim__texts text-center text-lg-left pl-lg-4">
                            <div className="Aim__big-text mb-3">
                                Our aim is to make this a seamless process for you
                            </div>
                            <div className="Aim__small-text">
                                As a business owner and entrepreneur, you can easily register your business name and
                                have a unique business identity,quickly. We have the right resources to make this seamless
                                process for you.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default pure(Aim);
