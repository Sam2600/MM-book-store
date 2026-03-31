import i18n from "i18next";
import { initReactI18next } from "react-i18next"; // Bindings for React: allow components to re-render when language changes.
import { LOCALIZE_CODE } from "../consts/Consts.js";

i18n
   // Add React bindings as a plugin.
   .use(initReactI18next)
   // Initialize the i18next instance.
   .init({
      // Config options

      // Specifies the default language (locale) used
      // when a user visits our site for the first time.
      // We use English here, but feel free to use
      // whichever locale you want.                   
      lng: LOCALIZE_CODE.MYANMAR,

      // Fallback locale used when a translation is
      // missing in the active locale. Again, use your
      // preferred locale here. 
      fallbackLng: LOCALIZE_CODE.ENGLISH,

      // Enables useful output in the browser’s
      // dev console.
      debug: false,

      // Normally, we want `escapeValue: true` as it
      // ensures that i18next escapes any code in
      // translation messages, safeguarding against
      // XSS (cross-site scripting) attacks. However,
      // React does this escaping itself, so we turn 
      // it off in i18next.
      interpolation: {
         escapeValue: false,
      },

      resources: {
         // English
         en: {
            translation: {
               ABOUT_US: "About Us",
               ACCOUNT: "Account",
               CHECK_YOUR_EMAIL: "Check Your Email",
               CHECK_SPAM_FOLDER: "Don't forget to check your spam folder.",
               EMAIL_VERIFIED_SUCCESS: "Email Verified Successfully!",
               EMAIL_VERIFIED_EXPIRED: "Verification Link Expired",
               EMAIL_VERIFIED_INVALID: "Invalid Verification Link",
               GO_TO_LOGIN: "Go to Login",
               RESEND_EMAIL: "Resend Email",
               RESEND_EMAIL_SUCCESS: "A new verification email has been sent!",
               RESEND_IN: "Resend in",
               VERIFICATION_EMAIL_SENT: "We've sent a verification link to your email. Click the link to activate your account.",
               ACCOUNT_REGISTER: "Account Register",
               APP_NAME: "MM-BOOK-STORE",
               BACK: "Back",
               CATEGORIES: "Categories",
               CHAPTER: "Chapter",
               CHAPTER_REGISTER: "Chapter Register",
               CONFIRM_PASSWORD: "Confirm Password",
               CONTACT_US: "Contact Us",
               CONTENT: "Content",
               COVER_IMAGE: "Cover Image",
               DESCRIPTION: "Description",
               EDITOR_CHOICES: "Editor's choices",
               EDIT_PROFILE: "Edit profile",
               EMAIL: "Email",
               HOME: "Home",
               IS_DONT_HAVE_ACC: "Don't have an account?",
               IS_HAVE_ACC: "Already have an account?",
               LATEST_NOVELS: "Latest novels",
               LOADING_POPULAR_NOVELS: "Loading Popular Novels...",
               LOGIN: "Login",
               LOGIN_HERE: "Login Here",
               LOGOUT: "Logout",
               MY_BOOKS: "My Books",
               MY_PROFILE: "My profile",
               NAME: "Name",
               NEXT: "Next",
               NO_BOOKMARK: "There is no book yet",
               NOVEL: "Novel",
               NOVEL_REGISTER: "Novel Register",
               NOVELS: "Novels",
               NO_BOOKS_FOUND: "Currently no books found",
               ONGOING: "Onging",
               ORIGINAL_AUTHOR_NAME: "Original Author Name",
               ORIGINAL_NOVEL_NAME: "Original Novel Name",
               PASSWORD: "Password",
               PICK: "Pick",
               POPULAR_IN_THIS_MONTH: "Popular this month",
               POPULAR_IN_THIS_WEEK: "Popular this week",
               READ: "Read",
               READER_GUIDE: "Reader Guide",
               REGISTER: "Register",
               REGISTER_AS_AUTHOR: "Register as Author",
               REGISTER_HERE: "Register Here!",
               REMOVE: "Remove",
               SEARCH_PLACEHOLDER: "Search for books...",
               SIGN_IN: "Sign In",
               TITLE: "Title",
               UPLOAD: "Upload",
               UPLOAD_CHAPTER: "Upload Novel",
               VOLUME: "Volume",
               VOLUME_TITLE: "Volume Title"
            }
         },
         // Burmese
         mm: {
            translation: {
               ABOUT_US: "ကျုပ်တို့အကြောင်း",
               ACCOUNT: "အကောင့်",
               CHECK_YOUR_EMAIL: "အီးမေးလ်ကို စစ်ဆေးပါ",
               CHECK_SPAM_FOLDER: "Spam folder ကိုလည်း စစ်ဆေးပါ။",
               EMAIL_VERIFIED_SUCCESS: "အီးမေးလ် အတည်ပြုမှု အောင်မြင်ပြီ!",
               EMAIL_VERIFIED_EXPIRED: "အတည်ပြုလင့်၏ သက်တမ်း ကုန်ဆုံးပြီ",
               EMAIL_VERIFIED_INVALID: "မမှန်ကန်သော အတည်ပြုလင့်",
               GO_TO_LOGIN: "အကောင့်ဝင်မည်",
               RESEND_EMAIL: "အီးမေးလ် ပြန်ပို့မည်",
               RESEND_EMAIL_SUCCESS: "အတည်ပြုအီးမေးလ်အသစ် ပေးပို့ပြီးပါပြီ!",
               RESEND_IN: "ပြန်ပို့နိုင်မည့်အချိန်",
               VERIFICATION_EMAIL_SENT: "သင်၏ အီးမေးလ်သို့ အတည်ပြုလင့်တစ်ခု ပေးပို့ပြီးပါပြီ။ လင့်ကို နှိပ်၍ အကောင့်ကို အသက်သွင်းပါ။",
               ACCOUNT_REGISTER: "အကောင့်အသစ် စာရင်းသွင်း",
               APP_NAME: "MM-BOOK-STORE",
               BACK: "နောက်သို့",
               CATEGORIES: "စာပေ အမျိုးအစား",
               CHAPTER: "အပိုင်း",
               CHAPTER_REGISTER: "အပိုင်းသစ် စာတင်",
               CONFIRM_PASSWORD: "စကား၀ှက် အတည်ပြု",
               CONTACT_US: "ဆက်သွယ်ရန်",
               CONTENT: "စာပိုဒ်",
               COVER_IMAGE: "စာအုပ်အဖုံး",
               DESCRIPTION: "အကြောင်းအရာ",
               EDITOR_CHOICES: "အယ်ဒီတာ စိတ်ကြိုက်များ",
               EDIT_PROFILE: "အကောင့်အပ်ဒိတ်",
               EMAIL: "အီးမေးလိပ်စာ",
               HOME: "ပင်မ",
               IS_DONT_HAVE_ACC: "အကောင့်မလုပ်ရသေးဘူးလား?",
               IS_HAVE_ACC: "အကောင့်ရှိပြီးသားလား?",
               LATEST_NOVELS: "နောက်ဆုံး ထွက်ရှိထားသည်များ",
               LOADING_POPULAR_NOVELS: "နာမည်ကြီး စာစဥ်များ ယူနေသည်...",
               LOGIN: "အကောင့်၀င်မည်",
               LOGIN_HERE: "ဒီမှာ လော့အင် ၀င်ပါ",
               LOGOUT: "ထွက်မည်",
               MY_BOOKS: "သိမ်းထားသည့် စာအုပ်များ",
               MY_PROFILE: "မိမိအကောင့်",
               NAME: "နာမည်",
               NEXT: "ရှေ့သို့",
               NO_BOOKMARK: "မှတ်ထားသောစာအုပ် မရှိသေးပါ..",
               NOVEL: "စာစဥ်",
               NOVEL_REGISTER: "စာစဥ်အသစ် စာရင်းသွင်း",
               NOVELS: "စာစဥ်များ",
               NO_BOOKS_FOUND: "လတ်တလောတွင် စာစဥ်မရှိပါ",
               ONGOING: "ရေးနေဆဲ",
               ORIGINAL_AUTHOR_NAME: "မူရင်း ဆရာ၏ ကလောင်",
               ORIGINAL_NOVEL_NAME: "မူရင်း စာစဥ်၏ အမည်",
               PASSWORD: "စကား၀ှက်",
               PICK: "စာစဥ်ရွေးပါ",
               POPULAR_IN_THIS_MONTH: "တစ်လအတွင်း လူကြိုက်အများဆုံး",
               POPULAR_IN_THIS_WEEK: "တစ်ပတ်အတွင်း လူကြိုက်အများဆုံး",
               READ: "ဖတ်မယ်",
               READER_GUIDE: "စာဖတ်သူ လမ်းညွှန်",
               REGISTER: "စာရင်းသွင်း",
               REGISTER_AS_AUTHOR: "စာရေးသူ အဖြစ် မှတ်ပုံတင်မည်",
               REGISTER_HERE: "ဒီမှာ စာရင်းသွင်းပါ!",
               REMOVE: "ဖျက်မည်",
               SEARCH_PLACEHOLDER: "စာအုပ်များ ရှာဖွေပါ",
               SIGN_IN: "အကောင့်၀င်မည်",
               TITLE: "ခေါင်းစဥ်",
               UPLOAD: "တင်မယ်",
               UPLOAD_CHAPTER: "စာတင်မယ်",
               VOLUME: "စာအုပ်",
               VOLUME_TITLE: "စာအုပ်ခေါင်းစဥ်"
            }
         }
      },
   });

export default i18n;