import FeedbackItem from "./components/feedback-item/FeedbackItem";
import FeedbackStats from "./components/feedback-stats/FeedbackStats";
import Header from "./components/Header/Header";
import { FeedbackProvider } from "./context/FeedbackContext";
import Feedback from "./pages/Feedback";
import FeedbackForm from "./components/feedback-form/FeedbackForm";
function App() {
	return (
		<FeedbackProvider>
			<div style={{ minHeight: "100vh", backgroundColor: "ghostwhite" }}>
				<div style={{ marginBottom: "1rem" }}>
					<Header text="Feedback UI" />
				</div>
				<div style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
					<FeedbackForm />
					<FeedbackStats />
					<Feedback />
				</div>
			</div>
		</FeedbackProvider>
	);
}

export default App;
