import FourWayMovement from './FourWayMovement'
import IKeyedMovement from './IKeyedMovement'
import {IGrid} from '../../../utils/IGrid'
import {ANode} from '../../scene/nodes/ANode'
import Layer from '../../scene/Layer'
import {IVector} from '../../../utils/IVector'

export class GridMovement extends FourWayMovement {

	private dir: IVector
	private offset: { x: number; y: number } | null
	private grid: IGrid

	constructor(speed: number, grid: IGrid, keys: IKeyedMovement) {
		super(speed, keys)
		this.dir = {x: 0, y: 0}
		this.grid = grid
		this.offset = null
	}

	public applyToNode(node: ANode, layer: Layer, timeStep: number): void {
		if (this.offset === null) {
			this.offset = {x: node.position.x % 32, y: node.position.y % 32}
		}
		if (this.keysDown.left && this.dir.y === 0) {
			this.moveLeft(node, timeStep)
			this.dir = {x: -1, y: this.dir.y}
		} else if (this.keysDown.right && this.dir.y === 0) {
			this.moveRight(node, timeStep)
			this.dir = {x: 1, y: this.dir.y}
		} else if (this.dir.x === -1) {
			let limitX: number = Math.floor(node.position.x / 32) * 32
			if (node.position.x - timeStep * this.speed < limitX) {
				node.setPosition({x: limitX, y: node.position.y})
				this.dir = {x: 0, y: this.dir.y}
			} else {
				this.moveLeft(node, timeStep)
			}
		} else if (this.dir.x === 1) {
			let limitX: number = Math.ceil(node.position.x / 32) * 32
			if (node.position.x + timeStep * this.speed > limitX) {
				node.setPosition({x: limitX, y: node.position.y})
				this.dir = {x: 0, y: this.dir.y}
			} else {
				this.moveRight(node, timeStep)
			}
		} else if (this.keysDown.up && this.dir.x === 0) {
			this.moveUp(node, timeStep)
			this.dir = {x: this.dir.x, y: -1}
		} else if (this.keysDown.down) {
			this.moveDown(node, timeStep)
			this.dir = {x: this.dir.x, y: 1}
		} else if (this.dir.y === -1) {
			let limitY: number = Math.floor(node.position.y / 32) * 32
			if (node.position.y - timeStep * this.speed < limitY) {
				node.setPosition({x: node.position.x, y: limitY})
				this.dir = {x: this.dir.x, y: 0}
			} else {
				this.moveUp(node, timeStep)
			}
		} else if (this.dir.y === 1 && this.dir.x === 0) {
			let limitY: number = Math.ceil(node.position.y / 32) * 32
			if (node.position.y + timeStep * this.speed > limitY) {
				node.setPosition({x: node.position.x, y: limitY})
				this.dir = {x: this.dir.x, y: 0}
			} else {
				this.moveDown(node, timeStep)
			}
		}
	}

}