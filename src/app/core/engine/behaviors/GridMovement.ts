import IKeyedMovement from './IKeyedMovement'
import {IGrid} from '../../../utils/IGrid'
import {ANode} from '../../scene/nodes/ANode'
import Layer from '../../scene/Layer'
import {IVector} from '../../../utils/IVector'
import {EKey} from '../../../utils/EKey'
import AMovement from './AMovement'
import {EEventCategory} from '../events/EEventCategory'

export class GridMovement extends AMovement {

	private dir: IVector
	private offset: { x: number; y: number } | null
	private grid: IGrid

	constructor(speed: number, grid: IGrid, keys: IKeyedMovement = {up: EKey.UP, down: EKey.DOWN, left: EKey.LEFT, right: EKey.RIGHT}) {
		super(EEventCategory.GRID_MOVEMENT, [], speed, keys)
		this.dir = {x: 0, y: 0}
		this.grid = grid
		this.offset = null
	}

	public applyToNode(node: ANode, layer: Layer): void {
		if (this.offset === null) {
			this.offset = {x: node.position.x % this.grid.cellsDimensions.w, y: node.position.y % this.grid.cellsDimensions.h}
		}
		if (this.keysDown.left && this.dir.y === 0) {
			this.moveLeft(node)
			this.dir = {x: -1, y: this.dir.y}
		} else if (this.keysDown.right && this.dir.y === 0) {
			this.moveRight(node)
			this.dir = {x: 1, y: this.dir.y}
		} else if (this.dir.x === -1) {
			let limitX: number = Math.floor((node.position.x - this.offset.x) / this.grid.cellsDimensions.w) * this.grid.cellsDimensions.w + this.offset.x
			if (node.position.x - this.speed < limitX) {
				node.setPosition({x: limitX, y: node.position.y})
				this.dir = {x: 0, y: this.dir.y}
			} else {
				this.moveLeft(node)
			}
		} else if (this.dir.x === 1) {
			let limitX: number = Math.ceil((node.position.x - this.offset.x) / this.grid.cellsDimensions.w) * this.grid.cellsDimensions.w + this.offset.x
			if (node.position.x + this.speed > limitX) {
				node.setPosition({x: limitX, y: node.position.y})
				this.dir = {x: 0, y: this.dir.y}
			} else {
				this.moveRight(node)
			}
		} else if (this.keysDown.up && this.dir.x === 0) {
			this.moveUp(node)
			this.dir = {x: this.dir.x, y: -1}
		} else if (this.keysDown.down) {
			this.moveDown(node)
			this.dir = {x: this.dir.x, y: 1}
		} else if (this.dir.y === -1) {
			let limitY: number = Math.floor((node.position.y - this.offset.y) / this.grid.cellsDimensions.h) * this.grid.cellsDimensions.h + this.offset.y
			if (node.position.y - this.speed < limitY) {
				node.setPosition({x: node.position.x, y: limitY})
				this.dir = {x: this.dir.x, y: 0}
			} else {
				this.moveUp(node)
			}
		} else if (this.dir.y === 1 && this.dir.x === 0) {
			let limitY: number = Math.ceil((node.position.y - this.offset.y) / this.grid.cellsDimensions.h) * this.grid.cellsDimensions.h + this.offset.y
			if (node.position.y + this.speed > limitY) {
				node.setPosition({x: node.position.x, y: limitY})
				this.dir = {x: this.dir.x, y: 0}
			} else {
				this.moveDown(node)
			}
		}
	}

}