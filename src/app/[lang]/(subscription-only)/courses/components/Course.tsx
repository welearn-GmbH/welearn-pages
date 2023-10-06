import Image from 'next/image';
import {FC} from 'react';
import {ICourse} from '../../../../../services/courses.model';

interface ICourseProps {
    course: ICourse;
}

const Course: FC<ICourseProps> = ({course}) => {
    return (
        <div
            style={{
                position: 'relative',
                width: 300,
                height: 180,
                flexShrink: 0,
                marginBottom: '1rem',
                marginRight: '1rem',
                borderRadius: 5,
                overflow: 'hidden',
                background: 'black',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: 1,
                    padding: '1rem',
                }}
            >
                <h3
                    style={{
                        display: 'block',
                        background: 'black',
                        color: 'white',
                        borderRadius: 5,
                        padding: '0.5rem',
                    }}
                >
                    Course:{course.courseTitle}
                </h3>
            </div>
            <Image
                width={300}
                height={180}
                src={course.courseImage}
                alt={course.courseImageAlt}
            />
        </div>
    );
};

export default Course;
