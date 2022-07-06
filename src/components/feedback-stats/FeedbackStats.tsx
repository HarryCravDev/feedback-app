import React from "react";
import { useFeedbackContext } from "../../context/FeedbackContext";
import "./FeedbackStats.css";

const FeedbackStats = () => {
	const { feedbackData } = useFeedbackContext();

	const averageFeedbackRating =
		feedbackData.reduce((acc, curr) => acc + curr.rating, 0) /
		feedbackData.length;

	return (
		<div className="feedback-stats-container">
			<h2>{feedbackData.length} Reviews</h2>
			<h2>
				Average Ratings:{" "}
				{isNaN(averageFeedbackRating) ? 0 : averageFeedbackRating.toFixed(2)}
			</h2>
		</div>
	);
};

export default FeedbackStats;
