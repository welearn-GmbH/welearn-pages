import {CoursesService} from '../../../../services/courses.service';

const Page = async () => {
    const data = await CoursesService.getCourses();
    return <div>{data}</div>;
};

export default Page;
