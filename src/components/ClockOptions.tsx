import * as React from 'react';
import '../styles/App.css';
var Modal = require('react-bootstrap-modal')

type ClockOptionsState = {
    show: boolean,
    closeModal?: () => void;
}

type ClockOptionsProps = {
    show: boolean,
    openModal: () => void,
    closeModal: () => void
}

export default class ClockOptions extends React.Component<ClockOptionsProps, ClockOptionsState>  {
    constructor(props: ClockOptionsProps) {
        super(props);
        this.state = { show: this.props.show }
    }
    render() {
        return(
            <div id="OptionsModal">
                <Modal show={this.props.show} onHide={this.props.closeModal} aria-labelledby="ModalHeader">
                    <Modal.Header closeButton>
                        <Modal.Title id="ModalHeader">Clock Options</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Some Content here</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Modal.Dismiss className='btn btn-default'>Cancel</Modal.Dismiss>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}