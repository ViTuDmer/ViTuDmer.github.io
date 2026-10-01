/**
 * Cookie Consent System - Binary (All or Nothing)
 * Implements strict RGPD/CCPA compliance with localStorage persistence
 * Supports bilingual (Spanish/English) pages
 */

const COOKIE_KEY = 'cookie_consent_status';
const CONSENT_EXPIRY_DAYS = 180;

// Cookie banner elements
let banner = null;
let btnAccept = null;
let btnReject = null;

// Translations
const TRANSLATIONS = {
  es: {
    bannerText: 'Utilizamos cookies analíticas y de marketing para mejorar tu experiencia. <a href="politicas.html" style="color: #007bff; text-decoration: underline;" target="_blank">Políticas de cookies</a>',
    btnAccept: 'Aceptar todo',
    btnReject: 'Rechazar todo'
  },
  en: {
    bannerText: 'We use analytical and marketing cookies to improve your experience. <a href="policies.html" style="color: #007bff; text-decoration: underline;" target="_blank">Cookie policies</a>',
    btnAccept: 'Accept all',
    btnReject: 'Reject all'
  }
};

/**
 * Detect current page language from HTML lang attribute
 */
function detectLanguage() {
  const html = document.documentElement;
  const lang = html.getAttribute('lang') || 'es';
  return lang.startsWith('es') ? 'es' : 'en';
}

/**
 * Set consent status in localStorage with expiration
 */
function setConsentStatus(status) {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + CONSENT_EXPIRY_DAYS);
  localStorage.setItem(COOKIE_KEY, status);
  localStorage.setItem(COOKIE_KEY + '_expiry', expiryDate.toISOString());
}

/**
 * Check if consent cookie has expired
 */
function isConsentExpired() {
  const expiry = localStorage.getItem(COOKIE_KEY + '_expiry');
  if (!expiry) return true;
  
  const expiryDate = new Date(expiry);
  return new Date() > expiryDate;
}

/**
 * Get current consent status
 */
function getConsentStatus() {
  const status = localStorage.getItem(COOKIE_KEY);
  
  // If no status or expired, return null (undecided)
  if (!status || isConsentExpired()) {
    return null;
  }
  
  return status;
}

/**
 * Show the cookie consent banner
 */
function showConsentBanner() {
  if (!banner) return;
  
  banner.style.display = 'block';
  
  // Scroll to bottom to ensure banner is visible
  setTimeout(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }, 100);
}

/**
 * Hide the cookie consent banner
 */
function hideConsentBanner() {
  if (!banner) return;
  
  banner.style.display = 'none';
}

/**
 * Load tracking scripts (Google Analytics, Meta Pixel, etc.)
 * Only called after user accepts cookies
 */
function loadTrackingScripts() {
  console.log('Consentimiento otorgado: Cargando scripts de seguimiento');
  
  // Google Tag Manager
  if (!document.querySelector('#gtm-script')) {
    const gtmScript = document.createElement('script');
    gtmScript.id = 'gtm-script';
    gtmScript.async = true;
    gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-KB4LZ9W6';
    document.head.appendChild(gtmScript);
    
    // Initialize dataLayer after script loads
    gtmScript.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', 'GTM-KB4LZ9W6');
    };
  }
  
  console.log('Scripts de seguimiento cargados');
}

/**
 * Initialize cookie consent system
 */
function initCookieConsent() {
  // Get existing consent status
  const currentConsent = getConsentStatus();
  
  if (currentConsent === 'ACCEPTED') {
    // User previously accepted - load tracking scripts
    loadTrackingScripts();
  } else if (currentConsent === 'REJECTED') {
    // User previously rejected - keep scripts blocked
    console.log('Consentimiento rechazado: Scripts de seguimiento bloqueados');
  } else {
    // No consent yet - show banner
    showConsentBanner();
  }
}

/**
 * Setup event listeners for banner buttons
 */
function setupBannerListeners() {
  if (!btnAccept || !btnReject) return;
  
  // Accept all cookies
  btnAccept.addEventListener('click', () => {
    setConsentStatus('ACCEPTED');
    hideConsentBanner();
    loadTrackingScripts();
    if (typeof dataLayer !== 'undefined') {
      dataLayer.push({ event: 'cookie_consent', consent_status: 'accepted' });
    }
  });
  
  // Reject all non-essential cookies
  btnReject.addEventListener('click', () => {
    setConsentStatus('REJECTED');
    hideConsentBanner();
    if (typeof dataLayer !== 'undefined') {
      dataLayer.push({ event: 'cookie_consent', consent_status: 'rejected' });
    }
  });
}

/**
 * Inject cookie banner into DOM with translated text
 */
function injectBanner() {
  const lang = detectLanguage();
  const t = TRANSLATIONS[lang];
  
  const bannerHTML = `
        <div id="cookie-banner" style="display: none; position: fixed; bottom: 0; left: 0; width: 100%; background: #1a1a1a; color: white; padding: 20px; text-align: center; z-index: 9999; box-shadow: 0 -4px 12px rgba(0,0,0,0.15);">
            <div style="max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 16px;">
                <p style="margin: 0; font-size: 16px; line-height: 1.5; text-align: center;">
                    ${t.bannerText}
                </p>
                <div style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center;">
                    <button id="btn-reject" style="background: #333; color: white; padding: 12px 24px; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 500; transition: background 0.2s;">
                        ${t.btnReject}
                    </button>
                    <button id="btn-accept" style="background: #007bff; color: white; padding: 12px 24px; border: none; border-radius: 6px; cursor: pointer; font-size: 14px; font-weight: 500; transition: background 0.2s;">
                        ${t.btnAccept}
                    </button>
                </div>
            </div>
        </div>
    `;
  
  // Insert banner before closing body tag
  const body = document.body;
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = bannerHTML;
  body.appendChild(tempDiv.firstElementChild);
  
  // Cache references
  banner = document.getElementById('cookie-banner');
  btnAccept = document.getElementById('btn-accept');
  btnReject = document.getElementById('btn-reject');
}

/**
 * Initialize on DOM ready
 */
function cookieConsentReady() {
  // Check if already initialized
  if (banner) return;
  
  // Inject banner
  injectBanner();
  
  // Setup listeners
  setupBannerListeners();
  
  // Initialize consent check
  initCookieConsent();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', cookieConsentReady);
} else {
  cookieConsentReady();
}

// Export for potential external use
window.CookieConsent = {
  getConsentStatus,
  loadTrackingScripts,
  setConsentStatus
};
