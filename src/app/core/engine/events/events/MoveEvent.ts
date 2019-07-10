import AEvent from './AEvent'
import {EEventType} from '../EEventType'
import {IEventState} from '../IEventState'
import Direction from '../../../../utils/Direction'
import {IVector} from '../../../../utils/IVector'

interface IMoveEventState extends IEventState {

	before: { direction: Direction, position: IVector },
	after: { direction: Direction, position: IVector }

}

export default class MoveEvent extends AEvent<IMoveEventState> {

	constructor(status: IMoveEventState) {
		super(EEventType.MOVE, status)
	}

}

