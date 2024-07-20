import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/scrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline();


const isIntro = document.querySelector('.intro');

if (isIntro) {
    tl.fromTo('.intro__title', {
        x: -200,
        opacity: 0
    }, {
        x: 0, 
        opacity: 1,
        duration: 1
    }).fromTo('.intro__text', {
        y: 50,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration: 1,
    }, 0.6).fromTo('.intro__link-1', {
        y: 30,
        opacity: 0,
    }, {
        y: 0,
        opacity: 1,
        duration: 1,
    }, 1.6).fromTo('.intro__link-2', {
        y: 30,
        opacity: 0,
    }, {
        y: 0,
        opacity: 1,
        duration: 1,
    }, 1.2).fromTo('.nav__list li', {
        y: -50,
        opacity: 0,
    }, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2
    }, 2).fromTo('.intro__mark', {
        scale: 0,
        opacity: 0,
    }, {
        scale: 1,
        opacity: 1,
        duration: 1,
    }, 2)
}


// gsap.to('.intro__box', {
//     scrollTrigger: {
//         trigger: '.intro',
//         start: 'top top',
//         scrub: true,
//     },
//     yPercent: 50, 
//     xPercent: -80,
//     scale: 0.5,
//     opacity: 0,
// })

