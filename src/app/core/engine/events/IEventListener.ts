export interface IEventListener {

	readonly category: string
	readonly eventName: string
	readonly handler: (event: string) => void

}