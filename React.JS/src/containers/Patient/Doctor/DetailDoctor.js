import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss';
import { getDetailInforDoctor } from '../../../services/userService';
import { LANGUAGES } from '../../../utils/constant';
import HomeFooter from '../../HomePage/HomeFooter';

class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: '',
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailInforDoctor(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data
                })
            }
        }
    }

    render() {
        let { detailDoctor } = this.state;
        let { language } = this.props;
        let nameVi = '', nameEn = '';
        if (detailDoctor) {
            nameVi = `${detailDoctor.positionValueVi}, ${detailDoctor.roleValueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
            nameEn = `${detailDoctor.positionValueEn}, ${detailDoctor.roleValueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
        }

        return (
            <div className="doctor-detail-container">
                <HomeHeader isShowBanner={false} />
                <div className='intro-doctor'>
                    <div className='content-left'
                        style={{ backgroundImage: `url(${detailDoctor.image ? detailDoctor.image : ''})` }}>

                    </div>
                    <div className='content-right'>
                        <div className='up'>
                            {detailDoctor && detailDoctor.positionValueVi && detailDoctor.roleValueVi &&
                                detailDoctor.firstName && detailDoctor.lastName &&
                                <span>
                                    {language === LANGUAGES.VI ? nameVi : nameEn}
                                </span>
                            }
                        </div>
                        <div className='down'>
                            {detailDoctor.Markdown && detailDoctor.Markdown[0].description &&
                                <span>
                                    {detailDoctor.Markdown[0].description}
                                </span>
                            }
                        </div>
                    </div>
                </div>
                <div className='schedule-doctor'>
                    {/* Có thể thêm thông tin lịch khám ở đây */}
                </div>
                <div className='detail-info-doctor'>
                    {detailDoctor.Markdown && detailDoctor.Markdown[0].contentHTML &&
                        <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown[0].contentHTML }} />
                    }
                </div>
                <div className='comment-doctor'>
                    {/* Các phần bình luận có thể được thêm vào đây */}
                </div>
                <HomeFooter />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
