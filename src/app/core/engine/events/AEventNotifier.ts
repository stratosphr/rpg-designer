import {IEventListener} from './IEventListener'
import AEvent from './events/AEvent'
import {EEventCategory} from './EEventCategory'
import {EEventType} from './EEventType'
import {IEventState} from './IEventState'

export default abstract class AEventNotifier {

	public readonly name: EEventCategory
	public readonly triggerableEvents: EEventType[]
	public readonly listeners: IEventListener<any>[]

	protected constructor(name: EEventCategory, triggerableEvents: EEventType[]) {
		this.name = name
		this.triggerableEvents = triggerableEvents
		this.listeners = []
	}

	public addListener<State extends IEventState>(listener: IEventListener<State>): void {
		this.listeners.push(listener)
	}

	protected notifyListeners<State extends IEventState>(event: AEvent<State>): void {
		this.listeners.forEach(listener => {
			if (listener.eventType === event.name) {
				listener.handler(event)
			}
		})
	}

}
