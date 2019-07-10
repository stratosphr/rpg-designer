import {EEventType} from './EEventType'
import AEvent from './events/AEvent'
import {IEventState} from './IEventState'

export interface IEventListener<State extends IEventState> {

	readonly eventType: EEventType
	readonly handler: (event: AEvent<State>) => void

}