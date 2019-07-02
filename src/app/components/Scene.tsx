import React, {Component} from 'react'
import IDimensions from '../utils/IDimensions'
import IVector from '../utils/IVector'

interface ISceneProps {
	dimensions: IDimensions,
	position: IVector
}

interface ISceneState {
}

export default class Scene extends Component<ISceneProps, ISceneState> {

	public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
		//margin: auto
		//marginTop: '50px'
		return (
			<div style={{position: 'relative', width: this.props.dimensions.w, height: this.props.dimensions.h, left: this.props.position.x, top: this.props.position.y, backgroundColor: 'lightblue'}}>
			</div>
		)
	}

}