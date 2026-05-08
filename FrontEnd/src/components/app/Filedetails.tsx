import { FC, Fragment, useState } from 'react';
import { Card, Col, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { imagesData } from '../../common/commonimages';
import Pageheader from '../../layout/layoutcomponent/pageheader';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import Lightbox from 'yet-another-react-lightbox';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

interface ComponentProps { }

const Filedetails: FC<ComponentProps> = () => {

  const [open, setOpen] = useState(false);
  const imageIDs = ['media92', 'media93', 'media94', 'media95', 'media96', 'media97', 'media98', 'media99'];

  return (
    <Fragment>


      <Pageheader title="FILE DETAILS" heading="Apps" active="File details" />

      <Row className=" row-sm">
        <Col xxl={8} xl={12} lg={12} md={12}>
          <Card className="custom-card overflow-hidden">
            <Card.Body className=" px-4 pt-4">
              <Link to={`${import.meta.env.BASE_URL}advancedui/blogdetails/`}>
                <img
                  src={imagesData('photo32')}
                  alt=""
                  className="cover-image br-7 w-100"
                />
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={12} xl={12} lg={12} xxl={4}>
          <Card className="custom-card">
            <Card.Body>
              <h5 className="mb-3">File details :</h5>
              <div className="">
                <Row className="">
                  <Col xl={12}>
                    <div className="table-responsive">
                      <Table className="table mb-0 border-top table-bordered text-nowrap">
                        <tbody>
                          <tr>
                            <th scope="row">File-name</th>
                            <td>image.jpg</td>
                          </tr>
                          <tr>
                            <th scope="row">File-size</th>
                            <td>12.45mb</td>
                          </tr>
                          <tr>
                            <th scope="row">uploaded-date</th>
                            <td>01-12-2020</td>
                          </tr>
                          <tr>
                            <th scope="row">uploaded-by</th>
                            <td>prityy abodh</td>
                          </tr>
                          <tr>
                            <th scope="row">image-width</th>
                            <td>1000</td>
                          </tr>
                          <tr>
                            <th scope="row">image-height</th>
                            <td>600</td>
                          </tr>
                          <tr>
                            <th scope="row">File-formate</th>
                            <td>jpg</td>
                          </tr>
                          <tr>
                            <th scope="row">File-location</th>
                            <td>storage/photos/image.jpg</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xxl={8} xl={12} lg={12} md={12}>
          <Card className="custom-card">
            <Card.Body className="h-100">
              <Swiper
                slidesPerView={4}
                spaceBetween={30}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Navigation, Autoplay]}
                className="mySwiper"
              >
                <SwiperSlide>
                  <img src={imagesData('photo44')} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={imagesData('photo45')} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={imagesData('photo46')} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={imagesData('photo47')} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={imagesData('photo48')} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={imagesData('photo44')} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={imagesData('photo46')} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={imagesData('photo48')} alt="" />
                </SwiperSlide>
              </Swiper>
            </Card.Body>
          </Card>
        </Col>
        <Col md={12} xl={12} lg={12} xxl={4}>
          <Card className="custom-card">
            <Card.Body className="">
              <h5 className="mb-3">Recent Files</h5>
              <Row className=" row-sm file-detailimg">

                {imageIDs.map((imageID, index) => (
                  <Col key={index} lg={3} md={3} sm={6} col={12} className="brick">
                    <img src={imagesData(imageID)} alt={`media${index + 1}`} onClick={() => setOpen(true)} className="br-5 my-2" />
                  </Col>
                ))}
                <Lightbox
                  open={open}
                  close={() => setOpen(false)}
                  plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
                  zoom={{
                    maxZoomPixelRatio: 10,
                    scrollToZoom: true
                  }}
                  slides={imageIDs.map(imageID => ({ src: imagesData(imageID) }))}
                />

              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Filedetails;
