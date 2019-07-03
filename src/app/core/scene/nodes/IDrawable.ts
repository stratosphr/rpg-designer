import Layer from '../Layer'

export interface IDrawable {

	draw(layer: Layer, context: CanvasRenderingContext2D): void

}

