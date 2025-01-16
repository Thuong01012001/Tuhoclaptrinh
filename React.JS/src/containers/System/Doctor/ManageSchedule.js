import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import { LANGUAGES } from '../../../utils/constant';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions'; 
import DataPicker from '../../../components/Input/DatePicker.js'
import moment from 'moment';

class ManageSchedule extends Component {
    constructor(props){
        super(props)
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: '',

        }
    }
    componentDidMount(){
        this.props.fetchAllDoctor();
        this.props.fetchAllScheduleTime();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect,
            });
        }
        if(prevProps.allScheduleTime !== this.props.allScheduleTime){
            this.setState({
                rangeTime: this.props.allScheduleTime
            })
        }
    
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            if (JSON.stringify(dataSelect) !== JSON.stringify(this.state.listDoctors)) {
                this.setState({
                    listDoctors: dataSelect,
                });
            }
        }
    }
    buildDataInputSelect = (inputData) => {
            let result = [];
            let {language} = this.props;
            if (inputData && inputData.length > 0) {
                inputData.map((item,index) => {
                    let object = {};
                    let labelVi = `${item.lastName} ${item.firstName}`;
                    let labelEn = `${item.firstName} ${item.lastName}`;
                    object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push(object);
                });
            }
            return result;
    }
    handleChange = async (selectedOption) => {
        this.setState({selectedDoctor: selectedOption }); 
    }
    
    handleOnchangeDatePicker= (date) =>{
        this.setState({
           currentDate: date[0]
        })
      
    }
    
    render() {
         console.log('hoi dan it check state', this.state);
        let {rangeTime} = this.state;
        let {language} = this.props;
        return (
            <React.Fragment>
                <div className='manage-schedule-container'>
                    <div className='m-s-title'>
                        <FormattedMessage id="manage-schedule.title"/>
                    </div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="manage-schedule.choose-doctor"/></label>
                                <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChange}
                                options={this.state.listDoctors}
                        />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="manage-schedule.choose-date"/></label>
                                <DataPicker
                                onChange={this.handleOnchangeDatePicker}
                                className="form-control"
                                value={this.state.currentDate[0]}
                                minDate={new Date()}
                                />
                            </div>
                            <div className='col-12 pick-hour-container'>
                               {rangeTime && rangeTime.length && 
                               rangeTime.map((item, index)=>{
                                return (
                                    <button className="btn btn-schedule" key="index">{language === LANGUAGES.VI ? 
                                        item.valueVi : item.valueEn}</button>
                                )
                               })
                               }
                            </div>
                            <div className='col-12'>
                               <button className='btn btn-primary btn-save-schedule'><FormattedMessage id="manage-schedule.choose-save"/></button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
