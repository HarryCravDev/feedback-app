import React, { useState } from "react";
import { Button, Form, Input, Card } from "antd";

const FeedbackForm = () => {
	const [value, setValue] = useState<string>("");

	return (
		<div className="Heloooo">
			<Card>
				<h2>Enter Feedback</h2>
				<Form
					name="basic"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					initialValues={{ remember: true }}
					autoComplete="off"
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
					}}
				>
					<Form.Item
						// label="Feedback"
						// name="feedback"
						rules={[{ required: true, message: "Please input your feedback!" }]}
					>
						<Input.TextArea onChange={(e) => setValue(e.target.value)} />
					</Form.Item>

					<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
					</Form.Item>
				</Form>
			</Card>
		</div>
	);
};

export default FeedbackForm;
