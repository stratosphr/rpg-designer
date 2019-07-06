import React, {Component, RefObject} from 'react'
import {IPositioned} from '../../utils/IPositioned'
import {IDimensioned} from '../../utils/IDimensioned'
import {IIdentifiable} from '../../utils/IIdentifiable'
import {ANode} from './nodes/ANode'

interface ILayerProps extends IIdentifiable, IPositioned, IDimensioned {

}

interface ILayerState {

}

export default abstract class Layer extends Component<ILayerProps, ILayerState> {

	public readonly nodes: ANode[]
	public readonly canvas: RefObject<HTMLCanvasElement>
	private ctx: CanvasRenderingContext2D | null

	protected constructor(props: ILayerProps) {
		super(props)
		this.nodes = []
		this.canvas = React.createRef<HTMLCanvasElement>()
		this.ctx = null
	}

	public addNode(node: ANode): void {
		this.nodes.push(node)
	}

	public update(): void {
		this.nodes.forEach(node => node.updateBehaviours(this))
		this.nodes.forEach(node => node.update(this))
	}

	public draw(): void {
		this.ctx!.clearRect(-0.5, -0.5, this.props.dimensions.w, this.props.dimensions.h)
		this.nodes.forEach(node => node.draw(this, this.ctx!))
	}

	public componentDidMount(): void {
		this.ctx = this.canvas.current!.getContext('2d')
		this.ctx!.translate(0.5, 0.5)
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