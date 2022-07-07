import React from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalConfirm extends React.Component {
    
    render() { 
        let { message, answer } = this.props;
        return (
            <div className="modalConfirmContainer">
                <Modal isOpen={!!message} >
                    <ModalHeader >Thông Báo!</ModalHeader>
                    <ModalBody>{message}</ModalBody>
                    <ModalFooter>
                        <Button onClick={() => { answer(true) }}>Yes</Button>{' '}
                        <Button color="danger" onClick={() => { answer() }}>No</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModalConfirm;