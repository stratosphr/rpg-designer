import {EEventType} from '../EEventType'
import AMoveEvent, {IMoveEventState} from './AMoveEvent'

export default class WillMoveEvent extends AMoveEvent {

	constructor(state: IMoveEventState) {
		super(EEventType.WILL_MOVE, state)
	}

}

