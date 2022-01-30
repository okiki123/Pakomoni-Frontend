import { pure } from "recompose";
import setupImage from "../../../assets/images/landing-page/setup.png";

const Setup = () => {
    return (
        <div className="Setup bg-light-blue">
            <div className="mxw-1200">
                <div className="row mx-0">
                    <div className="col-lg-6">
                        <div className="d-flex h-100 py-lg-5">
                            <div className="d-flex flex-column align-items-center Setup__pointer mr-2">
                                <div className="circle mt-2"></div>
                                <div className="flex-grow-1 line"></div>
                                <div className="circle circle-last"></div>
                            </div>
                            <div className="Setup__texts flex-grow-1 d-flex flex-column justify-content-between">
                                <div className="mb-5 mb-lg-0">
                                    <div className="Setup__big-text text-dark-blue">
                                        Setup your corporate account to manage finances better
                                    </div>
                                    <div className="Setup__small-text my-2">
                                        We can help you set up your corporate bank account to perform everyday banking
                                        activities for your business
                                    </div>
                                </div>

                                <div>
                                    <div className="Setup__big-text text-dark-blue">
                                        You can track your account opening process easily.
                                    </div>
                                    <div className="Setup__small-text my-2">
                                        We keep you updated on how your registration process is going at every crucial stage.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 d-lg-flex justify-content-lg-end mt-4 mt-lg-0 px-0 px-md-2">
                        <div className="text-center">
                            <img className="Setup__image" src={setupImage} alt="Image" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default pure(Setup);
