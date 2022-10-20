import { buildFeedbackPath, Data, extractFeedback } from '../api/feedback';
import { InferGetStaticPropsType } from 'next';
import axios from 'axios';
import { useState } from 'react';

interface FeedbackResponseType {
    id: string;
    email: string;
    text: string;
}

const FeedbackPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
    const [feedbackData, setFeedbackData] = useState<FeedbackResponseType>();
    const loadFeedbackHandler = (id: string) => {
        axios.post(`/api/${id}`).then((response) => setFeedbackData(response.data.feedback));
    };

    return (
        <>
            {feedbackData && <p>{feedbackData.email}</p>}

            <ul>
                {props.feedbackItems.map((item: any) => (
                    <li key={item.id}>
                        {item.text}
                        <button onClick={loadFeedbackHandler.bind(null, item.id)}>
                            Show Details
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
};

export async function getStaticProps() {
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    return {
        props: {
            feedbackItems: data,
        },
    };
}

export default FeedbackPage;
