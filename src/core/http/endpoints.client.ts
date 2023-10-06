export const CLIENT_URLS = {
    LOGIN: `/api/login`,
    LOGOUT: `/api/logout`,
    CHECK_USER_EXISTS: `/api/check_user_exists`,

    CATEGORIES: `/api/category`,
    COURSES: `/api/course`,
    COURSES_VIEWED: `/api/course/viewed`,
    COURSE: (courseSlug: string) => `/api/course/${courseSlug}`,
};
