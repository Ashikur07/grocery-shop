// আপনার হার্ডকোডেড ইউজারনেম ও পাসওয়ার্ড
const HARDCODED_EMAIL = 'admin@gmail.com';
const HARDCODED_PASS = 'admin1234';
const STORAGE_KEY = 'grocery_auth_token';
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000; // ৭ দিনের সময়

/**
 * লগইন করার চেষ্টা করে
 */
export const login = (email, password) => {
  if (email === HARDCODED_EMAIL && password === HARDCODED_PASS) {
    // লগইন সফল হলে, ৭ দিনের মেয়াদ সহ একটি টোকেন সেভ করুন
    const expiry = new Date().getTime() + SEVEN_DAYS_MS;
    const item = {
      isLoggedIn: true,
      expiry: expiry,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(item));
    return true;
  }
  return false;
};

/**
 * লগআউট করে
 */
export const logout = () => {
  localStorage.removeItem(STORAGE_KEY);
};

/**
 * চেক করে যে ইউজার লগইন করা আছে কিনা
 */
export const isAuthenticated = () => {
  const itemStr = localStorage.getItem(STORAGE_KEY);
  if (!itemStr) {
    return false;
  }
  try {
    const item = JSON.parse(itemStr);
    const now = new Date().getTime();
    
    if (now > item.expiry) {
      // যদি টোকেনের মেয়াদ শেষ হয়ে যায়
      localStorage.removeItem(STORAGE_KEY);
      return false;
    }
    return item.isLoggedIn;
  } catch (e) {
    // যদি localStorage-এ ভুল ডেটা থাকে
    localStorage.removeItem(STORAGE_KEY);
    return false;
  }
};