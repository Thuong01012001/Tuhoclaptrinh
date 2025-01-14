import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../HomePage/HomePage.scss';



class MedicalFacility extends Component {

    render() {
        let settings = {
            dots: false, 
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
        }

        return (
            <div className='section-specialty'>
                <div className='specialty-container'>
                    <div className='specialty-header'>
                        <span className='title-section'>Cơ sở y tế</span>
                        <button className='btn-section'>Xem kiếm</button>
                    </div>
                   <div className='specialty-body'>
                    <Slider {...settings}>
                        <div className="specialty-customize">
                            <div className="bg-image medical-facility-image"/>
                            <h3>Cơ sở y tế 1</h3>
                        </div>
                        <div className="specialty-customize">
                            <div className="bg-image medical-facility-image"/>
                            <h3>Cơ sở y tế 2</h3>
                        </div>
                        <div className="specialty-customize">
                            <div className="bg-image medical-facility-image"/>
                            <h3>Cơ sở y tế 3</h3>
                        </div>
                        <div className="specialty-customize">
                            <div className="bg-image medical-facility-image"/>
                            <h3>Cơ sở y tế 4</h3>
                        </div>
                        <div className="specialty-customize">
                            <div className="bg-image medical-facility-image"/>
                            <h3>Cơ sở y tế 5</h3>
                        </div>
                        <div className="specialty-customize">
                            <div className="bg-image medical-facility-image"/>
                            <h3>Cơ sở y tế 6</h3>
                        </div>
                    </Slider>  
                   </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
       
    };
};

const mapDispatchToProps = dispatch => {
    return {
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
