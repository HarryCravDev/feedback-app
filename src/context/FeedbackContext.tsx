import {
	useContext,
	createContext,
	ReactNode,
	useState,
	useEffect,
} from "react";
import { FeedbackData } from "../data/FeedbackData";
import { IFeedback } from "../types/IFeedback";

interface IFeedbackContext {
	feedbackData: IFeedback[];
	feedbackEdit: { item: IFeedback | null; isEditing: boolean };
	isLoading: boolean;
	addFeedback: (feedback: IFeedback) => void;
	removeFeedback: (id: number | string) => void;
	getFeedbackById: (id: number | string) => IFeedback | undefined;
	editFeedback: (item: IFeedback) => void;
	updateFeedbackItem: (item: IFeedback) => void;
	clearEditFeedbackItem: () => void;
}

const FeedbackContext = createContext({} as IFeedbackContext);

export const FeedbackProvider = ({ children }: { children: ReactNode }) => {
	// const [feedbackData, setFeedbackData] = useState<IFeedback[]>(FeedbackData);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [feedbackData, setFeedbackData] = useState<IFeedback[]>([]);
	const [feedbackEdit, setFeedbackEdit] = useState<{
		item: IFeedback | null;
		isEditing: boolean;
	}>({
		item: null,
		isEditing: false,
	});

	useEffect(() => {
		fetchFeedbackData();
	}, []);

	const fetchFeedbackData = async () => {
		const res = await fetch("http://localhost:4900/feedback");
		const data = await res.json();
		setIsLoading(false);
		setFeedbackData(data);
	};

	const addFeedback = async (feedback: IFeedback) => {
		const res = await fetch("http://localhost:4900/feedback", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(feedback),
		});
		const data = await res.json();

		setFeedbackData([...feedbackData, data]);
	};

	const getFeedbackById = (id: number | string) => {
		return feedbackData.find((item) => item.id === id);
	};

	const removeFeedback = async (id: number | string) => {
		const res = await fetch(`http://localhost:4900/feedback/${id}`, {
			method: "DELETE",
		});
		const data = await res.json();
		console.log("Delete feedback: ", data);
		setFeedbackData(feedbackData.filter((item) => item.id !== id));
	};

	const editFeedback = (item: IFeedback) => {
		setFeedbackEdit({
			item,
			isEditing: true,
		});
	};

	const clearEditFeedbackItem = () => {
		setFeedbackEdit({
			item: null,
			isEditing: false,
		});
	};

	const updateFeedbackItem = async (updatedFeedback: IFeedback) => {
		const res = await fetch(
			`http://localhost:4900/feedback/${updatedFeedback.id}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedFeedback),
			}
		);

		const data = await res.json();

		console.log("Updated feedback: ", data);

		setFeedbackData(
			feedbackData.map((item) => {
				if (item.id === data.id) {
					return data;
				}
				return item;
			})
		);

		setFeedbackEdit({ item: null, isEditing: false });
	};

	return (
		<FeedbackContext.Provider
			value={{
				feedbackData,
				feedbackEdit,
				isLoading,
				addFeedback,
				getFeedbackById,
				removeFeedback,
				editFeedback,
				updateFeedbackItem,
				clearEditFeedbackItem,
			}}
		>
			{children}
		</FeedbackContext.Provider>
	);
};

export const useFeedbackContext = () => {
	return useContext(FeedbackContext);
};
