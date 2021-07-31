import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import PATHS from "./constants/paths";
import HomePage from "./pages/HomePage";
import PlayPage from "./pages/PlayPage";

const App = () => {
	return <div className="flex flex-col w-full min-h-screen mx-auto my-0 bg-gray-300 nowrp sm:w-2/3 md:w-1/3">
		<div className="h-screen ">
			<BrowserRouter>
				<Switch>
					<Route exact path={PATHS.HOME} component={HomePage} />
					<Route exact path={PATHS.PLAY} component={PlayPage} />
				</Switch>
			</BrowserRouter>
		</div>
	</div>
}

export default App;
