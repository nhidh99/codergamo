import { BrowserRouter, Route, Switch } from "react-router-dom";
import PATHS from "./constants/paths";
import HomePage from "./pages/HomePage";
import PlayPage from "./pages/PlayPage";

const App = () => {
	return <div className="flex flex-col h-full mx-auto my-0 bg-gray-300 sm:w-2/3 md:w-1/3">
		<BrowserRouter>
			<Switch>
				<Route exact path={PATHS.HOME} component={HomePage} />
				<Route exact path={PATHS.PLAY} component={PlayPage} />
			</Switch>
		</BrowserRouter>
	</div>
}

export default App;
