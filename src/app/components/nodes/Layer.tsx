import React, {Component} from 'react'
import {IPositioned} from '../../utils/IPositioned'
import {IDimensioned} from '../../utils/IDimensioned'
import {INode} from './INode'

interface ILayerProps extends IPositioned, IDimensioned, INode {

}

interface ILayerState {

}

export default abstract class Layer extends Component<ILayerProps, ILayerState> {

	public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
		return (
			<canvas style={{position: 'absolute', left: this.props.position.x, top: this.props.position.y, backgroundColor: 'rgba(' + Math.random() * 255 + ',' + Math.random() * 255 + ',' + Math.random() * 255 + ',' + 0.5 + ')'}} width={this.props.dimensions.w} height={this.props.dimensions.h}>
			</canvas>
		)
	}

}