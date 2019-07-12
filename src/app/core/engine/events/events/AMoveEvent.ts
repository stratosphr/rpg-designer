import AEvent from './AEvent'
import {EEventType} from '../EEventType'
import {IEventState} from '../IEventState'
import Direction from '../../../../utils/Direction'
import {IVector} from '../../../../utils/IVector'

export interface IMoveEventState extends IEventState {

	before: { direction: Direction, position: IVector },
	after: { direction: Direction, position: IVector }

}

export default abstract class AMoveEvent extends AEvent<IMoveEventState> {

	protected constructor(type: EEventType = EEventType.WILL_MOVE, status: IMoveEventState) {
		super(type, status)
	}

}

