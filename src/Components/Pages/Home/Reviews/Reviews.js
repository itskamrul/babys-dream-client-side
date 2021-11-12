import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Container, Row } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import Rating from 'react-rating';
// import 'swiper/css';
import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle.min.css';

// import Swiper core and required modules
import SwiperCore, { Pagination } from 'swiper';

// install Swiper modules
SwiperCore.use([Pagination]);

const reviewss = [
  {
    name: 'hello world',
    dec: 'lorem20 lorem30as;dfjk asdoiasf aiosdfj apof dofiu sapdoif paosidif asddfoi asdofiuj uasdofi sadfopi dfsio  psdfoi sfad sdfpoi asdf dfsoi sdfpo adfujufd  poasidf sadfopi ufu asd asfdpoiujfru asdfpoi s spdofiu fsa asdfpoi  asdfoipu fsadfpioufdsa sa dfo;iasdf  usadf poidf sasdf fuif rf dfasoifse  fasd opifds   e usdfpoife wuasdf poiafji  sadfpoiasfe u  uasdfpoifsdaju er uasdfpoifdw u erwqpojhisef ui poisdf   u  djhiofds fjafioj aoief er u',
  },
  {
    name: 'hello world',
    dec: 'lorem20 lorem30as;dfjk asdoiasf aiosdfj apof dofiu sapdoif paosidif asddfoi asdofiuj uasdofi sadfopi dfsio  psdfoi sfad sdfpoi asdf dfsoi sdfpo adfujufd  poasidf sadfopi ufu asd asfdpoiujfru asdfpoi s spdofiu fsa asdfpoi  asdfoipu fsadfpioufdsa sa dfo;iasdf  usadf poidf sasdf fuif rf dfasoifse  fasd opifds   e usdfpoife wuasdf poiafji  sadfpoiasfe u  uasdfpoifsdaju er uasdfpoifdw u erwqpojhisef ui poisdf   u  djhiofds fjafioj aoief er u',
  },
  {
    name: 'hello world',
    dec: 'lorem20 lorem30as;dfjk asdoiasf aiosdfj apof dofiu sapdoif paosidif asddfoi asdofiuj uasdofi sadfopi dfsio  psdfoi sfad sdfpoi asdf dfsoi sdfpo adfujufd  poasidf sadfopi ufu asd asfdpoiujfru asdfpoi s spdofiu fsa asdfpoi  asdfoipu fsadfpioufdsa sa dfo;iasdf  usadf poidf sasdf fuif rf dfasoifse  fasd opifds   e usdfpoife wuasdf poiafji  sadfpoiasfe u  uasdfpoifsdaju er uasdfpoifdw u erwqpojhisef ui poisdf   u  djhiofds fjafioj aoief er u',
  },
  {
    name: 'hello world',
    dec: 'lorem20 lorem30as;dfjk asdoiasf aiosdfj apof dofiu sapdoif paosidif asddfoi asdofiuj uasdofi sadfopi dfsio  psdfoi sfad sdfpoi asdf dfsoi sdfpo adfujufd  poasidf sadfopi ufu asd asfdpoiujfru asdfpoi s spdofiu fsa asdfpoi  asdfoipu fsadfpioufdsa sa dfo;iasdf  usadf poidf sasdf fuif rf dfasoifse  fasd opifds   e usdfpoife wuasdf poiafji  sadfpoiasfe u  uasdfpoifsdaju er uasdfpoifdw u erwqpojhisef ui poisdf   u  djhiofds fjafioj aoief er u',
  },
  {
    name: 'hello world',
    dec: 'lorem20 lorem30as;dfjk asdoiasf aiosdfj apof dofiu sapdoif paosidif asddfoi asdofiuj uasdofi sadfopi dfsio  psdfoi sfad sdfpoi asdf dfsoi sdfpo adfujufd  poasidf sadfopi ufu asd asfdpoiujfru asdfpoi s spdofiu fsa asdfpoi  asdfoipu fsadfpioufdsa sa dfo;iasdf  usadf poidf sasdf fuif rf dfasoifse  fasd opifds   e usdfpoife wuasdf poiafji  sadfpoiasfe u  uasdfpoifsdaju er uasdfpoifdw u erwqpojhisef ui poisdf   u  djhiofds fjafioj aoief er u',
  },
  {
    name: 'hello world',
    dec: 'lorem20 lorem30as;dfjk asdoiasf aiosdfj apof dofiu sapdoif paosidif asddfoi asdofiuj uasdofi sadfopi dfsio  psdfoi sfad sdfpoi asdf dfsoi sdfpo adfujufd  poasidf sadfopi ufu asd asfdpoiujfru asdfpoi s spdofiu fsa asdfpoi  asdfoipu fsadfpioufdsa sa dfo;iasdf  usadf poidf sasdf fuif rf dfasoifse  fasd opifds   e usdfpoife wuasdf poiafji  sadfpoiasfe u  uasdfpoifsdaju er uasdfpoifdw u erwqpojhisef ui poisdf   u  djhiofds fjafioj aoief er u',
  },
  {
    name: 'hello world',
    dec: 'lorem20 lorem30as;dfjk asdoiasf aiosdfj apof dofiu sapdoif paosidif asddfoi asdofiuj uasdofi sadfopi dfsio  psdfoi sfad sdfpoi asdf dfsoi sdfpo adfujufd  poasidf sadfopi ufu asd asfdpoiujfru asdfpoi s spdofiu fsa asdfpoi  asdfoipu fsadfpioufdsa sa dfo;iasdf  usadf poidf sasdf fuif rf dfasoifse  fasd opifds   e usdfpoife wuasdf poiafji  sadfpoiasfe u  uasdfpoifsdaju er uasdfpoifdw u erwqpojhisef ui poisdf   u  djhiofds fjafioj aoief er u',
  },
  {
    name: 'hello world',
    dec: 'lorem20 lorem30as;dfjk asdoiasf aiosdfj apof dofiu sapdoif paosidif asddfoi asdofiuj uasdofi sadfopi dfsio  psdfoi sfad sdfpoi asdf dfsoi sdfpo adfujufd  poasidf sadfopi ufu asd asfdpoiujfru asdfpoi s spdofiu fsa asdfpoi  asdfoipu fsadfpioufdsa sa dfo;iasdf  usadf poidf sasdf fuif rf dfasoifse  fasd opifds   e usdfpoife wuasdf poiafji  sadfpoiasfe u  uasdfpoifsdaju er uasdfpoifdw u erwqpojhisef ui poisdf   u  djhiofds fjafioj aoief er u',
  },
];

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/reviews')
      .then(res => res.json())
      .then(data => {
        setReviews(data);
      });
  }, []);

  let card = 3;

  const isWindow = useMediaQuery({ query: '(max-width: 768px)' });
  if (isWindow) {
    card = 1;
  } else {
    card = 3;
  }

  return (
    <div className="mt-5">
      <Container>
        <Row>
          <h2 className="text-center my-5">What They're Saying</h2>
        </Row>
        <Swiper
          slidesPerView={card}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          className="mySwiper"
        >
          {reviews.map(review => (
            <SwiperSlide className="border border-3 mt-2 text-center p-3 mb-5 rounded">
              <div>
                <Rating
                  emptySymbol="far fa-star text-warning"
                  fullSymbol="fas fa-star text-warning"
                  initialRating={review.rating}
                  readonly
                />
                <h4 className="text-capitalize mb-2">{review.name}</h4>
                <p>{review.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </div>
  );
};

export default Reviews;
