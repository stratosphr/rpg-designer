import React, {Component} from 'react'
import {IPositioned} from '../../utils/IPositioned'
import {IDimensioned} from '../../utils/IDimensioned'
import {IIdentifiable} from '../../utils/IIdentifiable'
import {IUpdatable} from './nodes/IUpdatable'
import Scene from '../Scene'
import {IVector} from '../../utils/IVector'

interface ILayerProps extends IIdentifiable, IPositioned, IDimensioned {

}

interface ILayerState {

}

export default abstract class Layer extends Component<ILayerProps, ILayerState> implements IUpdatable {

	private pos: IVector = {x: 0, y: 0}
	private speedFactor: number = 1

	protected constructor(props: ILayerProps, context: any) {
		super(props, context)
	}

	public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
		return (
			<canvas style={{position: 'absolute', left: this.props.position.x, top: this.props.position.y, backgroundColor: 'rgba(' + Math.random() * 255 + ',' + Math.random() * 255 + ',' + Math.random() * 255 + ',' + 0.5 + ')'}} width={this.props.dimensions.w} height={this.props.dimensions.h}>
			</canvas>
		)
	}

	public update(scene: Scene, timeStep: number): void {
		this.pos = {x: this.pos.x + timeStep * this.speedFactor, y: this.pos.y + timeStep * this.speedFactor}
		console.log(this.pos)
	}

}