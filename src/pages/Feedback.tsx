import { useState } from "react";
import { Col, Row } from "antd";
import FeedbackItem from "../components/feedback-item/FeedbackItem";
import { FeedbackData } from "../data/FeedbackData";
import { IFeedback } from "../types/IFeedback";
import { useFeedbackContext } from "../context/FeedbackContext";

const Feedback = () => {
	// const [feedbackData, setFeedbackData] = useState<IFeedback[]>(FeedbackData);

	const { feedbackData } = useFeedbackContext();

	if (!feedbackData || feedbackData.length === 0) {
		return <p>No Feedback Data</p>;
	}

	return (
		<Row
			gutter={[
				{ sm: 0, md: 12, lg: 16 },
				{ sm: 5, md: 12, lg: 16 },
			]}
		>
			{feedbackData.map((item, index) => (
				<Col xs={24} md={12} lg={8} key={index}>
					<FeedbackItem key={item.id} {...item} />
				</Col>
			))}
		</Row>
	);
};

export default Feedback;
