export const LOCALIZE_CONST = {
   APP_NAME: "appName",
   ACCOUNT: "account",
   READER_GUIDE: "readerGuide",
   UPLOAD_CHAPTER: "uploadNovel",
   MY_BOOKS: "myBooks",
   LOGOUT: "logout",
   SEARCH_PLACEHOLDER: "searchPlaceholder",
   EDITOR_CHOICES: "editorChoices",
   LATEST_NOVELS: "latestNovels",
   POPULAR_IN_THIS_WEEK: "popularInThisWeek",
   POPULAR_IN_THIS_MONTH: "popularInThisMonth",
   CATEGORIES: "categories",
   ABOUT_US: "aboutUs",
   CONTACT_US: "contactUs",
   CHAPTER_REGISTER: "chapterRegister",
   NOVELS: "novels",
   VOLUME_TITLE: "volumeTitle",
   VOLUME: "volume",
   CHAPTER: "chapter",
   TITLE: "title",
   CONTENT: "content",
   UPLOAD: "upload",
   NOVEL_REGISTER: "novelRegister",
   ORIGINAL_AUTHOR_NAME: "originalAuthorName",
   ORIGINAL_NOVEL_NAME: "originalNovelName",
   DESCRIPTION: "description",
   COVER_IMAGE: "coverImage",
   ONGOING: "ongoing",
   ACCOUNT_REGISTER: "accountRegister",
   NAME: "name",
   EMAIL: "email",
   PASSWORD: "password",
   CONFIRM_PASSWORD: "confirmPassword",
   REGISTER: "register",
   LOGIN: "login",
   IS_HAVE_ACC: "isHaveAccount",
   LOGIN_HERE: "loginHere",
   IS_DONT_HAVE_ACC: "isDontHaveAccount",
   REGISTER_HERE: "registerHere",
   LOADING_POPULAR_NOVELS: "loadingPopulerNovels",
   PICK: "pick",
   READ: "read",
   NO_BOOKMARK: "noBookMark",
   REMOVE: "remove",
}

export const LOCALIZE_CODE = {
   MYANMAR: "mm",
   ENGLISH: "en"
}

export const ROUTES = {
   HOME: "/",
   MY_BOOKS: "/my-books",
   ACCOUNT: "/account",
   READER_GUIDE: "/guides",
   UPLOAD_CHAPTER: "/upload-chapters",
   LOGOUT: "/logout",
   SEARCH: "/search",
   ABOUT_US: "/about-us",
   CONTACT_US: "/contact-us",
   NOVEL_BY_ID: "/novels/:id",
   CHAPTER_BY_ID: "/novels/:novel/volumes/:volume/chapters/:chapter"
}

export const LINKS = [
   {
      icon: "ProfileCircle",
      title: LOCALIZE_CONST.ACCOUNT,
      href: ROUTES.ACCOUNT,
   },
   {
      icon: "SelectFace3d",
      title: LOCALIZE_CONST.READER_GUIDE,
      href: ROUTES.READER_GUIDE,
   },
];

export const FOOTER_LINKS = [
   {
      title: LOCALIZE_CONST.ABOUT_US,
      href: ROUTES.ABOUT_US,
   },
   {
      title: LOCALIZE_CONST.CONTACT_US,
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