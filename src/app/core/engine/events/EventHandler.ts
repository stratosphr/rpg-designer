import AEventNotifier from './AEventNotifier'
import {EEventType} from './EEventType'
import AEvent from './events/AEvent'
import {IEventState} from './IEventState'

export default class EventHandler {

	public static create<Status extends IEventState>(source: AEventNotifier, eventName: EEventType, handler: (event: AEvent<Status>) => void) {
		source.addListener({
			eventType: eventName,
			handler: handler
		})
	}

}