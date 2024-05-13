const QuizService = require("../services/quizService")
const { SubscribeMessages } = require("../utils/index.utils");

module.exports = (app, channel) => {

    const service = new QuizService();
    const baseUrl = "/quizzes";

    SubscribeMessages(channel, service);

    // Route to create a quiz
    app.post(`${baseUrl}/create_quiz`, async (req, res) => {
        try {
            // Assuming the request body contains the quiz data
            const result = await service.CreateQuiz(req.body);
            if (result.success) {
                res.status(201).json(result);
            } else {
                res.status(500).json(result);
            }
        } catch (error) {
            console.error("Error creating quiz:", error);
            res.status(500).json({ success: false, message: "Failed to create quiz due to internal error" });
        }
    });

    // Route to fetch quizzes by courseId
app.post(`${baseUrl}/courseQuizzes`, async (req, res) => {
    try {
        const { courseId } = req.body;
        const result = await service.GetQuizzesByCourseId(courseId);
        if (result.success) {
            res.status(200).json(result.data);
        } else {
            res.status(500).json({ message: result.message });
        }
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        res.status(500).json({ message: 'Failed to fetch quizzes' });
    }
});

// Route to delete a quiz
app.delete(`${baseUrl}/delete_quiz/:quizId`, async (req, res) => {
    try {
        const { quizId } = req.params;
        const result = await service.DeleteQuiz(quizId);
        if (result.success) {
            res.status(200).json({ message: 'Quiz deleted successfully!' });
        } else {
            res.status(404).json({ message: result.message });
        }
    } catch (error) {
        console.error("Error deleting quiz:", error);
        res.status(500).json({ message: 'Failed to delete quiz due to internal error' });
    }
});
}