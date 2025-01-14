import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';

class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        };
        this.listenToEmitter();
    }

    listenToEmitter(){
        emitter.on('EVENT_CLEAR_MODAL_DATA', () =>{
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
             });    
        })
    }
    toggle = () => {
        this.props.toggleFromParent();
    };

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({ ...copyState });
    };

    checkValidate = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]] || this.state[arrInput[i]].trim() === '') {
                isValid = false;
                alert(`Missing parameter: ${arrInput[i]}`);
                break;
            }
        }
        return isValid;
    };

    handleAddNewUser = async () => {
        let isValid = this.checkValidate();
        if (isValid) {
            try {
                let response = await this.props.createNewUser(this.state);
                if (response && response.errCode === 0) {
                    alert('User created successfully!');
                    this.toggle(); // Đóng modal nếu thành công
                } else {
                    alert(response.message || 'Failed to create user!');
                }
            } catch (error) {
                console.error('Error creating user:', error);
                alert('An error occurred. Please try again.');
            }
        }
    };

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={this.toggle}
                className="model-user-container"
                size="lg"
            >
                <ModalHeader toggle={this.toggle}>Create a new user</ModalHeader>
                <ModalBody>
                    <div className="model-user-body">
                        <div className="input-container">
                            <label>Email</label>
                            <input
                                type="text"
                                onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                value={this.state.email}
                            />
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input
                                type="password"
                                onChange={(event) => this.handleOnChangeInput(event, 'password')}
                                value={this.state.password}
                            />
                        </div>
                    </div>
                    <div className="model-user-body">
                        <div className="input-container">
                            <label>First Name</label>
                            <input
                                type="text"
                                onChange={(event) => this.handleOnChangeInput(event, 'firstName')}
                                value={this.state.firstName}
                            />
                        </div>
                        <div className="input-container">
                            <label>Last Name</label>
                            <input
                                type="text"
                                onChange={(event) => this.handleOnChangeInput(event, 'lastName')}
                                value={this.state.lastName}
                            />
                        </div>
                    </div>
                    <div className="model-user-body">
                        <div className="input-container">
                            <label>Address</label>
                            <input
                                type="text"
                                onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                value={this.state.address}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.handleAddNewUser} className="px-3">
                        Add New
                    </Button>
                    <Button color="secondary" className="px-3" onClick={this.toggle}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default ModalUser;
