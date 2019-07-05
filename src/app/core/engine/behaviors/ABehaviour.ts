import {ANode} from '../../scene/nodes/ANode'
import Layer from '../../scene/Layer'

export abstract class ABehaviour {

	public abstract applyToNode(node: ANode, layer: Layer, timeStep: number): void

}
