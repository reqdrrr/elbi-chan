import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './pages/Home'
import Acads from './pages/Acads'

class App extends Component {
	render() {
		return(
			<div>

				<BrowserRouter>
					<div>
						<Route exact={true} path="/" component={Home} />
						<Route exact={true} path="/acads" component={Acads} />
					</div>
				</BrowserRouter>

			</div>
		)
	}
}

export default App;