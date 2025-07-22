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
               appName: "MM-BOOK-STORE",
               account: "Account",
               readerGuide: "Reader Guide",
               uploadNovel: "Upload Novel",
               myBooks: "My Books",
               logout: "Logout",
               searchPlaceholder: "Search for books...",
               editorChoices: "Editor's choices",
               latestNovels: "Latest novels",
               popularInThisWeek: "Popular this week",
               popularInThisMonth: "Popular this month",
               categories: "Categories",
               aboutUs: "About Us",
               contactUs: "Contact Us",
               chapterRegister: "Chapter Register",
               novels: "Novels",
               volumeTitle: "Volume Title",
               volume: "Volume",
               chapter: "Chapter",
               title: "Title",
               content: "Content",
               upload: "Upload",
               novelRegister: "Novel Register",
               originalAuthorName: "Original Author Name",
               originalNovelName: "Original Novel Name",
               description: "Description",
               coverImage: "Cover Image",
               ongoing: "Onging",
               accountRegister: "Account Register",
               name: "Name",
               email: "Email",
               password: "Password",
               confirmPassword: "Confirm Password",
               register: "Register",
               login: "Login",
               isHaveAccount: "Already have an account?",
               loginHere: "Login Here",
               isDontHaveAccount: "Don't have an account?",
               registerHere: "Register Here!",
               loadingPopulerNovels: "Loading Popular Novels...",
               pick: "Pick",
               read: "Read",
               noBookMark: "There is no book yet",
            },
         },
         // Burmese
         mm: {
            translation: {
               appName: "MM-BOOK-STORE",
               account: "အကောင့်",
               readerGuide: "စာဖတ်သူ လမ်းညွှန်",
               uploadNovel: "စာတင်မယ်",
               myBooks: "သိမ်းထားသည့် စာအုပ်များ",
               logout: "ထွက်မည်",
               searchPlaceholder: "စာအုပ်များ ရှာဖွေပါ",
               editorChoices: "အယ်ဒီတာ စိတ်ကြိုက်များ",
               latestNovels: "နောက်ဆုံး ထွက်ရှိထားသည်များ",
               popularInThisWeek: "တစ်ပတ်အတွင်း လူကြိုက်အများဆုံး",
               popularInThisMonth: "တစ်လအတွင်း လူကြိုက်အများဆုံး",
               categories: "စာပေ အမျိုးအစား",
               aboutUs: "ကျုပ်တို့အကြောင်း",
               contactUs: "ဆက်သွယ်ရန်",
               chapterRegister: "အပိုင်းသစ် စာတင်",
               novels: "စာစဥ်များ",
               volumeTitle: "စာအုပ်ခေါင်းစဥ်",
               volume: "စာအုပ်",
               chapter: "အပိုင်း",
               title: "ခေါင်းစဥ်",
               content: "စာပိုဒ်",
               upload: "တင်မယ်",
               novelRegister: "စာစဥ်အသစ် စာရင်းသွင်း",
               originalAuthorName: "မူရင်း ဆရာ၏ ကလောင်",
               originalNovelName: "မူရင်း စာစဥ်၏ အမည်",
               description: "အကြောင်းအရာ",
               coverImage: "စာအုပ်အဖုံး",
               ongoing: "ရေးနေဆဲ",
               accountRegister: "အကောင့်အသစ် စာရင်းသွင်း",
               name: "နာမည်",
               email: "အီးမေးလိပ်စာ",
               password: "စကား၀ှက်",
               confirmPassword: "စကား၀ှက် အတည်ပြု",
               register: "စာရင်းသွင်း",
               login: "အကောင့်၀င်မည်",
               isHaveAccount: "အကောင့်ရှိပြီးသားလား?",
               loginHere: "ဒီမှာ လော့အင် ၀င်ပါ",
               isDontHaveAccount: "အကောင့်မလုပ်ရသေးဘူးလား?",
               registerHere: "ဒီမှာ စာရင်းသွင်းပါ!",
               loadingPopulerNovels: "နာမည်ကြီး စာစဥ်များ ယူနေသည်...",
               pick: "စာစဥ်ရွေးပါ",
               read: "ဖတ်မယ်",
               noBookMark: "မှတ်ထားသောစာအုပ် မရှိသေးပါ.."
            },
         },
      },
   });

export default i18n;