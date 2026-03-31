export const LOCALIZE_CONST = {
   ABOUT_US: "ABOUT_US",
   ACCOUNT: "ACCOUNT",
   ACCOUNT_REGISTER: "ACCOUNT_REGISTER",
   APP_NAME: "APP_NAME",
   BACK: "BACK",
   CHECK_YOUR_EMAIL: "CHECK_YOUR_EMAIL",
   CHECK_SPAM_FOLDER: "CHECK_SPAM_FOLDER",
   EMAIL_VERIFIED_SUCCESS: "EMAIL_VERIFIED_SUCCESS",
   EMAIL_VERIFIED_EXPIRED: "EMAIL_VERIFIED_EXPIRED",
   EMAIL_VERIFIED_INVALID: "EMAIL_VERIFIED_INVALID",
   GO_TO_LOGIN: "GO_TO_LOGIN",
   RESEND_EMAIL: "RESEND_EMAIL",
   RESEND_EMAIL_SUCCESS: "RESEND_EMAIL_SUCCESS",
   RESEND_IN: "RESEND_IN",
   VERIFICATION_EMAIL_SENT: "VERIFICATION_EMAIL_SENT",
   CATEGORIES: "CATEGORIES",
   CHAPTER: "CHAPTER",
   CHAPTER_REGISTER: "CHAPTER_REGISTER",
   CONFIRM_PASSWORD: "CONFIRM_PASSWORD",
   CONTACT_US: "CONTACT_US",
   CONTENT: "CONTENT",
   COVER_IMAGE: "COVER_IMAGE",
   DESCRIPTION: "DESCRIPTION",
   EDITOR_CHOICES: "EDITOR_CHOICES",
   EDIT_PROFILE: "EDIT_PROFILE",
   EMAIL: "EMAIL",
   HOME: "HOME",
   IS_DONT_HAVE_ACC: "IS_DONT_HAVE_ACC",
   IS_HAVE_ACC: "IS_HAVE_ACC",
   LATEST_NOVELS: "LATEST_NOVELS",
   LOADING_POPULAR_NOVELS: "LOADING_POPULAR_NOVELS",
   LOGIN: "LOGIN",
   LOGIN_HERE: "LOGIN_HERE",
   LOGOUT: "LOGOUT",
   MY_BOOKS: "MY_BOOKS",
   MY_PROFILE: "MY_PROFILE",
   NAME: "NAME",
   NEXT: "NEXT",
   NO_BOOKMARK: "NO_BOOKMARK",
   NOVEL: "NOVEL",
   NOVEL_REGISTER: "NOVEL_REGISTER",
   NOVELS: "NOVELS",
   NO_BOOKS_FOUND: "NO_BOOKS_FOUND",
   ONGOING: "ONGOING",
   ORIGINAL_AUTHOR_NAME: "ORIGINAL_AUTHOR_NAME",
   ORIGINAL_NOVEL_NAME: "ORIGINAL_NOVEL_NAME",
   PASSWORD: "PASSWORD",
   PICK: "PICK",
   POPULAR_IN_THIS_MONTH: "POPULAR_IN_THIS_MONTH",
   POPULAR_IN_THIS_WEEK: "POPULAR_IN_THIS_WEEK",
   READ: "READ",
   READER_GUIDE: "READER_GUIDE",
   REGISTER: "REGISTER",
   REGISTER_AS_AUTHOR: "REGISTER_AS_AUTHOR",
   REGISTER_HERE: "REGISTER_HERE",
   REMOVE: "REMOVE",
   SEARCH_PLACEHOLDER: "SEARCH_PLACEHOLDER",
   SIGN_IN: "SIGN_IN",
   TITLE: "TITLE",
   UPLOAD: "UPLOAD",
   UPLOAD_CHAPTER: "UPLOAD_CHAPTER",
   VOLUME: "VOLUME",
   VOLUME_TITLE: "VOLUME_TITLE"
}

export const LOCALIZE_CODE = {
   MYANMAR: "mm",
   ENGLISH: "en"
}

export const ROUTES = {
   AUTHOR_PROFILE: "/author-profile",
   CHECK_EMAIL: "/check-email",
   EMAIL_VERIFIED: "/email-verified",
   ABOUT_US: "/about-us",
   CHAPTER_BY_ID: "/novels/:novel/volumes/:volume/chapters/:chapter",
   CONTACT_US: "/contact-us",
   GET_AUTHOR_INFO_NOVELS: "/author/:id",
   GET_BOOKMARK_COLLECTION: "/getBookMarkedCollection",
   GET_USER_INFO: "/me",
   HOME: "/",
   LOGOUT: "/logout",
   MY_BOOKS: "/my-books",
   MY_PROFILE: "/my-profile",
   NOVEL_BY_AUTHORS: "/novelsByAuthors",
   NOVEL_BY_ID: "/novels/:id",
   NOVELS_BY_CATEGORY: "/categories/:category/novels",
   NOVELS: "/novels",
   RATE_NOVEL: "/novels/:id/rate",
   READER_GUIDE: "/guides",
   SEARCH: "/search",
   REGISTER_AUTHOR: "/register-author",
   SIGN_IN: "/sign-in",
   TO_AUTHOR: "/author/:id",
   USER_PROFILE: "/user-profile",
   UPLOAD_CHAPTER: "/upload-chapters",
   UPDATE_CHAPTER: "/update-chapters/:novelId/:chapterId",
}

export const LINKS = [
   {
      icon: "SelectFace3d",
      title: LOCALIZE_CONST.READER_GUIDE,
      href: ROUTES.READER_GUIDE,
   },
];

export const FOOTER_LINKS = [
   {
      title: LOCALIZE_CONST.ABOUT_US,
      isLink: true,
      href: ROUTES.ABOUT_US,
   },
   {
      title: LOCALIZE_CONST.CONTACT_US,
      isLink: false,
      href: ROUTES.CONTACT_US,
   },
]

export const UPLOAD_MENU = {
   icon: "CloudUpload",
   title: LOCALIZE_CONST.UPLOAD_CHAPTER,
   href: ROUTES.UPLOAD_CHAPTER,
};

export const BOOKMARK_MENU = {
   icon: "MultiplePages",
   title: LOCALIZE_CONST.MY_BOOKS,
   href: ROUTES.MY_BOOKS,
}

export const DEFAULT_IMG_CHAR = "https://placehold.co/128x128/374151/FFFFFF?text=:char";

export const CONTACT_US = {
   FACEBOOK: "https://facebook.com/",
   TELEGRAM: "https://web.telegram.org/k/",
   MAIL: "mailto:someone@example.com"
}