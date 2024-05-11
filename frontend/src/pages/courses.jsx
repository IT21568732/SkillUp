import React from 'react';

export default function CourseDetails() {
    // Fetch course details from API or define them here
    const course = {
        title: 'Course Title',
        instructor: 'Instructor Name',
        description: 'Course Description',
        // Add more necessary course details
    };

    const handleEnrollNow = () => {
        // Handle enroll now button click event
        // You can redirect to a payment page or perform any other action here
    };

    return (
        <div>
            <h1>{course.title}</h1>
            <p>Instructor: {course.instructor}</p>
            <p>{course.description}</p>
            {/* Add more necessary course details */}
            <button onClick={handleEnrollNow}>Enroll Now</button>
        </div>
    );
};

