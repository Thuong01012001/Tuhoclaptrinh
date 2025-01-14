import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserRedux.scss';
import { LANGUAGES, CRUD_ACTIONS} from '../../../utils/constant';
import * as actions from '../../../store/actions';
import Lightbox from 'react-image-lightbox';

import 'react-image-lightbox/style.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TableManageUser from './TableManageUser';
import CommonUtils from './../../../utils/CommonUtils';

toast.configure();
class UserRedux extends Component {

    constructor(props){
        super(props);
        this.state = {
            genderArr : [],
            positionArr : [],
            roleArr : [],
            previewImgURL: '',
            isOpen: false,

           
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

            action: '',
            userEditId: '',
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        let arrGenders = this.props.genderRedux;
        if(prevProps.genderRedux !== this.props.genderRedux){
            this.setState({
                genderArr:arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',

            })
        }
        if(prevProps.positionRedux !== this.props.positionRedux){
            let arrPositions = this.props.positionRedux;
            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap: '',
            });
        }
        if(prevProps.roleRedux !== this.props.roleRedux){
            let arrRoles = this.props.roleRedux;
            this.setState({
                roleArr:  arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap: '',
            
            })
        }
        if(prevProps.listUsers !== this.props.listUsers){
            let arrGenders = this.props.genderRedux;
            let arrRoles = this.props.roleRedux;
            let arrPositions = this.props.positionRedux;
            
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap: '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE,
            })
        }
    }
    handleImageChange = async (event) => {
        let data = event.target.files;
        let file = data ? data[0] : null; 
    
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64,
            });
        } else {
            console.error('No file selected or files is undefined.');
        }
    };
    
    openPreviewImage = ()=>{
        if(!this.state.previewImgURL) return;
        this.setState({
            isOpen: true,
        })
    }

    handleSaveUser = () =>{
        let isValid = this.checkValidateInput();
        if(isValid === false) return;
        let {action} = this.state;
        if(action === CRUD_ACTIONS.CREATE){
            // fire redux create user
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName:this.state.firstName,
                lastName:this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar,
                
            })
        }
        if(action === CRUD_ACTIONS.EDIT){
                //fire redux edit user
                this.props.editAUserRedux({
                    id: this.state.userEditId,
                    email: this.state.email,
                    password: this.state.password,
                    firstName:this.state.firstName,
                    lastName:this.state.lastName,
                    address: this.state.address,
                    phoneNumber: this.state.phoneNumber,
                    gender: this.state.gender,
                    roleId: this.state.role,
                    positionId: this.state.position,
                    avatar: this.state.avatar,

                })
            } 
          
            
        this.props.fetchUserRedux();
        
    }

    onChangeInput = (event, id) => {
        let copyState ={...this.state}
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address'];
    
        // Kiểm tra các trường bắt buộc
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('This input is required: ' + arrCheck[i]);
                break;
            }
        }
    
         // Kiểm tra pattern cho email
        let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (isValid && this.state.email && !emailPattern.test(this.state.email) && !this.state.isEmailReadonly) {
            isValid = false;
            alert('Please enter a valid email address.');
        }

        // Kiểm tra pattern cho số điện thoại
        let phonePattern = /^\+?[0-9]{1,4}[-\s]?[0-9]{1,4}[-\s]?[0-9]{1,4}$/;
        if (isValid && this.state.phoneNumber && !phonePattern.test(this.state.phoneNumber)) {
            isValid = false;
            alert('Please enter a valid phone number.');
        }

        return isValid;
    }
    
    handleEditUserFromParent = (user) =>{
        let imageBase64 = '';
        if(user.image){
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }
        console.log('check handle edit user from parent', user);
        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            role: user.roleId,
            gender: user.gender,
            position: user.positionId,
            previewImgURL: imageBase64,
            avatar: '',
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id,
        })
    }
    

    render() {
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let language = this.props.language;
        let isGetGender = this.props.isLoadingGender;
        let isGetPosition = this.props.isLoadingPosition;
        let isGetRole = this.props.isLoadingRole;
        
        let { email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar } = this.state;
        return (
            <div className='user-redux-container'>
                <div className='title'>
                    Manage User Redux
                </div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className="row">
                            <div className='col-12'>{isGetGender === true ? 'Loading genders' : ''}</div>
                            <div className="col-12">{isGetPosition === true ? 'Loading positions' : ''}</div>
                            <div className='col-12'>{isGetRole === true ? 'Loading roles' : ''}</div>
                            <div className="col-12 my-3"><FormattedMessage id="manage-user.add" defaultMessage="Thêm mới người dùng"/></div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.email" defaultMessage="Email" /></label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    value={email}
                                    onChange={(event) => {this.onChangeInput(event, 'email')}}
                                    required 
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                    placeholder={language === LANGUAGES.VI ? 'Email (ví dụ: example@gmail.com)' : 'Email (e.g., example@gmail.com)'}
                                    title={
                                        language === LANGUAGES.VI ? 
                                        <FormattedMessage id="manage-user.title-email" defaultMessage="Vui lòng nhập địa chỉ email hợp lệ." /> 
                                        : <FormattedMessage id="manage-user.title-email" defaultMessage="Please enter a valid email address." />
                                    } 
                                />
                            </div>

                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.password" defaultMessage="Password" /></label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    value={password}
                                    onChange={(event) => {this.onChangeInput(event, 'password')}} 
                                    required
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                    placeholder={language === LANGUAGES.VI ? 'Mật khẩu' : 'Password'}
                                    minLength="8" 
                                    title={
                                        language === LANGUAGES.VI ? 
                                        <FormattedMessage id="manage-user.title-password" defaultMessage="Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ cái, số và ký tự đặc biệt." /> 
                                        : <FormattedMessage id="manage-user.title-password" defaultMessage="Password must be at least 8 characters, including a letter, a number, and a special character." />
                                    }
                                />
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.firstName" defaultMessage="Tên"/></label>
                                <input type="text" className="form-control" 
                                value={firstName}
                                onChange={(event) => {this.onChangeInput(event, 'firstName')}}
                                required
                                placeholder={language === LANGUAGES.VI ? 'Tên' : 'First name'}/>
                            </div>
                            <div className="col-3">
                                <label><FormattedMessage id="manage-user.lastName" defaultMessage="Họ"/></label>
                                <input type="text" className="form-control"
                                value={lastName}
                                onChange={(event) => {this.onChangeInput(event, 'lastName')}}
                                required
                                placeholder={language === LANGUAGES.VI ? 'Họ' : 'Last Name'}
                                />
                            </div>
                            <div className="col-3 mt-3">
                                <label><FormattedMessage id="manage-user.phonenumber" defaultMessage="Số điện thoại" /></label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    value={phoneNumber}
                                    onChange={(event) => {this.onChangeInput(event, 'phoneNumber')}}
                                    required
                                    placeholder={language === LANGUAGES.VI ? 'Số điện thoại' : 'Phone number'}
                                    title={
                                        language === LANGUAGES.VI ? 
                                        <FormattedMessage id="manage-user.title-phone" defaultMessage="Vui lòng nhập số điện thoại hợp lệ." /> 
                                        : <FormattedMessage id="manage-user.title-phone" defaultMessage="Please enter a valid phone number." />
                                    } 
                                   
                                />
                            </div>

                            <div className="col-9 mt-3">
                                <label><FormattedMessage id="manage-user.address" defaultMessage="Địa chỉ"/></label>
                                <input type="text" className="form-control"
                                value={address}
                                onChange={(event) => {this.onChangeInput(event, 'address')}}
                                required
                                placeholder={language === LANGUAGES.VI ? 'Địa chỉ' : 'Address'} 
                                /> 
                            </div>
                            <div className="col-3 mt-3">
                                <label><FormattedMessage id="manage-user.gender" defaultMessage="Giới tính"
                                />
                                </label>
                                        <select className="form-control" value={gender} onChange={(event) => {this.onChangeInput(event, 'gender')}}>
                                        <FormattedMessage id="manage-user.choose" defaultMessage="Chọn">
                                            {(text) => <option value="">{text}</option>}
                                        </FormattedMessage>
                                            {genders && genders.length > 0 &&
                                                genders.map((item, index) => {
                                                    return(
                                                    <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                    )
                                                })
                                            }
                                         </select>
                            </div>
                            <div className="col-3 mt-3">
                                <label><FormattedMessage id="manage-user.position" defaultMessage="Chức vụ"/>
                                </label>
                                    <select className="form-control" value={position}  onChange={(event) => {this.onChangeInput(event, 'position')}} >
                                        <FormattedMessage id="manage-user.choose" defaultMessage="Chọn">
                                            {(text) => <option value="">{text}</option>}
                                        </FormattedMessage>
                                        {positions && positions.length > 0 &&
                                        positions.map((item, index) =>{
                                            return(
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                       
                                    </select>
                            </div>
                            <div className="col-3 mt-3">
                                <label><FormattedMessage id="manage-user.role" defaultMessage="Vai trò"/></label>
                                <select className="form-control" value={role}  onChange={(event) => {this.onChangeInput(event, 'role')}}>
                                        <FormattedMessage id="manage-user.choose" defaultMessage="Chọn">
                                            {(text) => <option value="">{text}</option>}
                                        </FormattedMessage>
                                        {roles && roles.length > 0 &&
                                        roles.map((item, index)=>{
                                            return(
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }
                                    
                                </select>

                            </div>
                            <div className="col-3 mt-3">
                                <label>
                                    <FormattedMessage id="manage-user.image" defaultMessage="Ảnh đại diện" />
                                </label>
                                <div className="preview-img-container">
                                    <input
                                        id="previewImg"
                                        type="file"
                                        hidden
                                        onChange={(event) => this.handleImageChange(event)}
                                    />
                                    <label className="label-upload" htmlFor="previewImg">
                                        Tải ảnh <i className="fas fa-upload"></i>
                                    </label>
                                    {this.state.previewImgURL && (
                                        <div
                                            className="preview-image"
                                            style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                            onClick={() => this.openPreviewImage()}
                                        ></div>
                                    )}
                                </div>
                            </div>
                            <div className='col-12 my-3'>
                            <button type="submit" className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'} 
                            onClick={() => this.handleSaveUser()}>
                            {this.state.action === CRUD_ACTIONS.EDIT ? 
                                <FormattedMessage id='manage-user.edit'/>
                                : 
                                <FormattedMessage id='manage-user.save'/>
                            }
                            </button>
                            </div>
                            <div className='col-12'>
                            <TableManageUser
                                handleEditUserFromParent = {this.handleEditUserFromParent}
                                action={this.state.action}
                            />
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.isOpen === true && 
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div>
        )
    }

}

    const mapStateToProps = state => {
        return {
            language: state.app.language,
            roleRedux: state.admin.roles,
            genderRedux: state.admin.genders,
            positionRedux: state.admin.positions,
            isLoadingGender: state.admin.isLoadingGender,
            isLoadingPosition: state.admin.isLoadingPosition,
            listUsers: state.admin.users,
        };
    };

    const mapDispatchToProps = dispatch => {
        return {
            getGenderStart: () => dispatch(actions.fetchGenderStart()),
            getPositionStart: () => dispatch(actions.fetchPositionStart()),
            getRoleStart: () => dispatch(actions.fetchRoleStart()),
            createNewUser: (data) => dispatch(actions.createNewUser(data)),
            fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
            editAUserRedux: (data) => dispatch(actions.editAUser(data)),
            // processLogout: () => dispatch(actions.processLogout()),
            // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
        };
    };

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);