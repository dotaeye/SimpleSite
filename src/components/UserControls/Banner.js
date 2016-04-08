import React from 'react';
import { Link } from 'react-router';
import { Carousel } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

var Banner = React.createClass({
  render() {
    return (
      <Carousel>
        <Carousel.Item className='bg-item' style={{backgroundImage:'url("/static/images/carousel-1.png")'}}>
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className='bg-item' style={{backgroundImage:'url("/static/images/carousel-2.png")'}}>
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className='bg-item' style={{backgroundImage:'url("/static/images/carousel-3.png")'}}>
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
});

export default Banner;




