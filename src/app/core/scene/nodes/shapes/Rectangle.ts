import {IDimensioned} from '../../../../utils/IDimensioned'
import {IPositioned} from '../../../../utils/IPositioned'
import {IVector} from '../../../../utils/IVector'
import {IDimensions} from '../../../../utils/IDimensions'
import Layer from '../../Layer'
import {IShape} from './IShape'

const speedFactor: number = 0.05

export default class Rectangle implements IPositioned, IDimensioned, IShape {

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
	}

	public draw(layer: Layer, context: CanvasRenderingContext2D): void {
		context.beginPath()
		context.fillRect(this.position.x, this.position.y, this.dimensions.w, this.dimensions.h)
	}

}