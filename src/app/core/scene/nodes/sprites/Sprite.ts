import {ANode} from '../ANode'
import Layer from '../../Layer'
import {IVector} from '../../../../utils/IVector'
import SpriteSheet from '../settings/SpriteSheet'
import {IBoundaries} from '../../../../utils/IBoundaries'

export default class Sprite extends ANode {

	private spriteSheet: SpriteSheet
	private crop: IBoundaries

	constructor(id: string, position: IVector, spriteSheet: SpriteSheet, crop: IBoundaries) {
		super(id, position)
		this.spriteSheet = spriteSheet
		this.crop = crop
	}

	public draw(layer: Layer, context: CanvasRenderingContext2D): void {
		context.drawImage(this.spriteSheet.img, this.crop.x, this.crop.y, this.crop.w, this.crop.h, this.position.x, this.position.y, this.crop.w, this.crop.h)
	}

}