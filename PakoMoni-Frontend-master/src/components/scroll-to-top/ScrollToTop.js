import React, {Component} from "react";

class ScrollToTop extends Component {
    componentDidUpdate(prevProps) {
        console.log(prevProps);
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0)
        }
    }

    render() {
        return null
    }
}

export default (ScrollToTop);
