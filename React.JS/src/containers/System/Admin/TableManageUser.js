import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import { FormattedMessage } from 'react-intl';
import './TableManageUser.scss'
import { LANGUAGES } from '../../../utils/constant';
import * as actions from '../../../store/actions';
import 'react-image-lightbox/style.css';

class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
           usersRedux : [], 
            
        };
    }
    componentDidMount = () =>{
        this.props.fetchUserRedux();
    }
    componentDidUpdate = (preProps, preState) => {
        if(preProps.listUsers !== this.props.listUsers){
            this.setState({
                usersRedux : this.props.listUsers
            })
        }
    }
    handleDeleteUser = (user) =>{
        this.props.deleteAUserRedux(user.id);
        
    }

    handleEditUser = (user) =>{
        this.props.handleEditUserFromParent(user);
    }
    render() {
        
        let arrUsers = this.state.usersRedux;
        return (
                <table id="TableManageUser">
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                        
                        {arrUsers && arrUsers.length > 0 ? (
                                arrUsers.map((item, index) => {
                                    // Kiểm tra xem item có hợp lệ và có các thuộc tính cần thiết không
                                    if (!item || !item.email || !item.firstName || !item.lastName || !item.address) {
                                        return null; // Nếu thiếu thuộc tính hoặc không hợp lệ, bỏ qua phần tử này
                                    }

                                    return (
                                        <tr key={index}>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button onClick={() => this.handleEditUser(item)} className="btn-edit">
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                                <button onClick={() => this.handleDeleteUser(item)} className="btn-delete">
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="5">No users available</td>
                                </tr>
                        )}

                    </tbody>
                </table>
              
        );
    }
}


const mapStateToProps = state => {
    return {
       listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);