import { pure } from "recompose";
import Button from "../../../components/button/Button";

const Try = () => {
    return (
        <div className="Try bg-dark-blue">
            <div className="mxw-1200">
                <div className="d-md-flex justify-content-md-between">
                    <div className="text-white">
                        <div className="Try__big-text mb-3">Try PakoMoni</div>
                        <div className="Try__small-text">Start with the best tools for your business</div>
                    </div>
                    <div>
                        <Button link="/signup" className="Btn-orange Btn-standard mt-3">
                            Get Started
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default pure(Try);
