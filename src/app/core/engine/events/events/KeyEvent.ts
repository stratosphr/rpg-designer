import AEvent from './AEvent'
import {EKey} from '../../../../utils/EKey'
import {EEventType} from '../EEventType'

export interface IKeyEventState {

	key: EKey,
	keysDown: Map<EKey, boolean>

}

export default abstract class KeyEvent extends AEvent<IKeyEventState> {

	protected constructor(name: EEventType, status: IKeyEventState) {
		super(name, status)
	}

}