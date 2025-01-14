import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserManage.scss';
import ModalUser from './ModalUser.js';
import { getAllUsers, createNewUserService, deleteUserService, } from '../../services/userService';
import { emitter } from '../../utils/emitter.js';
import ModalEditUser from './ModalEditUser.js';
import { editUserService } from '../../services/userService';

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            useEdi: {}
        };
    }

    async componentDidMount() {
        await this.getAllUserFromReact();
    }

    toggleUserModal = () => {
        this.setState({ isOpenModalUser: !this.state.isOpenModalUser });
    };

    toggleEditUserModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        });
    }

    getAllUserFromReact = async () => {
        try {
            let response = await getAllUsers('All');
            if (response && response.errCode === 0) {
                this.setState({ arrUsers: response.users });
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode === 0) {
                await this.getAllUserFromReact();
            }
            emitter.emit('EVENT_CLEAR_MODAL_DATA', { 'id': 'your id' });
            return response;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    };

    handleAddNewUser = () => {
        this.setState({ isOpenModalUser: true });
    };

    handleDeleteUser = async (user) => {
        console.log('click delete', user);
        try {
            let res = await deleteUserService(user.id);
            if (res && res.errCode === 0) {
                await this.getAllUserFromReact();
            } else {
                alert(res.errMessage);
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleEditUser = (user) => {
        console.log('check edit ', user);
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        });
    }
    doEditUser = async(user) => {
        try{
        let res = await editUserService(user);
        if(res && res.errCode === 0){
            this.setState({
                isOpenModalEditUser: false

            })
            await this.getAllUserFromReact();
        }else{
            alert(res.errCode);
        }
      
        }catch(e){
            console.log(e);
        }
    }

    render() {
        let { arrUsers } = this.state;
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {
                    this.state.isOpenModalEditUser &&
                <ModalEditUser
                    isOpen={this.state.isOpenModalEditUser}
                    toggleFromParent={this.toggleEditUserModal}
                    currentUser = {this.state.userEdit}
                    editUser = {this.doEditUser}
                />
                }
                <div className="title text-center">Manage Users</div>
                <div className="mx-1">
                    <button
                        className="btn btn-primary px-3"
                        onClick={this.handleAddNewUser}
                    >
                        <i className="fa fa-plus"></i> Add New User
                    </button>
                </div>
                <div className="user-table mt-3 mx-1">
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                            {arrUsers &&
                                arrUsers.map((item, index) => (
                                    <tr key={item.id || index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className="btn-edit" onClick={() => this.handleEditUser(item)} >
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>
                                            <button className="btn-delete" onClick={() => this.handleDeleteUser(item)}>
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default connect(null, null)(UserManage);
