
import Swiper from 'swiper';
import { Pagination, Navigation } from 'swiper/modules';

const sliderTestimonial = new Swiper('.testimonial__slider', {
    modules: [Pagination],
    slidesPerView: 1,
    initialSlide: 0,
    watchOverflow: true,
    speed: 800,
    loop: true,
    spaceBetween: 30,
    pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
});

const sliderReviews = new Swiper('.reviews__slider', {
  modules: [Pagination, Navigation],
  slidesPerView: 1,
  initialSlide: 0,
  watchOverflow: true,
  speed: 800,
  loop: true,
  spaceBetween: 30,
  pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    768: {
        spaceBetween: 20,
        slidesPerView: 2
    },
    1024: {
      slidesPerView: 3
    },
    1400: {
      slidesPerView: 3,
      spaceBetween: 35
    }
} 
});

const sliderComment = new Swiper('.comment__slider', {
  modules: [Pagination],
  slidesPerView: 'auto',
  initialSlide: 0,
  watchOverflow: true,
  speed: 800,
  loop: true,
  spaceBetween: 20,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
});
