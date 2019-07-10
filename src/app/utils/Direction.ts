import {IVector} from './IVector'

export default abstract class Direction implements IVector {

	public readonly x: number
	public readonly y: number

	public static readonly UP: Direction = {x: 0, y: -1}
	public static readonly DOWN: Direction = {x: 0, y: 1}
	public static readonly LEFT: Direction = {x: -1, y: 0}
	public static readonly RIGHT: Direction = {x: 1, y: 0}
	public static NONE: Direction = {x: 0, y: 0}

	protected constructor(x: number, y: number) {
		this.x = x
		this.y = y
	}

}