/**
 * Kali Hotel & Restaurant - Interactive Frontend Logic
 * Janakpur Dham, Nepal
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMenuTabs();
  initToastNotification();
  initQuickBookingModal();
  initImageLightbox();
  initScrollEffects();
});

// 1. Mobile Navbar Toggle
function initNavbar() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link-mobile');

  if (!mobileMenuBtn || !mobileMenu) return;

  mobileMenuBtn.addEventListener('click', () => {
    const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
    mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.classList.toggle('hidden');

    // Toggle icon
    const openIcon = document.getElementById('menu-icon-open');
    const closeIcon = document.getElementById('menu-icon-close');
    if (openIcon && closeIcon) {
      openIcon.classList.toggle('hidden');
      closeIcon.classList.toggle('hidden');
    }
  });

  // Close when clicking nav links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      const openIcon = document.getElementById('menu-icon-open');
      const closeIcon = document.getElementById('menu-icon-close');
      if (openIcon && closeIcon) {
        openIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      }
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

// 2. Menu Category Tab Filter
function initMenuTabs() {
  const tabButtons = document.querySelectorAll('.menu-tab-btn');
  const dishCards = document.querySelectorAll('.dish-card');

  if (!tabButtons.length || !dishCards.length) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedCategory = btn.getAttribute('data-category');

      // Update active states
      tabButtons.forEach(b => {
        b.classList.remove('bg-gold-primary', 'text-navy-base', 'font-bold', 'shadow-lg');
        b.classList.add('text-slate-300', 'hover:text-gold-light', 'bg-slate-800/60');
        b.setAttribute('aria-selected', 'false');
      });

      btn.classList.add('bg-gold-primary', 'text-navy-base', 'font-bold', 'shadow-lg');
      btn.classList.remove('text-slate-300', 'bg-slate-800/60');
      btn.setAttribute('aria-selected', 'true');

      // Filter dishes with opacity transition
      dishCards.forEach(card => {
        const itemCategory = card.getAttribute('data-category');
        if (selectedCategory === 'all' || itemCategory === selectedCategory) {
          card.classList.remove('hidden');
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.classList.add('hidden');
          }, 250);
        }
      });
    });
  });
}

// 3. Toast Notification Helper
function showToast(message, duration = 3500) {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'fixed bottom-24 md:bottom-8 right-4 md:right-8 z-50 transform translate-y-10 opacity-0 pointer-events-none transition-all duration-300 flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-900/95 border border-amber-400/40 text-amber-200 text-sm font-medium shadow-2xl backdrop-blur-md';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg class="w-5 h-5 text-amber-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
    </svg>
    <span>${message}</span>
  `;

  // Trigger show
  toast.classList.remove('translate-y-10', 'opacity-0', 'pointer-events-none');
  toast.classList.add('translate-y-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-10', 'opacity-0', 'pointer-events-none');
  }, duration);
}

// Global copy phone function
window.copyPhoneNumber = function (phoneText) {
  const number = phoneText || '+9779854025213';
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(number).then(() => {
      showToast(`Phone number copied: ${number}. Call or WhatsApp us anytime!`);
    }).catch(() => {
      promptToCall(number);
    });
  } else {
    // Fallback
    promptToCall(number);
  }
};

function promptToCall(number) {
  window.location.href = `tel:${number}`;
}

// 4. Quick WhatsApp Booking Modal (Zero form friction, direct WhatsApp connection)
function initQuickBookingModal() {
  const modal = document.getElementById('whatsapp-modal');
  const openButtons = document.querySelectorAll('.open-whatsapp-modal');
  const closeButton = document.getElementById('close-whatsapp-modal');
  const modalBackdrop = document.getElementById('whatsapp-modal-backdrop');

  if (!modal) return;

  const openModal = (defaultType = 'table') => {
    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');

    // Select default type radio if present
    const radio = document.querySelector(`input[name="booking-type"][value="${defaultType}"]`);
    if (radio) {
      radio.checked = true;
      updateWhatsappPreview();
    }
  };

  const closeModal = () => {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  };

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const type = btn.getAttribute('data-type') || 'table';
      openModal(type);
    });
  });

  if (closeButton) closeButton.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  // Type change listeners
  const typeRadios = document.querySelectorAll('input[name="booking-type"]');
  const guestSelect = document.getElementById('wa-guests');
  const occasionInput = document.getElementById('wa-occasion');
  const sendBtn = document.getElementById('wa-send-btn');

  function updateWhatsappPreview() {
    const selectedType = document.querySelector('input[name="booking-type"]:checked')?.value || 'table';
    const guests = guestSelect ? guestSelect.value : '2-4 Guests';
    const note = occasionInput ? occasionInput.value.trim() : '';

    let text = '';
    if (selectedType === 'table') {
      text = `Hello Kali Hotel! I would like to book a table for ${guests} at Kali Hotel & Restaurant, Janakpur Dham. ${note ? 'Note: ' + note : ''} Please confirm availability.`;
    } else if (selectedType === 'celebration') {
      text = `Hello Kali Hotel! I would like to book a private cabin for a Birthday / Anniversary celebration for ${guests} with balloon decoration. ${note ? 'Special request: ' + note : ''} Please let me know available slots and packages.`;
    } else {
      text = `Hello Kali Hotel & Restaurant! I would like to inquire about food orders and specials. ${note ? note : ''}`;
    }

    const previewElement = document.getElementById('wa-preview-text');
    if (previewElement) {
      previewElement.textContent = text;
    }

    if (sendBtn) {
      const url = `https://wa.me/9779854025213?text=${encodeURIComponent(text)}`;
      sendBtn.setAttribute('href', url);
    }
  }

  typeRadios.forEach(r => r.addEventListener('change', updateWhatsappPreview));
  if (guestSelect) guestSelect.addEventListener('change', update2Preview);
  if (occasionInput) occasionInput.addEventListener('input', updateWhatsappPreview);

  // Initial update
  updateWhatsappPreview();
}

// 5. Image Lightbox for Food & Celebrations
function initImageLightbox() {
  const lightbox = document.getElementById('image-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('close-lightbox');
  const clickableImages = document.querySelectorAll('.zoomable-image');

  if (!lightbox || !lightboxImg) return;

  clickableImages.forEach(img => {
    img.addEventListener('click', () => {
      const src = img.getAttribute('src');
      const alt = img.getAttribute('alt') || 'Kali Hotel & Restaurant Image';
      lightboxImg.src = src;
      lightboxImg.alt = alt;
      if (lightboxCaption) lightboxCaption.textContent = alt;
      lightbox.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    });
  });

  const closeLightbox = () => {
    lightbox.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  };

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-backdrop')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
      closeLightbox();
    }
  });
}

// 6. Scroll Effects & Active Navbar Highlights
function initScrollEffects() {
  const navbar = document.getElementById('main-navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('bg-slate-950/90', 'border-amber-400/20', 'shadow-2xl');
      navbar.classList.remove('bg-transparent', 'border-transparent');
    } else {
      navbar.classList.remove('bg-slate-950/90', 'border-amber-400/20', 'shadow-2xl');
      navbar.classList.add('bg-transparent', 'border-transparent');
    }
  }, { passive: true });
}
