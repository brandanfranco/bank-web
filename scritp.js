'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//scroll

const btnscrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnscrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

//web navigation with events delegation

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// containers

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsOperations = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;

  tabs.forEach(t => {
    t.classList.remove('operations__tab--active');
  });

  tabsOperations.forEach(c => {
    c.classList.remove('operations__content--active');
  });

  clicked.classList.add('operations__tab--active');

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

const handlerOpacity = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });

    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handlerOpacity.bind(0.5));

nav.addEventListener('mouseout', handlerOpacity.bind(1));

// working with API( intersection Observer, sticky navigation)

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const obsCallBack = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const headerObserver = new IntersectionObserver(obsCallBack, obsOptions);

headerObserver.observe(header);

// sections efect
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

const slide = document.querySelectorAll('.slide');

const buttonLeft = document.querySelector('.slider__btn--left');
const buttonRight = document.querySelector('.slider__btn--right');

const containerDot = document.querySelector('.dots');

let currentSlide = 0;
const maxCurrentSlide = slide.length - 1;

const slider = document.querySelector('.slider');
slider.style.transform = 'scale(1.2) ';
//slider.style.overflow = 'visible';

slide.forEach((s, i) => {
  s.style.transform = `translateX(${100 * i}%)`;
});

buttonRight.addEventListener('click', e => {
  if (currentSlide === maxCurrentSlide) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }

  slide.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - currentSlide)}%)`;
  });
});

buttonLeft.addEventListener('click', e => {
  if (currentSlide === 0) {
    currentSlide = maxCurrentSlide;
  } else {
    currentSlide--;
  }

  slide.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - currentSlide)}%)`;
  });
});

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') {
    if (currentSlide === 0) {
      currentSlide = maxCurrentSlide;
    } else {
      currentSlide--;
    }

    slide.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - currentSlide)}%)`;
    });
  } else if (e.key === 'ArrowRight') {
    if (currentSlide === maxCurrentSlide) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }

    slide.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - currentSlide)}%)`;
    });
  }
});

const creatDots = function () {
  slide.forEach(function (_, i) {
    containerDot.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

creatDots();

containerDot.addEventListener('click', e => {
  if (e.target.classList.contains('dots__dot')) {
    const curr = e.target.dataset.slide;
    slide.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - curr)}%)`;
    });
  }
});
