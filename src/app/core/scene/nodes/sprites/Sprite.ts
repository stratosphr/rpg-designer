import {ANode} from '../ANode'
import Layer from '../../Layer'
import {IVector} from '../../../../utils/IVector'
import SpriteSheet from '../settings/SpriteSheet'
import SpriteAnimation from '../settings/SpriteAnimation'

export default class Sprite extends ANode {

	private spriteSheet: SpriteSheet
	private animation: SpriteAnimation
	private frameIndex: number
	private frameCounter: number

	constructor(id: string, position: IVector, spriteSheet: SpriteSheet, animation: SpriteAnimation) {
		super(id, position)
		this.spriteSheet = spriteSheet
		this.animation = animation
		this.frameIndex = 0
		this.frameCounter = 0
	}

	public update(layer: Layer, timeStep: number): void {
		if (this.frameCounter % Math.round(1000 / timeStep / this.animation.framesPerSecond) === 0) {
			this.frameIndex = (this.frameIndex + 1) % this.animation.frames.length
		}
		++this.frameCounter
	}

	public draw(layer: Layer, context: CanvasRenderingContext2D): void {
		context.drawImage(this.spriteSheet.img, this.animation.frames[this.frameIndex].x, this.animation.frames[this.frameIndex].y, this.animation.frames[this.frameIndex].w, this.animation.frames[this.frameIndex].h, this.position.x, this.position.y, this.animation.frames[this.frameIndex].w, this.animation.frames[this.frameIndex].h)
	}

}