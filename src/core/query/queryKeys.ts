export const QueryKey = {
    COURSES_CATEGORIES: 'COURSES_CATEGORIES',
    CATEGORY_COURSES: (categorySlug: string) =>
        'CATEGORY_COURSES_' + categorySlug,
    COURSE: (slug: string) => 'COURSE-' + slug,
};
