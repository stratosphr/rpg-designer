import Layer from '../Layer'
import {IPositioned} from '../../../utils/IPositioned'

export interface IDrawable extends IPositioned {

	draw(layer: Layer, context: CanvasRenderingContext2D): void

}

