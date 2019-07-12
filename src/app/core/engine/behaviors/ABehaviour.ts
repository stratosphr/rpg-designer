import {ANode} from '../../scene/nodes/ANode'
import Layer from '../../scene/Layer'
import AEventNotifier from '../events/AEventNotifier'
import {EEventCategory} from '../events/EEventCategory'
import {EEventType} from '../events/EEventType'

export abstract class ABehaviour extends AEventNotifier {

	private _isEnabled: boolean

	protected constructor(name: EEventCategory, triggerableEvents: EEventType[] = []) {
		super(name, triggerableEvents)
		this._isEnabled = true
	}

	public abstract applyToNode(node: ANode, layer: Layer): void

	public isEnabled(): boolean {
		return this._isEnabled
	}

	public enable(): void {
		this._isEnabled = true
	}

	public disable(): void {
		this._isEnabled = false
	}

}
