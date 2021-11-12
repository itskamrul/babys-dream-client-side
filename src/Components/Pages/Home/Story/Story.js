import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Story = () => {
  return (
    <div
      style={{
        backgroundColor: '#F6F6F6',
        padding: '40px 0',
        marginTop: '50px',
      }}
    >
      <Container>
        <Row className="g-2">
          <Col md={6}>
            <img
              className=" rounded-2"
              style={{ width: '550px' }}
              src="https://hmadmin.hostx1.de/cms_images/1620133789Spreading-the-joy.jpg"
              alt=""
            />
          </Col>
          <Col className="d-flex text-start align-items-center" md={6}>
            <div>
              <h2 style={{ color: '#A8854A' }}>Spreading the joy</h2>
              <p>
                Never in his wildest dreams would William Hamley have imagined
                how far and wide Hamleys would spread. Today, there are 170
                Hamleys shops in over 18 countries, like UK, India, UAE, China
                and Russia that offer children an abundance of fine toys to
                choose from.
              </p>
            </div>
          </Col>
        </Row>
        <Row className="g-2 mt-5">
          <Col className="d-flex text-start align-items-center" md={6}>
            <div>
              <h2 style={{ color: '#A8854A' }}>A delightful experience</h2>
              <p>
                Every Hamleys store offers children a magical experience, and
                adults the rare chance to be children again. It’s where they get
                to play with toys, watch live demos of toys, and interact with
                their favourite toy characters.
              </p>
            </div>
          </Col>
          <Col md={6}>
            <img
              className=" rounded-2"
              style={{ width: '550px' }}
              src="https://hmadmin.hostx1.de/cms_images/1620133809A-delightful-experience.jpg"
              alt=""
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Story;
