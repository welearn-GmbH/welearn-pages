export interface ICategoriesResponse {
    categoryItemList: ICategory[];
}

export interface ICategory {
    categoryId: number;
    categoryName: string;
    categorySlug: string;
}

export interface ICategoryCoursesResponse {
    courseCards: ICourse[];
}

export interface ICourse {
    courseId: number;
    courseTitle: string;
    courseSlug: string;
    courseDescription: string;
    courseTrailerSrc: string;
    courseImage: string;
    courseImageFocusPositionX: number | null;
    courseImageFocusPositionY: number | null;
    courseImageAlt: string;
    courseDuration: number;
    courseRidingDifficulty: string[];
    courseBenefitsList: string[];
    courseMainCategory: {
        categoryId: number;
        categoryName: string;
        categorySlug: string;
        categoryIcon: string;
        categoryIconFocusPositionX: number | null;
        categoryIconFocusPositionY: number | null;
        categoryIconAlt: string;
        categoryColor: string;
    };
    courseVideoCount: number;
    courseNew: boolean;
    userId: number;
    progress: number;
    hasModules?: false;
}
