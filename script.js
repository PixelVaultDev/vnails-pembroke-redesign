import manicureImage from './assets/about.webp';
import pedicureImage from './assets/feature-pedicure.webp';
import acrylicImage from './assets/gallery/gallery-04.webp';
import artImage from './assets/gallery/gallery-03.webp';
import waxingImage from './assets/gallery/gallery-10.webp';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

window.addEventListener('load', () => {
  document.querySelector('.preloader')?.classList.add('hide');
});

const menuToggle = document.querySelector('.menu-toggle');
menuToggle?.addEventListener('click', () => {
  const open = document.body.classList.toggle('nav-open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.primary-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    document.body.classList.remove('nav-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

if (!reduceMotion) {
  const glow = document.querySelector('.cursor-glow');
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let glowX = mouseX;
  let glowY = mouseY;
  window.addEventListener('pointermove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  }, { passive: true });
  const moveGlow = () => {
    glowX += (mouseX - glowX) * 0.12;
    glowY += (mouseY - glowY) * 0.12;
    if (glow) glow.style.transform = `translate3d(${glowX - 210}px, ${glowY - 210}px, 0)`;
    requestAnimationFrame(moveGlow);
  };
  moveGlow();
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });
document.querySelectorAll('.reveal').forEach((item) => revealObserver.observe(item));

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count || 0);
    let current = 0;
    const tick = () => {
      current += Math.max(1, Math.ceil(target / 32));
      if (current >= target) {
        el.textContent = String(target);
      } else {
        el.textContent = String(current);
        requestAnimationFrame(tick);
      }
    };
    tick();
    countObserver.unobserve(el);
  });
}, { threshold: 0.7 });
document.querySelectorAll('[data-count]').forEach((el) => countObserver.observe(el));

if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
  document.querySelectorAll('.tilt-card').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 7).toFixed(2)}deg) translateY(-4px)`;
    });
    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
    });
  });

  document.querySelectorAll('.magnetic').forEach((item) => {
    item.addEventListener('pointermove', (event) => {
      const rect = item.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      item.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
    });
    item.addEventListener('pointerleave', () => {
      item.style.transform = '';
    });
  });
}

const serviceData = {
  manicure: {
    title: 'Manicure',
    copy: 'Classic polish, shellac, polish changes, and simple nail care.',
    image: manicureImage,
    alt: 'Detailed manicure set at V Nails Spa'
  },
  pedicure: {
    title: 'Pedicure',
    copy: 'Relaxing foot care and fresh polish for clean, comfortable toes.',
    image: pedicureImage,
    alt: 'Pedicure nail art at V Nails Spa'
  },
  acrylic: {
    title: 'Acrylic & Dip',
    copy: 'Full sets, refills, dip powder, ombre, removals, and repairs.',
    image: acrylicImage,
    alt: 'Detailed acrylic nail art'
  },
  art: {
    title: 'Nail Art',
    copy: 'Simple accents, seasonal designs, colours, and custom details.',
    image: artImage,
    alt: 'Pink nail art set'
  },
  waxing: {
    title: 'Waxing',
    copy: 'Brows, lip, chin, face, arms, legs, underarms, and bikini line.',
    image: waxingImage,
    alt: 'Pink hand nail design at V Nails Spa'
  }
};
const serviceTitle = document.querySelector('#service-title');
const serviceCopy = document.querySelector('#service-copy');
const serviceImage = document.querySelector('#service-image');
document.querySelectorAll('.service-pill').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.service-pill').forEach((b) => b.classList.remove('active'));
    button.classList.add('active');
    const item = serviceData[button.dataset.service];
    if (!item || !serviceTitle || !serviceCopy || !serviceImage) return;
    serviceImage.classList.add('swap');
    window.setTimeout(() => {
      serviceTitle.textContent = item.title;
      serviceCopy.textContent = item.copy;
      serviceImage.src = item.image;
      serviceImage.alt = item.alt;
      serviceImage.classList.remove('swap');
    }, 160);
  });
});

document.querySelectorAll('.price-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.priceTab;
    document.querySelectorAll('.price-tab').forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');
    document.querySelectorAll('.price-panel').forEach((panel) => {
      panel.classList.toggle('active', panel.dataset.panel === target);
    });
  });
});

if (!reduceMotion) {
  const parallaxItems = document.querySelectorAll('[data-parallax]');
  const updateParallax = () => {
    const scrollY = window.scrollY;
    parallaxItems.forEach((item) => {
      const speed = Number(item.dataset.parallax || 0);
      item.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
    });
  };
  window.addEventListener('scroll', updateParallax, { passive: true });
  updateParallax();
}
