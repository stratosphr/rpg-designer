import {ANode} from '../../scene/nodes/ANode'
import Layer from '../../scene/Layer'
import {IBehaviourListener} from './IBehaviourListener'

export abstract class ABehaviour {

	private readonly listeners: IBehaviourListener[]

	protected constructor() {
		this.listeners = []
	}

	public addListener(node: IBehaviourListener): void {
		this.listeners.push(node)
	}

	protected notifyListeners(event: string): void {
		this.listeners.forEach(listener => this.notifyListener(listener, event))
	}

	protected abstract notifyListener(listener: IBehaviourListener, event: string): void

	public abstract applyToNode(node: ANode, layer: Layer): void

}
