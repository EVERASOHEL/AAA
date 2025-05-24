import React, {Component} from "react";
import "./styles.scss";

export default class index extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    componentWillUnmount() {
    }

    render() {
        const {
            classDTO,
            validationErrorDTO,
            handleClassDTO,
            handleButtons,
        } = this.props;
        return (
            <div>
                <p>Sample Page</p>
            </div>
        );
    }
}
