import AEventNotifier from './AEventNotifier'

export default class EventHandler {

	constructor(source: AEventNotifier, category: string, eventName: string, handler: (event: string) => void) {
		source.addListener({
			category: category,
			eventName: eventName,
			handler: handler
		})
	}

}