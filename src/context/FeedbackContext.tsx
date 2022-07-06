import { useContext, createContext, ReactNode, useState } from "react";
import { FeedbackData } from "../data/FeedbackData";
import { IFeedback } from "../types/IFeedback";

interface IFeedbackContext {
	feedbackData: IFeedback[];
	addFeedback: (feedback: IFeedback) => void;
	removeFeedback: (id: number | string) => void;
	getFeedbackById: (id: number | string) => IFeedback | undefined;
}

const FeedbackContext = createContext({} as IFeedbackContext);

export const FeedbackProvider = ({ children }: { children: ReactNode }) => {
	const [feedbackData, setFeedbackData] = useState<IFeedback[]>(FeedbackData);

	const addFeedback = (feedback: IFeedback) => {
		setFeedbackData([...feedbackData, feedback]);
	};

	const getFeedbackById = (id: number | string) => {
		return feedbackData.find((item) => item.id === id);
	};

	const removeFeedback = (id: number | string) => {
		setFeedbackData(feedbackData.filter((item) => item.id !== id));
	};

	return (
		<FeedbackContext.Provider
			value={{ feedbackData, addFeedback, getFeedbackById, removeFeedback }}
		>
			{children}
		</FeedbackContext.Provider>
	);
};

export const useFeedbackContext = () => {
	return useContext(FeedbackContext);
};
