import {IEventListener} from './IEventListener'
import AEvent from './AEvent'
import {EEventCategory} from './EEventCategory'
import {EEventType} from './EEventType'

export default abstract class AEventNotifier {

	public readonly name: EEventCategory
	public readonly triggerableEvents: EEventType[]
	public readonly listeners: IEventListener[]

	protected constructor(name: EEventCategory, triggerableEvents: EEventType[]) {
		this.name = name
		this.triggerableEvents = triggerableEvents
		this.listeners = []
	}

	public addListener(listener: IEventListener): void {
		this.listeners.push(listener)
	}

	protected notifyListeners(event: AEvent): void {
		this.listeners.forEach(listener => {
			if (listener.eventType === event.name) {
				listener.handler(event)
			}
		})
	}

}
