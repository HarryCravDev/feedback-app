import FeedbackItem from "./components/feedback-item/FeedbackItem";
import Header from "./components/Header/Header";
import { FeedbackProvider } from "./context/FeedbackContext";
import Feedback from "./pages/Feedback";
function App() {
	return (
		<FeedbackProvider>
			<div style={{ minHeight: "100vh", backgroundColor: "ghostwhite" }}>
				<Header text="Feedback UI" />
				<div style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
					<Feedback />
				</div>
			</div>
		</FeedbackProvider>
	);
}

export default App;
