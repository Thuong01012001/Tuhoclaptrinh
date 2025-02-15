import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import {handleLoginApi} from '../../services/userService.js';
import { LANGUAGES } from '../../utils/constant.js';
import { changeLanguageApp } from '../../store/actions';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
            username: '',
            password: '',
            isShowPassWord: false,
            errorMessage: '',
        }
    }
    changeLanguage = (language) =>{
        this.props.changeLanguageAppRedux(language)
    }

    handleOnChangeUser = (event) =>{
        this.setState({
            username: event.target.value
        })
    }
    handleOnChangePassword = (event) =>{
        this.setState({
            password: event.target.value
        })
    }

    handleLogin = async () => {
        // Reset thông báo lỗi trước khi thực hiện login
        this.setState({
            errorMessage: '',
        });
    
        try {
            // Gọi API đăng nhập
            let data = await handleLoginApi(this.state.username, this.state.password);
    
            // Kiểm tra nếu API trả về lỗi
            if (data && data.errCode !== 0) {
                this.setState({
                    errorMessage: data.message || 'Đăng nhập thất bại!', // Nếu không có message từ API, hiển thị lỗi mặc định
                });
                console.log('Login failed:', data.message);
                return; // Dừng lại nếu login thất bại
            }
    
            // Nếu đăng nhập thành công (errCode === 0)
            if (data && data.errCode === 0) {
     
                // Lưu thông tin người dùng vào Redux (dispatch action)
                this.props.userLoginSuccess(data.user);
    
                // Log kết quả thành công
                console.log('Login Success:', data);
    
                // Chuyển hướng người dùng đến trang hệ thống
                this.redirectToSystemPage('/system/user-manage'); 
            }
    
        } catch (error) {
            // Xử lý lỗi từ server hoặc lỗi mạng
            if (error.response && error.response.data) {
                this.setState({
                    errorMessage: error.response.data.message || 'Có lỗi xảy ra từ server. Vui lòng thử lại!',
                });
            } else {
                this.setState({
                    errorMessage: 'Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng!',
                });
            }
            console.log('API Error:', error);
        }
    };
    
    
    handleShowPassword = () =>{
        this.setState({
            isShowPassWord: !this.state.isShowPassWord
        })
    }  
    
    handleKeyDown = (event) =>{
        if(event.key === 'Enter' || event.keyCode === 13){
            this.handleLogin();
        }
    }    
    render() {
        let {language} = this.props;
        return (
            <div className="login-background">
                <div className='right-content'>
                    <div className='support'>
                        <i className="fas fa-question-circle"></i><FormattedMessage id="login.support"/>
                    </div>
                    <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={()=>this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                    <div className={language === LANGUAGES.EN ? 'language-en actiive' : 'language-en'}><span onClick={()=>this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                </div>
                <div className='login-container'>
                    <div className='login-content'>
                        <div className='col-12 text-center text-login'><FormattedMessage id="login.title"/></div>
                        
                        <div className='col-12 form-group input-login'>
                            <label><FormattedMessage id="login.username"/></label>
                            <input 
                            type='text'
                            className='form-control'
                            placeholder={language === LANGUAGES.VI ? 'Nhập tên đăng nhập' : 'Enter your username'}
                            value={this.state.username}
                            onChange={(event) => this.handleOnChangeUser(event)}
                            />
                        </div>
                        <div className='col-12 form-group input-login'>
                            <label><FormattedMessage id="login.password"/></label>
                            <div className='custom-input-password'>
                            <input 
                                className='form-control'
                                type={this.state.isShowPassWord ? 'text' : 'password'}
                                placeholder={language === LANGUAGES.VI ? 'Nhập mật khẩu' :'Enter your password'}
                                value={this.state.password}
                                onChange={(event) => this.handleOnChangePassword(event)}
                                required
                                onKeyDown={(event)=>this.handleKeyDown(event)}
                            />
                            <span onClick={()=> this.handleShowPassword() }><i className={this.state.isShowPassWord ? 'fa fa-eye' : 'fa fa-eye-slash'}></i></span>

                            </div>

                        </div>
                        <div className='col-12' style={{ color: 'red' }}>
                            <p>{this.state.errorMessage}</p>
                        </div>
                        
                        <div className='col-12'>
                            <button className='btn-login' onClick={()=>{this.handleLogin()}}><FormattedMessage id="login.title"/></button>
                        </div>
                        <div className='col-12'>
                            <span className='forgot-password'><FormattedMessage id="login.forgot-password"/></span>
                        </div>
                        <div className='col-12 mt-3 text-center'>
                            <span className='text-orther-login'><FormattedMessage id="login.other-login-with"/></span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className='fab fa-facebook-f facebook'></i>
                            <i className='fab fa-google-plus-g google'></i>
                        </div> 
                    </div>
                </div>
            </div>
        )
    }
}

    const mapStateToProps = state => {
        return {
            language: state.app.language,
            userInfo: state.app.userInfo,
        };
    };
    const mapDispatchToProps = dispatch => {
        return {
          navigate: path => dispatch(push(path)),
          userLoginFail: () => dispatch(actions.userLoginFail()),
          userLoginSuccess: userInfo => dispatch(actions.userLoginSuccess(userInfo)),
          changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
        };
      };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
