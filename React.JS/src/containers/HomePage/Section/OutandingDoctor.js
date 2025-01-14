import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../HomePage/HomePage.scss';
import * as actions from '../../../store/actions';
import {LANGUAGES} from '../../../utils/constant';
import { withRouter } from 'react-router-dom';



class OutandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: [],
        }
    }
    componentDidMount() {
        this.props.loadTopDoctors();

    }
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux
            })
        }
        
    }

    handleViewDetailDoctor = (doctor) => {
        console.log('bacsi: ', doctor);
        this.props.history.push(`/detail-doctor/${doctor.id}`);
    }
    render() {
        let arrDoctors = this.state.arrDoctors;
        let { language } = this.props;
        let settings = {
            dots: false, 
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
        }

        return (

            <div className='section-specialty'>
                <div className='specialty-container bg-outanding'>
                    <div className='specialty-header'>
                        <span className='title-section'><FormattedMessage id='homepage.outstanding-doctor' defaultMessage='Bác sĩ nổi bật tuần qua' /></span>
                        <button className='btn-section'><FormattedMessage id='homepage.see-more' defaultMessage='Xem thêm' /></button>
                    </div>
                   <div className='specialty-body'>
                    <Slider {...settings}>
                      
                    {arrDoctors && arrDoctors.length > 0 && 
                        arrDoctors.map((item, index)=>{
                            let imageBase64 = '';
                            if(item.image){
                                imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                            }
                            let nameVi = `${item.positionValueVi} ${item.lastName} ${item.firstName}`;
                            let nameEn = `${item.positionValueEn} ${item.firstName} ${item.lastName}`;
                            return(
                                <div className="specialty-customize" onClick={()=>this.handleViewDetailDoctor(item)}>
                                <div className='outer-bg'>
                                    <div className="bg-image outanding-doctor-image"
                                    style={{ backgroundImage: `url(${imageBase64})` }}
                                    />
                                </div>
                                <div className='position text-center'>
                                    <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                    <div>Phụ Khoa 1</div>
                                </div>  
                            </div>
                            )
                        })
                    }
                    </Slider>  
                   </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.topDoctors,
       
    };
};

const mapDispatchToProps = dispatch => {
    return {
       loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutandingDoctor));
