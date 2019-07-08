import {EEventType} from './EEventType'

export default class AEvent {

	public readonly name: EEventType

	constructor(name: EEventType) {
		this.name = name
	}

}