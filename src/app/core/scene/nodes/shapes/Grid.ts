import Layer from '../../Layer'
import {IGrid} from '../../../../utils/IGrid'
import {IDimensions} from '../../../../utils/IDimensions'
import {IVector} from '../../../../utils/IVector'
import {AShape} from './AShape'
import {IPositioned} from '../../../../utils/IPositioned'

export abstract class Grid extends AShape implements IGrid, IPositioned {

	public readonly cellsDimensions: IDimensions
	public readonly nbCells: IDimensions

	constructor(id: string, position: IVector, cellsDimensions: IDimensions, nbCells: IDimensions) {
		super(id, position)
		this.cellsDimensions = cellsDimensions
		this.nbCells = nbCells
	}

	public draw(layer: Layer, context: CanvasRenderingContext2D): void {
		context.lineWidth = 1
		context.beginPath()
		for (let y = this.position.y; y < (this.nbCells.h + 1) * this.cellsDimensions.h; y += this.cellsDimensions.h) {
			context.moveTo(this.position.x, y)
			context.lineTo(this.position.x + this.nbCells.w * this.cellsDimensions.w, y)
		}
		for (let x = this.position.x; x < (this.nbCells.w + 1) * this.cellsDimensions.w; x += this.cellsDimensions.w) {
			context.moveTo(x, this.position.y)
			context.lineTo(x, this.position.y + this.nbCells.h * this.cellsDimensions.h)
		}
		context.stroke()
	}

}
