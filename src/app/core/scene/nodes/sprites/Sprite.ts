import {ANode} from '../ANode'
import Layer from '../../Layer'
import {IVector} from '../../../../utils/IVector'
import SpriteAnimation from './SpriteAnimation'

export default class Sprite extends ANode {

	private animation: SpriteAnimation
	private frameIndex: number
	private frameCounter: number
	private animationRunning: boolean

	constructor(id: string, position: IVector, animation: SpriteAnimation) {
		super(id, position)
		this.animation = animation
		this.frameIndex = 0
		this.frameCounter = 0
		this.animationRunning = false
	}

	public update(layer: Layer, timeStep: number): void {
		if (this.animationRunning) {
			if (this.frameCounter % Math.round(1000 / timeStep / this.animation.framesPerSecond) === 0) {
				this.frameIndex = (this.frameIndex + 1) % this.animation.frames.length
			}
			++this.frameCounter
		}
	}

	public draw(layer: Layer, context: CanvasRenderingContext2D): void {
		context.drawImage(this.animation.spriteSheet.img, this.animation.frames[this.frameIndex].x, this.animation.frames[this.frameIndex].y, this.animation.frames[this.frameIndex].w, this.animation.frames[this.frameIndex].h, this.position.x, this.position.y, this.animation.frames[this.frameIndex].w, this.animation.frames[this.frameIndex].h)
	}

	public playAnimation(animation: SpriteAnimation) {
		this.animation = animation
		this.animationRunning = true
	}

	public stopAnimation() {
		this.animationRunning = false
		this.frameCounter = 0
		this.frameIndex = 0
	}

}