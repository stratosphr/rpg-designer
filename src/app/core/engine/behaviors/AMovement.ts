import {ABehaviour} from './ABehaviour'
import IKeyedMovement from './IKeyedMovement'
import {EKey} from '../../../utils/EKey'
import {ANode} from '../../scene/nodes/ANode'
import Layer from '../../scene/Layer'
import {EEventType} from '../events/EEventType'
import {EEventCategory} from '../events/EEventCategory'
import {IVector} from '../../../utils/IVector'
import Direction from '../../../utils/Direction'
import MoveEvent from '../events/events/MoveEvent'

export default abstract class AMovement extends ABehaviour {

	protected readonly speed: number
	private readonly keys: IKeyedMovement
	protected readonly keysDown: { up: boolean, down: boolean, left: boolean, right: boolean }
	protected direction: Direction

	protected constructor(name: EEventCategory, triggerableEvents: EEventType[] = [], speed: number, keys: IKeyedMovement = {up: EKey.UP, down: EKey.DOWN, left: EKey.LEFT, right: EKey.RIGHT}) {
		super(name, [EEventType.MOVE, EEventType.MOVE_UP, EEventType.MOVE_DOWN, EEventType.MOVE_LEFT, EEventType.MOVE_RIGHT, ...triggerableEvents])
		this.speed = speed
		this.keys = keys
		this.keysDown = {up: false, down: false, left: false, right: false}
		this.direction = Direction.NONE
		this.handleKey = this.handleKey.bind(this)
		document.addEventListener('keydown', ev => this.handleKey(ev, true), false)
		document.addEventListener('keyup', ev => this.handleKey(ev, false), false)
	}

	private handleKey(ev: KeyboardEvent, isDown: boolean) {
		switch (ev.key.toLowerCase()) {
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
		this.notifyListeners(new MoveEvent({before: {direction: this.direction, position: node.position}, after: {direction: direction, position: position}}))
		node.setPosition(position)
		this.direction = direction
	}

}