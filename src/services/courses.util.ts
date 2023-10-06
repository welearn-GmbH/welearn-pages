export const buildCourseRequest = (
    categorySlug: string | null,
    offset: number,
    limit: number,
) => {
    if (categorySlug !== null) {
        return {
            params: {offset, limit, categorySlug: [categorySlug]},
        };
    }
    return {
        params: {offset, limit, orderOne: 'releaseDate:desc', isNew: true},
    };
};
