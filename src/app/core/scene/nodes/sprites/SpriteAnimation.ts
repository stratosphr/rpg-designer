import SpriteSheet from './SpriteSheet'
import {IIdentifiable} from '../../../../utils/IIdentifiable'
import {IBoundaries} from '../../../../utils/IBoundaries'

export default class SpriteAnimation implements IIdentifiable {

	public readonly id: string
	public readonly spriteSheet: SpriteSheet
	public readonly frames: IBoundaries[]
	public readonly framesPerSecond: number

	constructor(id: string, spriteSheet: SpriteSheet, frames: IBoundaries[], framesPerSecond: number = 1) {
		this.id = id
		this.spriteSheet = spriteSheet
		this.frames = frames
		this.framesPerSecond = framesPerSecond
	}

}