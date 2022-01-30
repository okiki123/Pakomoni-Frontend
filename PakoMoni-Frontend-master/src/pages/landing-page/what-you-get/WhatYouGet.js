import { pure } from "recompose";
import bank from "../../../assets/images/icons/bank.svg";
import tax from "../../../assets/images/icons/tax.svg";
import document from "../../../assets/images/icons/document.svg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretRight} from "@fortawesome/free-solid-svg-icons";

const WhatYouGet = () => {
    return (
        <div className="WhatYouGet bg-light-blue">
            <div className="mxw-1200">
                <div className="WhatYouGet__header mb-4 mb-md-5 text-center text-md-left">
                    What you get
                </div>

                <div className="d-md-flex justify-content-xl-between">
                    <div className="px-1 section text-center text-md-left mb-4">
                        <div className="d-flex">
                            <div className="WhatYouGet__icon mx-auto mx-md-0">
                                <img src={document} alt="Document Icon" />
                            </div>
                            <div className="WhatYouGet__arrow flex-grow-1 d-none d-md-flex align-items-center">
                                <div className="border flex-grow-1"></div>
                                <div className="caret text-blue">
                                    <FontAwesomeIcon icon={faCaretRight} />
                                </div>
                            </div>
                        </div>
                        <div className="WhatYouGet__number mt-2 mx-auto mx-md-0">1</div>
                        <div className="WhatYouGet__text mt-2 mx-auto mx-md-0">Get your business registered</div>
                    </div>

                    <div className="px-1 section text-center text-md-left mb-4">
                        <div className="d-flex">
                            <div className="WhatYouGet__icon mx-auto mx-md-0">
                                <img src={tax} alt="Tax icon" />
                            </div>
                            <div className="WhatYouGet__arrow flex-grow-1 d-none d-md-flex align-items-center">
                                <div className="border flex-grow-1"></div>
                                <div className="caret text-blue">
                                    <FontAwesomeIcon icon={faCaretRight} />
                                </div>
                            </div>
                        </div>
                        <div className="WhatYouGet__number mt-2 mx-auto mx-md-0">2</div>
                        <div className="WhatYouGet__text mt-2 mx-auto mx-md-0">Get your Tax Identification Number</div>
                    </div>

                    <div className="px-1 section text-center text-md-left mb-4">
                        <div className="d-flex">
                            <div className="WhatYouGet__icon mx-auto mx-md-0">
                                <img src={bank} alt="Bank icon" />
                            </div>
                        </div>
                        <div className="WhatYouGet__number mt-2 mx-auto mx-md-0">3</div>
                        <div className="WhatYouGet__text mt-2 mx-auto mx-md-0">Get your business bank account</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default pure(WhatYouGet);
