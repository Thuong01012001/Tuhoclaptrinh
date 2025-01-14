import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomeHeader';
import './DetailDoctor.scss';
import {getDetailInforDoctor} from '../../../../services/userService';
import { LANGUAGES } from '../../../../utils/constant';
class DetailDoctor extends Component {
    constructor (props) {
        super(props);
        this.state = {
            detailDoctor: '',

        }
    }
    async componentDidMount(){
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id;
            let res = await getDetailInforDoctor(id);
            if(res && res.errCode === 0){
                this.setState({
                    detailDoctor: res.data
                })
            }
        }
    }
    
    render() {
          console.log('check state', this.state)
          let {detailDoctor} = this.state;
          let {language} = this.props;
          let nameVi= '', nameEn = '';
            if(detailDoctor){
            nameVi = `${detailDoctor.positionValueVi}, ${detailDoctor.roleValueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
            nameEn = `${detailDoctor.positionValueEn}, ${detailDoctor.roleValueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;

        }
        return (
           <>
            <HomeHeader isShowBanner={false}/>

            <div className='doctor-detail-container'>
                <div className='intro-doctor'>
                    <div className='content-left' 
                    style={{ backgroundImage: `url(${detailDoctor.image ? detailDoctor.image : ''})` }}>

                    </div>
                    <div className='content-right'>
                        <div className='up'>
                            {detailDoctor && detailDoctor.positionValueVi && detailDoctor.roleValueVi 
                            && detailDoctor.firstName && detailDoctor.lastName

                            &&
                                <span>
                                    {language === LANGUAGES.VI ? nameVi : nameEn}
                                </span>
                            }
                        </div>
                        <div className='down'>
                            {detailDoctor && detailDoctor.description
                            && 
                                <span>
                                    {detailDoctor.description}
                                </span>
                            }
                        </div>

                    </div>

                </div>
                <div className='schedule-doctor'>

                </div>
                <div className='detail-info-doctor'>
                    {detailDoctor && detailDoctor.contentMarkdown && detailDoctor.contentHTML
                    &&
                        <div dangerouslySetInnerHTML={{__html: detailDoctor.contentHTML}}/>
                    
                    }
                    

                </div>
                <div className='comment-doctor'>

                </div>
            </div>
           </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
      
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
