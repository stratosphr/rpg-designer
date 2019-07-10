import IKeyedMovement from './IKeyedMovement'
import {EKey} from '../../../utils/EKey'
import {ANode} from '../../scene/nodes/ANode'
import Layer from '../../scene/Layer'
import AMovement from './AMovement'
import {EEventCategory} from '../events/EEventCategory'
import Direction from '../../../utils/Direction'

export default class FourWayMovement extends AMovement {

	constructor(speed: number, keys: IKeyedMovement = {up: EKey.UP, down: EKey.DOWN, left: EKey.LEFT, right: EKey.RIGHT}) {
		super(EEventCategory.FOUR_WAY_MOVEMENT, [], speed, keys)
	}

	public applyToNode(node: ANode, layer: Layer): void {
		if (this.keysDown.left) {
			this.move(node, Direction.LEFT)
		} else if (this.keysDown.right) {
			this.move(node, Direction.RIGHT)
		} else if (this.keysDown.up) {
			this.move(node, Direction.UP)
		} else if (this.keysDown.down) {
			this.move(node, Direction.DOWN)
		}
	}

}