import {ANode} from '../../scene/nodes/ANode'
import Layer from '../../scene/Layer'

export abstract class ABehaviour {

	public abstract update(layer: Layer, timeStep: number, node: ANode): void

}
