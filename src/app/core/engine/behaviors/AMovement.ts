import {ABehaviour} from './ABehaviour'
import IKeyedMovement from './IKeyedMovement'
import {EKey} from '../../../utils/EKey'
import {ANode} from '../../scene/nodes/ANode'
import Layer from '../../scene/Layer'
import {EEventType} from '../events/EEventType'
import {EEventCategory} from '../events/EEventCategory'
import {IVector} from '../../../utils/IVector'
import Direction from '../../../utils/Direction'
import WillMoveEvent from '../events/events/WillMoveEvent'
import DidMoveEvent from '../events/events/DidMoveEvent'

export default abstract class AMovement extends ABehaviour {

	protected readonly speed: number
	private readonly keys: IKeyedMovement
	protected readonly keysDown: { up: boolean, down: boolean, left: boolean, right: boolean }
	protected direction: Direction

	protected constructor(name: EEventCategory, triggerableEvents: EEventType[] = [], speed: number, keys: IKeyedMovement = {up: EKey.ARROWUP, down: EKey.ARROWDOWN, left: EKey.ARROWLEFT, right: EKey.ARROWRIGHT}) {
		super(name, [EEventType.WILL_MOVE, EEventType.DID_MOVE, ...triggerableEvents])
		this.speed = speed
		this.keys = keys
		this.keysDown = {up: false, down: false, left: false, right: false}
		this.direction = Direction.NONE
		this.handleKey = this.handleKey.bind(this)
		document.addEventListener('keydown', ev => this.handleKey(ev, true), false)
		document.addEventListener('keyup', ev => this.handleKey(ev, false), false)
	}

	private handleKey(ev: KeyboardEvent, isDown: boolean) {
		switch (ev.key.toUpperCase()) {
			case this.keys.up:
				this.keysDown.up = isDown
				break
			case this.keys.down:
				this.keysDown.down = isDown
				break
			case this.keys.left:
				this.keysDown.left = isDown
				break
			case this.keys.right:
				this.keysDown.right = isDown
				break
			default:
				break
		}
	}

	public applyToNode(node: ANode, layer: Layer): void {
		if (this.keysDown.left) {
			this.move(node, Direction.LEFT)
		} else if (this.keysDown.right) {
			this.move(node, Direction.RIGHT)
		}
		if (this.keysDown.up) {
			this.move(node, Direction.UP)
		} else if (this.keysDown.down) {
			this.move(node, Direction.DOWN)
		}
	}

	protected move(node: ANode, direction: Direction = this.direction, position: IVector = {x: node.position.x + direction.x * this.speed, y: node.position.y + direction.y * this.speed}) {
		if (this.isEnabled()) {
			this.notifyListeners(new WillMoveEvent({before: {direction: this.direction, position: node.position}, after: {direction: direction, position: position}}))
			if (this.isEnabled()) {
				node.setPosition(position)
				this.direction = direction
				this.notifyListeners(new DidMoveEvent({before: {direction: this.direction, position: node.position}, after: {direction: direction, position: position}}))
			}
		}
	}

}