import React, {Component} from 'react'
import {IPositioned} from '../utils/IPositioned'
import {IDimensioned} from '../utils/IDimensioned'

interface ISceneProps extends IPositioned, IDimensioned {

	ready(scene: Scene): void

}

interface ISceneState {

	layers: any[]

}

export default class Scene extends Component<ISceneProps, ISceneState> {

	constructor(props: Readonly<ISceneProps>) {
		super(props)
		this.state = {layers: []}
	}

	public componentDidMount(): void {
		this.props.ready(this)
	}

	public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
		return (
			<div style={{position: 'relative', width: this.props.dimensions.w, height: this.props.dimensions.h, left: this.props.position.x, top: this.props.position.y, boxShadow: '4px 4px 5px 0px rgba(0, 0, 0, 0.75)'}}>
				{this.state.layers}
			</div>
		)
	}

	public addLayer(layer: any) {
		this.setState((previousState: ISceneState) => Scene.addLayer(previousState, layer))
	}

	private static addLayer(previousState: ISceneState, layer: any) {
		return {...previousState, layers: [...previousState.layers, React.cloneElement(layer, {key: layer.props.id})]}
	}

}