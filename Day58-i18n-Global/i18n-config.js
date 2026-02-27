// === Internationalization (i18n) ===
// When a user from Japan visits your site, the browser's accept-language header tells you they prefer Japanese.
// Your app should automatically switch its content without a page reload.
// 
// === Translation Keys & Namespaces ===
// 1. Translation Keys: Instead of writing <h1>Hello</h1>, you write <h1>{t('welcome_message')}</h1>.
// 2. JSON Resource Bundles: You maintain separate JSON files for each language (e.g., en.json, hi.json, es.json).
// 3. Pluralization & Interpolation: Handling tricky grammer (e.g., "1 item" vs. "5 items") and inserting dynamic data into translated strings (e.g., "Hello, {{name}}").
// 4. SEO Localization: Using Next.js middleware to handle localized URLs like /en/dashboard vs. /hi/dashboard.


// MICROLAB
// Set up a basic i18next configuration and create a language switcher component that toggles between English and Hindi.
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: { "welcome": "Welcome back, {{name}}!", "logout": "Logout" } },
        hi: { translation: { "welcome": "वापसी पर स्वागत है, {{name}}!", "logout": "लॉगआउट" } }
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false }
});

// usage in React
const { t, i18n } = useTranslation();
return (
    <div>
        <h1>{t('welcome', { name: 'Kunal' })}</h1>
        <button onClick={() => i18n.changeLanguage('h1')}>Hindi</button>
    </div>
);