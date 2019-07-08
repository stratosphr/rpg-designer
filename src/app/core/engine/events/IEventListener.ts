import {EEventType} from './EEventType'
import AEvent from './AEvent'

export interface IEventListener {

	readonly eventType: EEventType
	readonly handler: (event: AEvent) => void

}