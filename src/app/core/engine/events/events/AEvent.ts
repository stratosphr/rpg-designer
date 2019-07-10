import {EEventType} from '../EEventType'
import {IEventState} from '../IEventState'

export default abstract class AEvent<State extends IEventState> {

	public readonly name: EEventType
	public readonly status: State

	protected constructor(name: EEventType, status: State) {
		this.name = name
		this.status = status
	}

}