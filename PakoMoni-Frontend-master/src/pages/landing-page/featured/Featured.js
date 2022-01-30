import { pure } from "recompose";
import techCabalImage from "../../../assets/images/landing-page/tech-cabal.png";
import efinaImage from "../../../assets/images/landing-page/efina.jpg";
import punchImage from "../../../assets/images/landing-page/punch.png";
import vanguardImage from "../../../assets/images/landing-page/vanguard.jpg";

const Featured = () => {
    return (
        <div className="Featured mxw-1200">
            <div className="Featured__big-text text-center font-w600">
                As Featured In
            </div>
            <div className="row mx-0">
                <div className="col-sm-6 col-lg-3">
                    <div className="text-center">
                        <img className="Featured__image" alt="Tech Cabal" src={techCabalImage} />
                    </div>
                </div>

                <div className="col-sm-6 col-lg-3">
                    <div className="text-center">
                        <img className="Featured__image" alt="Efina" src={efinaImage} />
                    </div>
                </div>

                <div className="col-sm-6 col-lg-3">
                    <div className="text-center">
                        <img className="Featured__image" alt="Punch" src={punchImage} />
                    </div>
                </div>

                <div className="col-sm-6 col-lg-3">
                    <div className="text-center">
                        <img className="Featured__image" alt="Vanguard" src={vanguardImage} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default pure(Featured);
