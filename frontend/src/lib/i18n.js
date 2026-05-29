// Bengali language support
const translations = {
  bn: {
    common: {
      appName: 'অন্নপূর্ণা ভাণ্ডার',
      welcome: 'স্বাগতম',
      logout: 'লগআউট',
      dashboard: 'ড্যাশবোর্ড',
      profile: 'প্রোফাইল',
      settings: 'সেটিংস',
      language: 'ভাষা',
    },
    auth: {
      login: 'লগইন করুন',
      register: 'নিবন্ধন করুন',
      forgotPassword: 'পাসওয়ার্ড ভুলে গেছেন?',
      enterMobile: 'মোবাইল নম্বর প্রবেশ করুন',
      enterOTP: 'OTP প্রবেশ করুন',
      sendOTP: 'OTP পাঠান',
      verifyOTP: 'OTP যাচাই করুন',
      resendOTP: 'OTP পুনরায় পাঠান',
      createPassword: 'পাসওয়ার্ড তৈরি করুন',
      confirmPassword: 'পাসওয়ার্ড নিশ্চিত করুন',
      alreadyHaveAccount: 'ইতিমধ্যে অ্যাকাউন্ট আছে?',
      dontHaveAccount: 'অ্যাকাউন্ট নেই?',
    },
    form: {
      fullName: 'সম্পূর্ণ নাম',
      mobileNumber: 'মোবাইল নম্বর',
      email: 'ইমেইল',
      address: 'ঠিকানা',
      district: 'জেলা',
      submit: 'জমা দিন',
      cancel: 'বাতিল',
      save: 'সংরক্ষণ করুন',
      edit: 'সম্পাদনা করুন',
      delete: 'মুছে ফেলুন',
      required: 'প্রয়োজনীয়',
    },
    errors: {
      invalidMobile: 'অবৈধ মোবাইল নম্বর',
      invalidOTP: 'অবৈধ OTP',
      passwordMismatch: 'পাসওয়ার্ড মেলে না',
      serverError: 'সার্ভার ত্রুটি',
      networkError: 'নেটওয়ার্ক ত্রুটি',
    },
  },
  en: {
    common: {
      appName: 'Annapurna Bhandar',
      welcome: 'Welcome',
      logout: 'Logout',
      dashboard: 'Dashboard',
      profile: 'Profile',
      settings: 'Settings',
      language: 'Language',
    },
    auth: {
      login: 'Login',
      register: 'Register',
      forgotPassword: 'Forgot Password?',
      enterMobile: 'Enter Mobile Number',
      enterOTP: 'Enter OTP',
      sendOTP: 'Send OTP',
      verifyOTP: 'Verify OTP',
      resendOTP: 'Resend OTP',
      createPassword: 'Create Password',
      confirmPassword: 'Confirm Password',
      alreadyHaveAccount: 'Already have an account?',
      dontHaveAccount: "Don't have an account?",
    },
    form: {
      fullName: 'Full Name',
      mobileNumber: 'Mobile Number',
      email: 'Email',
      address: 'Address',
      district: 'District',
      submit: 'Submit',
      cancel: 'Cancel',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      required: 'Required',
    },
    errors: {
      invalidMobile: 'Invalid mobile number',
      invalidOTP: 'Invalid OTP',
      passwordMismatch: 'Passwords do not match',
      serverError: 'Server error',
      networkError: 'Network error',
    },
  },
};

let currentLanguage = 'en';

export const getLanguage = () => currentLanguage;

export const setLanguage = (lang) => {
  currentLanguage = lang;
  localStorage.setItem('language', lang);
};

export const t = (key) => {
  const keys = key.split('.');
  let value = translations[currentLanguage];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
};

export const initLanguage = () => {
  const saved = localStorage.getItem('language');
  if (saved) {
    currentLanguage = saved;
  }
};
