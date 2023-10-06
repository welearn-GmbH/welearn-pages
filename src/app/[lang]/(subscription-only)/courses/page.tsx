import {QueryClient} from '@tanstack/react-query';
import {FC} from 'react';
import Prefetcher from '../../../../core/query/Prefetcher';
import {QueryKey} from '../../../../core/query/queryKeys';
import CoursesService from '../../../../services/courses.service';
import CoursesCategories from './components/CoursesCategories';

interface IPageProps {}

const Page: FC<IPageProps> = () => {
    const prefetch = async (queryClient: QueryClient) => {
        const categories = await CoursesService.getCategories();
        queryClient.setQueryData([QueryKey.COURSES_CATEGORIES], categories);
        await Promise.all(
            categories.categoryItemList.map(async category => {
                const courses = await CoursesService.getCoursesForCategory(
                    category.categorySlug,
                );
                queryClient.setQueryData(
                    [QueryKey.CATEGORY_COURSES(category.categorySlug)],
                    courses,
                );
            }),
        );
    };

    return (
        <div>
            <h1>All courses by categories</h1>
            <Prefetcher prefetchQueryFn={prefetch}>
                <CoursesCategories />
            </Prefetcher>
        </div>
    );
};

export default Page;
