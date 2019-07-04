import {ABehaviour} from './ABehaviour'
import IKeyedMovement from './IKeyedMovement'
import {EKey} from '../../../utils/EKey'
import {ANode} from '../../scene/nodes/ANode'
import Layer from '../../scene/Layer'

export default class FourDirection extends ABehaviour {

	private readonly speed: number
	private readonly keys: IKeyedMovement
	private readonly keysDown: { up: boolean, down: boolean, left: boolean, right: boolean }

	constructor(speed: number, keys: IKeyedMovement = {up: EKey.UP, down: EKey.DOWN, left: EKey.LEFT, right: EKey.RIGHT}) {
		super()
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

	public update(layer: Layer, timeStep: number, node: ANode): void {
		if (this.keysDown.left) {
			node.setPosition({x: node.position.x - timeStep * this.speed, y: node.position.y})
		} else if (this.keysDown.right) {
			node.setPosition({x: node.position.x + timeStep * this.speed, y: node.position.y})
		}
		if (this.keysDown.up) {
			node.setPosition({x: node.position.x, y: node.position.y - timeStep * this.speed})
		} else if (this.keysDown.down) {
			node.setPosition({x: node.position.x, y: node.position.y + timeStep * this.speed})
		}
	}

}