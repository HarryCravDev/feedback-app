import React, { useState, useEffect } from "react";
import { Button, Input, Card, Alert, Radio } from "antd";
import { useFeedbackContext } from "../../context/FeedbackContext";
import { v4 as uuidv4 } from "uuid";

const FeedbackForm = () => {
	const {
		addFeedback,
		feedbackEdit,
		updateFeedbackItem,
		clearEditFeedbackItem,
	} = useFeedbackContext();

	const [feedbackTitle, setFeedbackTitle] = useState<string>("");
	const [feedbackDescription, setFeedbackDescription] = useState<string>("");
	const [rating, setRating] = useState<number | null>(null);
	const [error, setError] = useState<boolean>(false);
	const [success, setSuccess] = useState<boolean>(false);

	useEffect(() => {
		if (feedbackEdit.isEditing) {
			setFeedbackTitle(feedbackEdit.item!.title);
			setFeedbackDescription(feedbackEdit.item!.description);
			setRating(feedbackEdit.item!.rating);
		} else {
			setFeedbackTitle("");
			setFeedbackDescription("");
			setRating(null);
		}
	}, [feedbackEdit]);

	const handleSubmit = () => {
		let timeout: NodeJS.Timeout;

		if (!feedbackEdit.isEditing) {
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
		} else {
			setSuccess(true);

			timeout = setTimeout(() => {
				setSuccess(false);
				clearTimeout(timeout);
			}, 3000);

			updateFeedbackItem({
				...feedbackEdit.item!,
				title: feedbackTitle,
				description: feedbackDescription,
				rating: rating!,
			});
		}

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
			<h2>{!feedbackEdit.item ? "Enter Feedback" : "Edit Feedback"}</h2>
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
			{!feedbackEdit.isEditing ? (
				<Button
					type="primary"
					htmlType="submit"
					onClick={handleSubmit}
					style={{ marginTop: "0.5rem" }}
					disabled={!feedbackDescription || !rating || !feedbackTitle}
				>
					Submit
				</Button>
			) : (
				<div>
					<Button
						type="primary"
						htmlType="submit"
						onClick={handleSubmit}
						style={{ marginTop: "0.5rem" }}
						disabled={!feedbackDescription || !rating || !feedbackTitle}
					>
						Confirm Changes
					</Button>
					<Button
						type="primary"
						htmlType="submit"
						onClick={clearEditFeedbackItem}
						style={{ marginTop: "0.5rem", marginLeft: "0.5rem" }}
						danger
					>
						Cancel
					</Button>
				</div>
			)}
		</Card>
	);
};

export default FeedbackForm;
