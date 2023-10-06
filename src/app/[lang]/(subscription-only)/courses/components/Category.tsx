import {useQuery} from '@tanstack/react-query';
import {FC} from 'react';
import {QueryKey} from '../../../../../core/query/queryKeys';
import {ICategory} from '../../../../../services/courses.model';
import CoursesService from '../../../../../services/courses.service';
import Course from './Course';

interface ICategoryProps {
    category: ICategory;
}

const Category: FC<ICategoryProps> = ({category}) => {
    const {data, isLoading} = useQuery(
        [QueryKey.CATEGORY_COURSES(category.categorySlug)],
        () => CoursesService.getCoursesForCategory(category.categorySlug),
        {staleTime: 10000, refetchOnWindowFocus: false},
    );

    if (isLoading) {
        return 'wtf';
    }

    return (
        <div style={{marginBottom: '5rem'}}>
            <h2 style={{fontSize: '2rem'}}>
                Category: {category.categoryName}
            </h2>
            <div style={{display: 'flex'}}>
                {data &&
                    data.courseCards.map(course => (
                        <Course course={course} key={course.courseId} />
                    ))}
            </div>
        </div>
    );
};

export default Category;
