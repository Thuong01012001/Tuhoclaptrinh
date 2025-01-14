import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../HomePage/HomePage.scss';
import { ModalFooter } from 'reactstrap';



class About extends Component {

    render() {
    
        return (
            <div className='home-footer'>
                 <p>© 2025 Nguyễn Bá Thượng. More information, please visit my facebook <a target="_blank" href="https://www.facebook.com/thuong.ba.9849912"> → Click here ←</a></p>
                   
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
