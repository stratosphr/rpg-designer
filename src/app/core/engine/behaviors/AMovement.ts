import {ABehaviour} from './ABehaviour'
import IKeyedMovement from './IKeyedMovement'
import {EKey} from '../../../utils/EKey'
import {ANode} from '../../scene/nodes/ANode'
import Layer from '../../scene/Layer'
import {EEventType} from '../events/EEventType'
import {EEventCategory} from '../events/EEventCategory'

export default abstract class AMovement extends ABehaviour {

	protected readonly speed: number
	private readonly keys: IKeyedMovement
	protected readonly keysDown: { up: boolean, down: boolean, left: boolean, right: boolean }

	protected constructor(name: EEventCategory, triggerableEvents: EEventType[] = [], speed: number, keys: IKeyedMovement = {up: EKey.UP, down: EKey.DOWN, left: EKey.LEFT, right: EKey.RIGHT}) {
		super(name, [EEventType.MOVE_UP, EEventType.MOVE_DOWN, EEventType.MOVE_LEFT, EEventType.MOVE_RIGHT, ...triggerableEvents])
		this.speed = speed
		this.keys = keys
		this.keysDown = {up: false, down: false, left: false, right: false}
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
			this.moveLeft(node)
		} else if (this.keysDown.right) {
			this.moveRight(node)
		}
		if (this.keysDown.up) {
			this.moveUp(node)
		} else if (this.keysDown.down) {
			this.moveDown(node)
		}
	}

	protected moveLeft(node: ANode) {
		this.notifyListeners({name: EEventType.MOVE_LEFT})
		node.setPosition({x: node.position.x - this.speed, y: node.position.y})
	}

	protected moveRight(node: ANode) {
		this.notifyListeners({name: EEventType.MOVE_RIGHT})
		node.setPosition({x: node.position.x + this.speed, y: node.position.y})
	}

	protected moveUp(node: ANode) {
		this.notifyListeners({name: EEventType.MOVE_UP})
		node.setPosition({x: node.position.x, y: node.position.y - this.speed})
	}

	protected moveDown(node: ANode) {
		this.notifyListeners({name: EEventType.MOVE_DOWN})
		node.setPosition({x: node.position.x, y: node.position.y + this.speed})
	}

}