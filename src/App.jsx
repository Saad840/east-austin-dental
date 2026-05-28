import React, { useEffect, useState, useRef } from 'react';
import { dentistConfig } from './dentistConfig';
import * as Icons from 'lucide-react';

// Helper component to render Lucide icons by string name from the config
const DynamicIcon = ({ name, className }) => {
  const IconComponent = Icons[name] || Icons.HelpCircle;
  return <IconComponent className={className} />;
};

const FacebookIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
);
const InstagramIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);
const LinkedinIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);
const TwitterIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
);

// 5. Before/After Slider Component
const BeforeAfterSlider = ({ beforeImage, afterImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50);

  return (
    <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden rounded-2xl group select-none shadow-2xl bg-gray-100">
      {/* After Image (Background) */}
      <img
        src={afterImage}
        alt="After Treatment"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Before Image (Clipped on top) */}
      <div
        className="absolute inset-0 w-full h-full object-cover"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={beforeImage}
          alt="Before Treatment"
          className="absolute inset-0 w-full h-full object-cover max-w-none"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,0,0,0.3)] transform -translate-x-1/2 text-[var(--color-primary)] transition-transform group-hover:scale-110">
          <Icons.ChevronsLeftRight className="w-5 h-5" />
        </div>
      </div>

      {/* Invisible Input Range */}
      <input
        type="range"
        min="0" max="100"
        value={sliderPosition}
        onChange={(e) => setSliderPosition(e.target.value)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
      />

      {/* Labels */}
      <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase z-0 pointer-events-none">
        Before
      </div>
      <div className="absolute bottom-4 right-4 bg-[var(--color-primary)]/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase z-0 pointer-events-none">
        After
      </div>
    </div>
  );
};

export default function App() {
  const { colors, practiceName, contact, socialMedia, hero, smileDesign, amenities, services, reviews, cases, doctor, hours } = dentistConfig;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuTriggerRef = useRef(null);
  const drawerRef = useRef(null);

  // Apply CSS variables dynamically to the document root
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-secondary', colors.secondary);
    root.style.setProperty('--color-accent', colors.accent);
    root.style.setProperty('--color-background', colors.background);
    root.style.setProperty('--color-text-muted', colors.textMuted);
  }, [colors]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Handle keyboard events and focus trap when mobile menu is open
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        menuTriggerRef.current?.focus();
      }

      if (e.key === 'Tab' && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll(
          'a[href], button, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Set focus on first item (the close button) when drawer opens
    const focusTimer = setTimeout(() => {
      const focusableElements = drawerRef.current?.querySelectorAll(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements && focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }, 100);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(focusTimer);
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="min-h-screen bg-[var(--color-background)] font-sans text-gray-900 flex flex-col selection:bg-[var(--color-secondary)] selection:text-white">

      {/* 1. Sticky Header */}
      <header className="w-full bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-all border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            {dentistConfig.logoPath ? (
              <img src={dentistConfig.logoPath} alt={`${practiceName} Logo`} className="h-10 md:h-12 w-auto object-contain" />
            ) : (
              <div className="flex items-center font-bold text-2xl tracking-tight text-[var(--color-primary)]">
                <Icons.Hexagon className="text-[var(--color-secondary)] mr-2.5 w-7 h-7" />
                {practiceName}
              </div>
            )}
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#services" className="text-sm font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">Services</a>
            <a href="#about" className="text-sm font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">Our Approach</a>
            <a href="#gallery" className="text-sm font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">Smile Gallery</a>
            <a href="#reviews" className="text-sm font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">Reviews</a>
          </nav>

          {/* CTAs & Mobile Toggle */}
          <div className="flex items-center space-x-3 md:space-x-4">
            <a
              href={`tel:${contact.phone}`}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-[var(--color-accent)] text-[var(--color-primary)] hover:bg-gray-100 active:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:ring-offset-2"
              title="Call us"
              aria-label="Call clinic"
            >
              <Icons.Phone className="w-5 h-5" />
            </a>
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center justify-center bg-[var(--color-primary)] text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:ring-offset-2"
            >
              Book Appointment
            </a>

            {/* Hamburger Menu Toggle Button */}
            <button
              ref={menuTriggerRef}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-[var(--color-accent)] text-[var(--color-primary)] hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:ring-offset-2"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <Icons.X className="w-5 h-5" />
              ) : (
                <Icons.Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        id="mobile-navigation"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
        className={`lg:hidden fixed inset-0 z-50 bg-white/95 backdrop-blur-lg flex flex-col p-6 transition-all duration-300 ease-in-out origin-top ${isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto scale-100'
            : 'opacity-0 pointer-events-none scale-95 translate-y-[-10px]'
          }`}
      >
        {/* Header inside drawer */}
        <div className="flex justify-between items-center pb-6 border-b border-gray-100">
          {/* Logo */}
          <div>
            {dentistConfig.logoPath ? (
              <img src={dentistConfig.logoPath} alt={`${practiceName} Logo`} className="h-10 w-auto object-contain" />
            ) : (
              <div className="flex items-center font-bold text-xl tracking-tight text-[var(--color-primary)]">
                <Icons.Hexagon className="text-[var(--color-secondary)] mr-2.5 w-6 h-6" />
                {practiceName}
              </div>
            )}
          </div>

          {/* Close Button */}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              menuTriggerRef.current?.focus();
            }}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--color-accent)] text-[var(--color-primary)] hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
            aria-label="Close menu"
          >
            <Icons.X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-5 py-8 flex-grow overflow-y-auto">
          <a
            href="#services"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-2xl font-bold text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors flex items-center justify-between py-2 border-b border-gray-50/50 group"
          >
            <span>Services</span>
            <Icons.ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[var(--color-secondary)] transition-all group-hover:translate-x-1" />
          </a>
          <a
            href="#about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-2xl font-bold text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors flex items-center justify-between py-2 border-b border-gray-50/50 group"
          >
            <span>Our Approach</span>
            <Icons.ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[var(--color-secondary)] transition-all group-hover:translate-x-1" />
          </a>
          <a
            href="#gallery"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-2xl font-bold text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors flex items-center justify-between py-2 border-b border-gray-50/50 group"
          >
            <span>Smile Gallery</span>
            <Icons.ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[var(--color-secondary)] transition-all group-hover:translate-x-1" />
          </a>
          <a
            href="#reviews"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-2xl font-bold text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors flex items-center justify-between py-2 border-b border-gray-50/50 group"
          >
            <span>Reviews</span>
            <Icons.ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[var(--color-secondary)] transition-all group-hover:translate-x-1" />
          </a>
        </nav>

        {/* Footer inside mobile menu */}
        <div className="mt-auto pt-6 border-t border-gray-100 space-y-6">
          <a
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full inline-flex items-center justify-center bg-[var(--color-primary)] text-white py-4 rounded-xl font-bold text-lg hover:bg-opacity-90 hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] shadow-md"
          >
            Book Appointment
          </a>
          <div className="grid grid-cols-2 gap-4 text-center">
            <a
              href={`tel:${contact.phone}`}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-[var(--color-accent)] hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
            >
              <Icons.Phone className="w-5 h-5 text-[var(--color-secondary)] mb-1" />
              <span className="text-xs font-bold text-[var(--color-primary)]">Call Practice</span>
            </a>
            <a
              href={contact.googleMapsLink}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-[var(--color-accent)] hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
            >
              <Icons.MapPin className="w-5 h-5 text-[var(--color-secondary)] mb-1" />
              <span className="text-xs font-bold text-[var(--color-primary)]">Directions</span>
            </a>
          </div>

          {/* Hours summary */}
          <div className="text-center text-xs text-[var(--color-text-muted)]">
            Open: Mon - Fri (8am - 6pm) • Sat (9am - 2pm)
          </div>
        </div>
      </div>

      <main className="flex-grow">

        {/* 2. Hero Section */}
        <section className="bg-[var(--color-background)]">
          <div className="relative w-full h-[55vh] md:h-[65vh] overflow-hidden border-b border-gray-200/50">
            {hero.backgroundImage && (
              <img
                src={hero.backgroundImage}
                alt="Practice Hero"
                className="w-full h-full object-cover"
                style={{
                  WebkitMaskImage: 'linear-gradient(180deg, rgba(0,0,0,1) 68%, rgba(0,0,0,0) 100%)',
                  maskImage: 'linear-gradient(180deg, rgba(0,0,0,1) 68%, rgba(0,0,0,0) 100%)'
                }}
              />
            )}
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 md:-mt-20 pt-10 md:pt-12 pb-16 text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold text-[var(--color-primary)] mb-6 tracking-tight leading-[1.1]">
              {hero.headline}
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto mb-10 leading-relaxed">
              {hero.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mx-auto">
              <a href="#contact" className="w-full sm:w-auto inline-flex items-center justify-center bg-[var(--color-secondary)] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                Book Consultation
              </a>
              <a href={`tel:${contact.phone}`} className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-[var(--color-primary)] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all shadow-sm border border-gray-200">
                <Icons.Phone className="w-5 h-5 mr-2" />
                Call Now
              </a>
            </div>
          </div>
        </section>

        {/* 3. Smile Design Feature */}
        <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative rounded-2xl overflow-hidden shadow-2xl bg-gray-100 aspect-[4/3] flex items-center justify-center">
              {/* Using an unplash image as placeholder for the high-tech scanner if no path provided */}
              <img src={smileDesign.imagePath} alt={smileDesign.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-primary)]/80 to-transparent mix-blend-multiply"></div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-sm font-bold tracking-widest text-[var(--color-secondary)] uppercase mb-3">Advanced Workflow</h2>
              <h3 className="text-3xl font-extrabold text-[var(--color-primary)] mb-6 leading-tight">{smileDesign.title}</h3>
              <p className="text-lg text-[var(--color-text-muted)] mb-8 leading-relaxed">
                {smileDesign.description}
              </p>
              <ul className="space-y-4">
                {smileDesign.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-accent)] flex items-center justify-center mt-0.5 mr-4">
                      <Icons.Check className="w-4 h-4 text-[var(--color-secondary)]" />
                    </div>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 4. Services Section */}
        <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-accent)] border-y border-gray-200/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-sm font-bold tracking-widest text-[var(--color-secondary)] uppercase mb-3">Clinical Excellence</h2>
              <h3 className="text-4xl font-extrabold text-[var(--color-primary)] leading-tight">Comprehensive Services</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div key={service.id} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-14 h-14 rounded-xl bg-[var(--color-accent)] flex items-center justify-center mb-6 group-hover:bg-[var(--color-primary)] transition-colors">
                    <DynamicIcon name={service.icon} className="w-7 h-7 text-[var(--color-primary)] group-hover:text-[var(--color-secondary)] transition-colors" />
                  </div>
                  <h4 className="text-xl font-bold text-[var(--color-primary)] mb-3">{service.name}</h4>
                  <p className="text-[var(--color-text-muted)] leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Before / After Gallery */}
        <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-sm font-bold tracking-widest text-[var(--color-secondary)] uppercase mb-3">Real Results</h2>
              <h3 className="text-4xl font-extrabold text-[var(--color-primary)] leading-tight">Smile Gallery</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {cases.map((caseItem) => (
                <div key={caseItem.id} className="flex flex-col">
                  <BeforeAfterSlider beforeImage={caseItem.beforeImage} afterImage={caseItem.afterImage} />
                  <div className="mt-6 px-2">
                    <h4 className="text-xl font-bold text-[var(--color-primary)] mb-2">{caseItem.title}</h4>
                    <p className="text-[var(--color-text-muted)]">{caseItem.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Doctor Profile */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-primary)] text-white">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5 relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-white/10 shadow-2xl relative z-10">
                {/* Provide Unsplash fallback if no doctor image */}
                <img src={doctor.imagePath || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80"} alt={doctor.name} className="w-full h-full object-cover" />
              </div>
              {/* Decorative block */}
              <div className="absolute -bottom-6 -right-6 w-3/4 h-3/4 bg-[var(--color-secondary)] rounded-2xl z-0 hidden md:block"></div>
            </div>
            <div className="md:col-span-7 md:pl-8">
              <h2 className="text-sm font-bold tracking-widest text-[var(--color-secondary)] uppercase mb-3">Meet Your Dentist</h2>
              <h3 className="text-4xl font-extrabold mb-4">{doctor.name}</h3>
              <p className="text-sm font-medium tracking-wide text-white/60 mb-8 uppercase">{doctor.credentials}</p>
              <div className="text-lg text-white/80 leading-relaxed space-y-6">
                <p>{doctor.bio}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Technology & Comfort */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-sm font-bold tracking-widest text-[var(--color-secondary)] uppercase mb-3">Hospitality Focused</h2>
            <h3 className="text-4xl font-extrabold text-[var(--color-primary)] mb-6 leading-tight">{amenities.title}</h3>
            <p className="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto mb-16">{amenities.description}</p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {amenities.items.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center p-6 bg-[var(--color-accent)] rounded-2xl border border-gray-100 hover:border-[var(--color-secondary)]/30 transition-colors">
                  <DynamicIcon name={item.icon} className="w-8 h-8 text-[var(--color-primary)] mb-4" />
                  <span className="text-sm font-semibold text-gray-800 text-center">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Real Google Reviews */}
        <section id="reviews" className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-accent)] border-y border-gray-200/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-sm font-bold tracking-widest text-[var(--color-secondary)] uppercase mb-3">Patient Stories</h2>
              <h3 className="text-4xl font-extrabold text-[var(--color-primary)] leading-tight">Experiences</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
                  <div className="flex text-[var(--color-secondary)] mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Icons.Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6 italic flex-grow">"{review.text}"</p>
                  <div className="mt-auto border-t border-gray-100 pt-4 flex justify-between items-center">
                    <span className="font-bold text-[var(--color-primary)]">{review.name}</span>
                    <span className="text-xs text-[var(--color-text-muted)]">{review.date}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <a href={contact.googleMapsLink} target="_blank" rel="noreferrer" className="inline-flex items-center text-[var(--color-primary)] font-bold hover:text-[var(--color-secondary)] transition-colors">
                Read more reviews on Google <Icons.ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </section>

        {/* 9. High-Conversion Contact Form */}
        <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Contact Information Side */}
            <div>
              <h2 className="text-sm font-bold tracking-widest text-[var(--color-secondary)] uppercase mb-3">Get in Touch</h2>
              <h3 className="text-4xl font-extrabold text-[var(--color-primary)] mb-8 leading-tight">Ready for a better dental experience?</h3>

              <div className="space-y-8 mb-12">
                <a href={contact.googleMapsLink} target="_blank" rel="noreferrer" className="flex items-start group">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-accent)] flex items-center justify-center mr-5 group-hover:bg-[var(--color-primary)] transition-colors flex-shrink-0">
                    <Icons.MapPin className="w-5 h-5 text-[var(--color-primary)] group-hover:text-[var(--color-secondary)] transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Visit Us</h4>
                    <p className="text-lg font-medium text-[var(--color-primary)] group-hover:text-[var(--color-secondary)] transition-colors leading-relaxed max-w-xs">{contact.address}</p>
                  </div>
                </a>

                <a href={`tel:${contact.phone}`} className="flex items-start group">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-accent)] flex items-center justify-center mr-5 group-hover:bg-[var(--color-primary)] transition-colors flex-shrink-0">
                    <Icons.Phone className="w-5 h-5 text-[var(--color-primary)] group-hover:text-[var(--color-secondary)] transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Call Us</h4>
                    <p className="text-lg font-medium text-[var(--color-primary)] group-hover:text-[var(--color-secondary)] transition-colors">{contact.phone}</p>
                  </div>
                </a>

                <a href={`mailto:${contact.email}`} className="flex items-start group">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-accent)] flex items-center justify-center mr-5 group-hover:bg-[var(--color-primary)] transition-colors flex-shrink-0">
                    <Icons.Mail className="w-5 h-5 text-[var(--color-primary)] group-hover:text-[var(--color-secondary)] transition-colors" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Email Us</h4>
                    <p className="text-lg font-medium text-[var(--color-primary)] group-hover:text-[var(--color-secondary)] transition-colors">{contact.email}</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Form Side */}
            <div className="bg-[var(--color-accent)] p-8 md:p-10 rounded-3xl border border-gray-100 shadow-xl">
              <h4 className="text-2xl font-bold text-[var(--color-primary)] mb-6">Request an Appointment</h4>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="name">Full Name</label>
                    <input type="text" id="name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent transition-all" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent transition-all" placeholder="(555) 000-0000" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="email">Email Address</label>
                  <input type="email" id="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent transition-all" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="service">Service of Interest</label>
                  <select id="service" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent transition-all bg-white text-gray-700">
                    <option value="">Select a service...</option>
                    {services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    <option value="general">General Inquiry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="message">Message (Optional)</label>
                  <textarea id="message" rows="3" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:border-transparent transition-all resize-none" placeholder="How can we help you?"></textarea>
                </div>
                <button type="submit" className="w-full bg-[var(--color-primary)] text-white py-4 rounded-xl font-bold text-lg hover:bg-opacity-90 transition-all shadow-md mt-2 flex justify-center items-center">
                  Submit Request <Icons.ArrowRight className="w-5 h-5 ml-2" />
                </button>
                <p className="text-xs text-center text-[var(--color-text-muted)] mt-4">We will contact you shortly to confirm your appointment time.</p>
              </form>
            </div>

          </div>
        </section>
      </main>

      {/* 10. Footer */}
      <footer className="bg-[var(--color-primary)] text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-6 text-white flex items-center">
              <Icons.Hexagon className="text-[var(--color-secondary)] mr-2.5 w-6 h-6" />
              {practiceName}
            </h3>
            <p className="text-sm text-white/70 leading-relaxed mb-8">
              Elevating the standard of modern dentistry. We combine advanced clinical techniques with uncompromising comfort.
            </p>
            <div className="flex space-x-4">
              {socialMedia.facebook && (
                <a href={socialMedia.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-secondary)] hover:text-white transition-all text-white/80">
                  <FacebookIcon className="w-4 h-4" />
                </a>
              )}
              {socialMedia.instagram && (
                <a href={socialMedia.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-secondary)] hover:text-white transition-all text-white/80">
                  <InstagramIcon className="w-4 h-4" />
                </a>
              )}
              {socialMedia.linkedin && (
                <a href={socialMedia.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-secondary)] hover:text-white transition-all text-white/80">
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              )}
              {socialMedia.twitter && (
                <a href={socialMedia.twitter} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-secondary)] hover:text-white transition-all text-white/80">
                  <TwitterIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-6 tracking-wide">Quick Links</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><a href="#about" className="hover:text-[var(--color-secondary)] transition-colors flex items-center"><Icons.ChevronRight className="w-3 h-3 mr-2 opacity-50" /> Our Approach</a></li>
              <li><a href="#services" className="hover:text-[var(--color-secondary)] transition-colors flex items-center"><Icons.ChevronRight className="w-3 h-3 mr-2 opacity-50" /> Services</a></li>
              <li><a href="#gallery" className="hover:text-[var(--color-secondary)] transition-colors flex items-center"><Icons.ChevronRight className="w-3 h-3 mr-2 opacity-50" /> Smile Gallery</a></li>
              <li><a href="#reviews" className="hover:text-[var(--color-secondary)] transition-colors flex items-center"><Icons.ChevronRight className="w-3 h-3 mr-2 opacity-50" /> Reviews</a></li>
              <li><a href="#contact" className="hover:text-[var(--color-secondary)] transition-colors flex items-center"><Icons.ChevronRight className="w-3 h-3 mr-2 opacity-50" /> Contact Us</a></li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-6 tracking-wide">Contact Us</h4>
            <div className="space-y-4 text-sm text-white/70">
              <a href={contact.googleMapsLink} target="_blank" rel="noreferrer" className="flex items-start hover:text-white transition-colors group">
                <Icons.MapPin className="w-5 h-5 mr-3 text-[var(--color-secondary)] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{contact.address}</span>
              </a>
              <a href={`tel:${contact.phone}`} className="flex items-center hover:text-white transition-colors group">
                <Icons.Phone className="w-5 h-5 mr-3 text-[var(--color-secondary)]" />
                {contact.phone}
              </a>
              <a href={`mailto:${contact.email}`} className="flex items-center hover:text-white transition-colors group">
                <Icons.Mail className="w-5 h-5 mr-3 text-[var(--color-secondary)]" />
                {contact.email}
              </a>
            </div>
          </div>

          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-6 tracking-wide">Hours</h4>
            <div className="space-y-3 text-sm text-white/70">
              {hours.map((hour, i) => (
                <div key={i} className="flex justify-between items-center border-b border-white/10 pb-2 last:border-0 last:pb-0">
                  <span className="font-medium">{hour.day}</span>
                  <span>{hour.time}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-white/50">
          <p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} {practiceName}. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
