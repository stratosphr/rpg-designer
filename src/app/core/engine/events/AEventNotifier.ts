import {IEventListener} from './IEventListener'
import {ITriggerableEvent} from './ITriggerableEvent'

export default abstract class AEventNotifier {

	public readonly category: string
	public readonly triggerableEvents: ITriggerableEvent[]
	public readonly listeners: IEventListener[]

	protected constructor(category: string, triggerableEvents: ITriggerableEvent[]) {
		this.category = category
		this.triggerableEvents = triggerableEvents
		this.listeners = []
	}

	public addListener(listener: IEventListener): void {
		this.listeners.push(listener)
	}

	protected notifyListeners(eventName: string): void {
		this.listeners.forEach(listener => {
			if (listener.category === this.category && listener.eventName === eventName) {
				listener.handler(eventName)
			}
		})
	}

}


