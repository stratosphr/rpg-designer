import {IDimensioned} from '../../../../utils/IDimensioned'
import {IPositioned} from '../../../../utils/IPositioned'
import {IVector} from '../../../../utils/IVector'
import {IDimensions} from '../../../../utils/IDimensions'
import Layer from '../../Layer'
import {AShape} from './AShape'

export default class Rectangle extends AShape implements IPositioned, IDimensioned {

	public dimensions: IDimensions

	public constructor(id: string, position: IVector, dimensions: IDimensions) {
		super(id, position)
		this.dimensions = dimensions
	}

	public draw(layer: Layer, context: CanvasRenderingContext2D): void {
		context.beginPath()
		context.fillRect(this.position.x, this.position.y, this.dimensions.w, this.dimensions.h)
	}

}
