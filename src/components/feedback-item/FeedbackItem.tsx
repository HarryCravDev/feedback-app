import React, { useState } from "react";
import { Card, Button } from "antd";
import "./FeedbackItem.css";
import { IFeedback } from "../../types/IFeedback";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useFeedbackContext } from "../../context/FeedbackContext";

const FeedbackItem: React.FC<IFeedback> = ({
	id,
	title,
	description,
	rating = 0,
}) => {
	const { removeFeedback } = useFeedbackContext();

	return (
		<Card title={title} style={{ position: "relative" }}>
			<p
				className="rating-bubble"
				style={{ position: "absolute", top: 0, left: 0 }}
			>
				{rating}
			</p>
			<CloseCircleOutlined
				style={{
					position: "absolute",
					top: 20,
					right: 20,
					cursor: "pointer",
					fontSize: "1.2rem",
				}}
				onClick={() => removeFeedback(id)}
			/>
			<p>{description}</p>
			<Button
				onClick={() => console.log({ id, title, description, rating })}
				type="primary"
			>
				Useless Button
			</Button>
		</Card>
	);
};

export default FeedbackItem;
