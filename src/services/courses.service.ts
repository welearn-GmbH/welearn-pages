import {CLIENT_URLS} from '../core/http/endpoints.client';
import {http} from '../core/http/http';
import {ICategoriesResponse, ICategoryCoursesResponse} from './courses.model';

export const NEW_COURSE_SLUG = 'NEW_COURSE_SLUG';

class CoursesService {
    static getCategories = async () => {
        const {data} = await http.get<ICategoriesResponse>(
            CLIENT_URLS.CATEGORIES,
        );
        return data;
    };

    static getCoursesForCategory = async (
        categorySlug: string = NEW_COURSE_SLUG,
        offset = 0,
        limit = 5,
    ) => {
        const params =
            categorySlug === NEW_COURSE_SLUG
                ? {
                      offset,
                      limit,
                      orderOne: 'releaseDate:desc',
                      isNew: true,
                  }
                : {offset, limit, categorySlug: [categorySlug]};

        const {data} = await http.get<ICategoryCoursesResponse>(
            CLIENT_URLS.COURSES,
            {
                params,
            },
        );
        return data;
    };

    static getViewedCourses = async (offset: number, limit: number) => {
        const {data} = await http.post(CLIENT_URLS.COURSES_VIEWED, {
            offset: offset,
            limit: limit,
            orderBy: 'updatedAt',
            orderDir: 'DESC',
        });
        return data;
    };

    static getCourse = async (slug: string) => {
        const {data} = await http.get(CLIENT_URLS.COURSE(slug));
        return data;
    };
}

export default CoursesService;
