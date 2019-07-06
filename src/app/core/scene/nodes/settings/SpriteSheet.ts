import {IIdentifiable} from '../../../../utils/IIdentifiable'

export default class SpriteSheet implements IIdentifiable {

	public readonly id: string
	public readonly img: HTMLImageElement

	constructor(id: string, src: string) {
		this.id = id
		this.img = new Image()
		this.img.src = src
	}

}