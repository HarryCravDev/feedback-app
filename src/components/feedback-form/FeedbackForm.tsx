import React, { useState } from "react";
import { Button, Input, Card, Alert, Radio } from "antd";
import { useFeedbackContext } from "../../context/FeedbackContext";
import { v4 as uuidv4 } from "uuid";

const FeedbackForm = () => {
	const { addFeedback } = useFeedbackContext();

	const [feedbackTitle, setFeedbackTitle] = useState<string>("");
	const [feedbackDescription, setFeedbackDescription] = useState<string>("");
	const [rating, setRating] = useState<number | null>(null);
	const [error, setError] = useState<boolean>(false);
	const [success, setSuccess] = useState<boolean>(false);

	const handleSubmit = () => {
		let timeout: NodeJS.Timeout;

		if (feedbackDescription.length < 10) {
			setError(true);

			timeout = setTimeout(() => {
				setError(false);
				clearTimeout(timeout);
			}, 3000);

			return;
		}

		setSuccess(true);

		timeout = setTimeout(() => {
			setSuccess(false);
			clearTimeout(timeout);
		}, 3000);

		addFeedback({
			id: uuidv4(),
			title: feedbackTitle,
			description: feedbackDescription,
			rating: rating!,
		});

		setFeedbackTitle("");
		setFeedbackDescription("");
		setRating(null);
	};

	return (
		<Card>
			{error && (
				<Alert
					message="Please enter at least 10 characters"
					type="error"
					showIcon
				/>
			)}
			{success && (
				<Alert message="Feedback submitted" type="success" showIcon />
			)}
			<h2>Enter Feedback</h2>
			<Input
				placeholder="Feedback Title"
				value={feedbackTitle}
				onChange={(e) => setFeedbackTitle(e.target.value)}
			/>
			<Radio.Group
				onChange={(e) => setRating(e.target.value)}
				value={rating}
				style={{ marginTop: "0.5rem" }}
			>
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
					<Radio key={number} value={number}>
						{number}
					</Radio>
				))}
			</Radio.Group>
			<Input.TextArea
				placeholder="Feedback Description"
				onChange={(e) => setFeedbackDescription(e.target.value)}
				style={{ marginTop: "0.5rem" }}
				value={feedbackDescription}
			/>
			<Button
				type="primary"
				htmlType="submit"
				onClick={handleSubmit}
				style={{ marginTop: "0.5rem" }}
				disabled={!feedbackDescription || !rating || !feedbackTitle}
			>
				Submit
			</Button>
		</Card>
	);
};

export default FeedbackForm;
