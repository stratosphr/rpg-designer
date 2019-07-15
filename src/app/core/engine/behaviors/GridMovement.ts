import IKeyedMovement from './IKeyedMovement'
import {IGrid} from '../../../utils/IGrid'
import {ANode} from '../../scene/nodes/ANode'
import Layer from '../../scene/Layer'
import {EKey} from '../../../utils/EKey'
import AMovement from './AMovement'
import {EEventCategory} from '../events/EEventCategory'
import Direction from '../../../utils/Direction'

export class GridMovement extends AMovement {

	private offset: { x: number; y: number } | null
	private grid: IGrid

	constructor(speed: number, grid: IGrid, keys: IKeyedMovement = {up: EKey.ARROWUP, down: EKey.ARROWDOWN, left: EKey.ARROWLEFT, right: EKey.ARROWRIGHT}) {
		super(EEventCategory.GRID_MOVEMENT, [], speed, keys)
		this.grid = grid
		this.offset = null
	}

	public applyToNode(node: ANode, layer: Layer): void {
		if (this.offset === null) {
			this.offset = {x: node.position.x % this.grid.cellsDimensions.w, y: node.position.y % this.grid.cellsDimensions.h}
		}
		if (this.keysDown.left && this.direction.y === 0) {
			this.move(node, Direction.LEFT)
		} else if (this.keysDown.right && this.direction.y === 0) {
			this.move(node, Direction.RIGHT)
		} else if (this.direction.x === -1) {
			let limitX: number = Math.floor((node.position.x - this.offset.x) / this.grid.cellsDimensions.w) * this.grid.cellsDimensions.w + this.offset.x
			if (node.position.x - this.speed < limitX) {
				this.move(node, Direction.NONE, {x: limitX, y: node.position.y})
			} else {
				this.move(node)
			}
		} else if (this.direction.x === 1) {
			let limitX: number = Math.ceil((node.position.x - this.offset.x) / this.grid.cellsDimensions.w) * this.grid.cellsDimensions.w + this.offset.x
			if (node.position.x + this.speed > limitX) {
				this.move(node, Direction.NONE, {x: limitX, y: node.position.y})
			} else {
				this.move(node)
			}
		} else if (this.keysDown.up && this.direction.x === 0) {
			this.move(node, Direction.UP)
		} else if (this.keysDown.down && this.direction.x === 0) {
			this.move(node, Direction.DOWN)
		} else if (this.direction.y === -1) {
			let limitY: number = Math.floor((node.position.y - this.offset.y) / this.grid.cellsDimensions.h) * this.grid.cellsDimensions.h + this.offset.y
			if (node.position.y - this.speed < limitY) {
				this.move(node, Direction.NONE, {x: node.position.x, y: limitY})
			} else {
				this.move(node)
			}
		} else if (this.direction.y === 1) {
			let limitY: number = Math.ceil((node.position.y - this.offset.y) / this.grid.cellsDimensions.h) * this.grid.cellsDimensions.h + this.offset.y
			if (node.position.y + this.speed > limitY) {
				this.move(node, Direction.NONE, {x: node.position.x, y: limitY})
			} else {
				this.move(node)
			}
		}
	}

}