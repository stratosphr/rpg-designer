import AKeyEvent, {IKeyEventState} from './KeyEvent'
import {EEventType} from '../EEventType'

export default class KeyUpEvent extends AKeyEvent {

	constructor(status: IKeyEventState) {
		super(EEventType.KEY_DOWN, status)
	}

}