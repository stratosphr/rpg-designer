import IKeyedMovement from './IKeyedMovement'
import {EKey} from '../../../utils/EKey'
import {ANode} from '../../scene/nodes/ANode'
import Layer from '../../scene/Layer'
import AMovement from './AMovement'

export default class FourWayMovement extends AMovement {

	constructor(speed: number, keys: IKeyedMovement = {up: EKey.UP, down: EKey.DOWN, left: EKey.LEFT, right: EKey.RIGHT}) {
		super(speed, keys)
	}

	public applyToNode(node: ANode, layer: Layer): void {
		if (this.keysDown.left) {
			this.moveLeft(node)
		} else if (this.keysDown.right) {
			this.moveRight(node)
		} else if (this.keysDown.up) {
			this.moveUp(node)
		} else if (this.keysDown.down) {
			this.moveDown(node)
		}
	}

}