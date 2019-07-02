import React, {Component} from 'react'
import Scene from './components/Scene'

export default class RPGDesigner extends Component {

	public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
		return (
			<Scene dimensions={{w: 912, h: 513}} position={{x: 20, y: 10}} />
		)
	}

}

