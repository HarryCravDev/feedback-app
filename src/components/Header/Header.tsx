import React from "react";
import { PageHeader } from "antd";
import "./Header.css";

const Header: React.FC<{ text: string }> = ({ text = "Feedback UI" }) => {
	return (
		<header>
			<PageHeader
				className="site-page-header"
				title={text}
				style={{ backgroundColor: "#1890ff", color: "white" }}
			/>
		</header>
	);
};

export default Header;
