import {IDimensioned} from '../../../utils/IDimensioned'
import {IPositioned} from '../../../utils/IPositioned'
import {INode} from './INode'
import {IVector} from '../../../utils/IVector'
import {IDimensions} from '../../../utils/IDimensions'
import Layer from '../Layer'

const speedFactor: number = 0.01

interface IShape {

}

export default class Rectangle implements IPositioned, IDimensioned, INode, IShape {

	public readonly id: string
	public position: IVector
	public dimensions: IDimensions

	constructor(id: string, position: IVector, dimensions: IDimensions) {
		this.id = id
		this.position = position
		this.dimensions = dimensions
	}

	public update(layer: Layer, timeStep: number): void {
		this.position = {x: this.position.x + timeStep * speedFactor, y: this.position.y}
		layer.ctx!.beginPath()
		layer.ctx!.fillRect(this.position.x, this.position.y, this.dimensions.w, this.dimensions.h)
	}

}