import { FC, Fragment, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Pageheader from "../../layout/layoutcomponent/pageheader";
import { imagesData } from "../../common/commonimages";


import Lightbox from 'yet-another-react-lightbox';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

interface ComponentProps { }

const Gallery: FC<ComponentProps> = () => {

  const [open, setOpen] = useState(false);
  const imageIDs = ['media92', 'media93', 'media94', 'media95', 'media96', 'media97', 'media98', 'media99'];
  return (
    <Fragment>

      <Pageheader title="GALLERY" heading="Apps" active="Gallery" />


      <Row>
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
    </Fragment>
  );
};

export default Gallery;
