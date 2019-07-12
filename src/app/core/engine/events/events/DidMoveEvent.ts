import {EEventType} from '../EEventType'
import AMoveEvent, {IMoveEventState} from './AMoveEvent'

export default class DidMoveEvent extends AMoveEvent {

	constructor(state: IMoveEventState) {
		super(EEventType.DID_MOVE, state)
	}

}

