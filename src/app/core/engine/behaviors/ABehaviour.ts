import {ANode} from '../../scene/nodes/ANode'
import Layer from '../../scene/Layer'
import AEventNotifier from '../events/AEventNotifier'
import {EEventCategory} from '../events/EEventCategory'
import {EEventType} from '../events/EEventType'

export abstract class ABehaviour extends AEventNotifier {

	protected constructor(name: EEventCategory, triggerableEvents: EEventType[] = []) {
		super(name, triggerableEvents)
	}

	public abstract applyToNode(node: ANode, layer: Layer): void

}
