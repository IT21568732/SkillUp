const Quiz = require('../schema/quiz.schema'); 

class QuizService{

    async SubscribeEvents(payload) {
        payload = JSON.parse(payload);

        const { event, data } = payload;

        switch (event) {
            case "CREATE_QUIZ":
                return this.CreateQuiz(data);
            case "UPDATE_QUIZ":
                return this.UpdateQuiz(data);
            case "GET_QUIZZES_BY_COURSE":
                    return this.GetQuizzesByCourseId(data.courseId);
            case "DELETE_QUIZ":
                return this.DeleteQuiz(data.quizId);
            default:
                console.log('Event not recognized');
                return { success: false, message: 'Event not recognized' };
        }
    }

     // Create a new quiz
     async CreateQuiz(data) {
        try {
            let quiz = new Quiz(data);

            await quiz.save();
            return { success: true, data: quiz, message: 'Quiz created successfully!' };
        } catch (error) {
            console.log(error);
            return { success: false, message: 'Failed to create quiz due to internal error' };
        }
    }

    async GetQuizzesByCourseId(courseId) {
        try {
            const quizzes = await Quiz.find({ courseId });

            return { success: true, data: quizzes, message: 'Quizzes fetched successfully!' };
        } catch (error) {
            console.log(error);
            return { success: false, message: 'Failed to fetch quizzes due to internal error' };
        }
    }

    async DeleteQuiz(quizId) {
        try {
            const result = await Quiz.findByIdAndDelete(quizId);
            if (!result) {
                return { success: false, message: 'Quiz not found' };
            }
            return { success: true, message: 'Quiz deleted successfully!' };
        } catch (error) {
            console.log(error);
            return { success: false, message: 'Failed to delete quiz due to internal error' };
        }
    }

}

module.exports = QuizService;