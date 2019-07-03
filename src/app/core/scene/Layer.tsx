import React, {Component, RefObject} from 'react'
import {IPositioned} from '../../utils/IPositioned'
import {IDimensioned} from '../../utils/IDimensioned'
import {IIdentifiable} from '../../utils/IIdentifiable'
import {INode} from './nodes/INode'

interface ILayerProps extends IIdentifiable, IPositioned, IDimensioned {

}

interface ILayerState {

}

export default abstract class Layer extends Component<ILayerProps, ILayerState> {

	public readonly nodes: INode[]
	public readonly canvas: RefObject<HTMLCanvasElement>
	public ctx: CanvasRenderingContext2D | null

	protected constructor(props: ILayerProps, context: any) {
		super(props, context)
		this.nodes = []
		this.canvas = React.createRef<HTMLCanvasElement>()
		this.ctx = null
	}

	public addNode(node: INode): void {
		this.nodes.push(node)
	}

	public update(timeStep: number): void {
		this.nodes.forEach(node => node.update(this, timeStep))
	}

	public componentDidMount(): void {
		this.ctx = this.canvas.current!.getContext('2d')!
	}

	public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
		return (
			<canvas id={this.props.id} ref={this.canvas} style={{
				position: 'absolute',
				left: this.props.position.x,
				top: this.props.position.y,
				backgroundColor: 'rgba(' + Math.random() * 255 + ',' + Math.random() * 255 + ',' + Math.random() * 255 + ',' + 0.5 + ')'
			}} width={this.props.dimensions.w} height={this.props.dimensions.h}>
			</canvas>
		)
	}

}