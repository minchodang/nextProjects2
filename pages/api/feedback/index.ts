// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export type Data = {
    message?: string;
    feedback?: { id: string; email: string; text: string };
};

export function buildFeedbackPath() {
    return path.join(process.cwd(), 'data', 'feedback.json');
}

export function extractFeedback(filePath: fs.PathOrFileDescriptor) {
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(String(fileData));
    return data;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'POST') {
        const email = req.body.email;
        const feedbackText = req.body.text;
        const newFeedback = {
            id: new Date().toISOString(),
            email: email,
            text: feedbackText,
        };
        const filePath = buildFeedbackPath();
        const data = extractFeedback(filePath);

        data.push(newFeedback);
        fs.writeFileSync(filePath, JSON.stringify(data));
        res.status(201).json({
            message: 'Success!',
            feedback: newFeedback,
        });
    } else {
        const filePath = buildFeedbackPath();
        const data = extractFeedback(filePath);
        res.status(200).json({ feedback: data });
    }
}
