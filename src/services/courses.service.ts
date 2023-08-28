const getCourses = async () => {
    return new Promise<string>(resolve => {
        resolve('NICE');
    });
};

export const CoursesService = {
    getCourses,
};
