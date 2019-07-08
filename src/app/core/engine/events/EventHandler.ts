import AEventNotifier from './AEventNotifier'
import {EEventType} from './EEventType'
import AEvent from './AEvent'

export default class EventHandler {

	public static create(source: AEventNotifier, eventName: EEventType, handler: (event: AEvent) => void) {
		source.addListener({
			eventType: eventName,
			handler: handler
		})
	}

}