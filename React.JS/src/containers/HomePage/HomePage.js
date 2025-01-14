import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import OutandingDoctor from './Section/OutandingDoctor';
import HandBook from './Section/HandBook';
import About from './Section/About';
import HomeFooter from '../HomePage/HomeFooter';
import '../HomePage/HomePage.scss';
class HomePage extends Component {

    render() {
       

        return (
            <div>
                <HomeHeader isShowBanner={true}/>
                <Specialty/>
                <MedicalFacility/>
                <OutandingDoctor/>
                <HandBook/>
                <About/>
                <HomeFooter/>
            </div>
           
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
