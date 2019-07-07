import {ANode} from '../../scene/nodes/ANode'
import Layer from '../../scene/Layer'
import AEventNotifier from '../events/AEventNotifier'
import {ITriggerableEvent} from '../events/ITriggerableEvent'

export abstract class ABehaviour extends AEventNotifier {

	protected constructor(category: string, triggerableEvents: ITriggerableEvent[] = []) {
		super(category, triggerableEvents)
	}

	public abstract applyToNode(node: ANode, layer: Layer): void

}
