'use client';

import {useQuery} from '@tanstack/react-query';
import {FC} from 'react';
import {QueryKey} from '../../../../../core/query/queryKeys';
import CoursesService from '../../../../../services/courses.service';
import Category from './Category';

interface ICoursesCategoriesProps {}

const CoursesCategories: FC<ICoursesCategoriesProps> = () => {
    const {data, isLoading} = useQuery(
        [QueryKey.COURSES_CATEGORIES],
        CoursesService.getCategories,
        {staleTime: 10000, refetchOnWindowFocus: false},
    );

    if (isLoading) {
        return <p>LOADING.................................</p>;
    }

    return (
        <div>
            <h1>Categories</h1>
            {data?.categoryItemList.map(category => (
                <Category category={category} />
            ))}
        </div>
    );
};

export default CoursesCategories;
