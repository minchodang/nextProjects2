import { buildFeedbackPath, extractFeedback } from './index';

const handler = (req: { query: { feedbackId: any } }, res: any) => {
    const feedbackId = req.query.feedbackId;
    const filePath = buildFeedbackPath();
    const feedbackData = extractFeedback(filePath);
    const selectedFeedback = feedbackData.find(
        (feedback: { id: any }) => feedback.id === feedbackId,
    );
    res.status(200).json({ feedback: selectedFeedback });
};

export default handler;
