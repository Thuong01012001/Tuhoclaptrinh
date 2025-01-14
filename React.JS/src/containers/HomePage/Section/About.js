import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../HomePage/HomePage.scss';



class About extends Component {

    render() {
      

        return (
            <div className='section-specialty section-about'>
                <div className='section-about-header'>
                     Truyền thông nói gì về BookingCare

                </div>
                 <div className='section-about-content'>
                    <div className='content-left'>
                    <iframe
                        width="100%"
                        height="400px"
                        src="https://www.youtube.com/embed/zl1CgOgb1DA"
                        title="Âm nhạc ban đêm cho công việc — Bản phối nhạc trong nhà để xe tương lai sâu sắc để tập trung"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen></iframe>

                    </div>
                    <div className='content-right'>
                        <p>
                        Tăng cường các buổi làm việc ban đêm của bạn với sự kết hợp nhà để xe tương lai sâu sắc này. Được thiết kế để tăng cường sự tập trung và duy trì bầu không khí tập trung, bình tĩnh, danh sách phát này hoàn hảo cho các dự án đêm khuya và năng suất.

                        </p>

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

export default connect(mapStateToProps, mapDispatchToProps)(About);
