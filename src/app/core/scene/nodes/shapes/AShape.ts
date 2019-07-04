import {ANode} from '../ANode'
import Layer from '../../Layer'

export abstract class AShape extends ANode {

	public abstract draw(layer: Layer, context: CanvasRenderingContext2D): void

	public abstract update(layer: Layer, timeStep: number): void

}

