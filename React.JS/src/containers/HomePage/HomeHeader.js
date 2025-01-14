import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/logo.svg';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions/appActions';
class HomeHeader extends Component {

    changeLanguage = (language) =>{
        this.props.changeLanguageAppRedux(language)
    }

    render() {
        let language = this.props.language;
       
       

        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div className='home-header-content'>
                        <div className="left-content">
                            <i className="fa fa-bars"></i>
                            <div className='header-logo'>
                                <img src={logo} alt="Logo"/>
                            </div>

                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b> <FormattedMessage id="homeheader.speciality" defaultMessage="Chuyên khoa" /></b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.searchdoctor" defaultMessage="Tìm bác sĩ theo chuyên khoa" /></div>


                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.health-facility" defaultMessage="Cơ sở y tế" /></b></div>
                                <div className='subs-title'> <FormattedMessage id="homeheader.choose-hospital"defaultMessage="Choose a hospital"/></div>
                                    
                            </div>
                            <div className='child-content'>
                                <div><b><FormattedMessage id="homeheader.doctor" defaultMessage="Bác sĩ" /></b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.choose-doctor" defaultMessage="Chọn bác sĩ giỏi" /></div>
                                    
                            </div>
                            <div className='child-content'>
                                <div><b> <FormattedMessage id="homeheader.examination-package" defaultMessage="Gói khám" /></b></div>
                                <div className='subs-title'><FormattedMessage id="homeheader.general-health-check" defaultMessage="Khám sức khỏe tổng quát" /></div>
        
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'>
                            <i className="fas fa-question-circle"></i>Hỗ trợ
                            </div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={()=>this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en actiive' : 'language-en'}><span onClick={()=>this.changeLanguage(LANGUAGES.EN)}>EN</span></div>

                        </div>

                    </div>
                </div>
                {this.props.isShowBanner === true &&
                <div className='home-header-banner'>
                    <div className='content-up'>
                        <div className='title1'><FormattedMessage id="banner.title1" defaultMessage="NỀN TẢNG Y TẾ"/></div>
                        <div className='title2'><FormattedMessage id="banner.title2" defaultMessage="CHĂM SÓC SỨC KHỎE TOÀN DIỆN"/></div>
                        <div className='search'>
                            <i className='fas fa-search'></i>
                            <input type='text'  placeholder='Tìm chuyên khoa khám bệnh'/>
                        </div>
                    </div>
                   <div className='content-down'>
                        <div className='options'>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-hospital"></i></div>
                                <div className='text-child'><FormattedMessage id="banner.child1" defaultMessage="Khám chuyên khoa"/></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-mobile-alt"></i></div>
                                <div className='text-child'><FormattedMessage id="banner.child2" defaultMessage="Khám từ xa"/></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-procedures"></i></div>
                                <div className='text-child'><FormattedMessage id="banner.child3" defaultMessage="Khám tổng quát"/></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-flask"></i></div>
                                <div className='text-child'><FormattedMessage id="banner.child4" defaultMessage="Xét nghiệm y học"/></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-user-md"></i></div>
                                <div className='text-child'><FormattedMessage id="banner.child5" defaultMessage="Sức khỏe tâm thần"/></div>
                            </div>
                            <div className='option-child'>
                                <div className='icon-child'><i className="fas fa-briefcase-medical"></i></div>
                                <div className='text-child'><FormattedMessage id="banner.child6" defaultMessage="Khám nha khoa"/></div>
                            </div>
                        </div>
                     </div>
                </div>
                }
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
