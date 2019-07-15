import AEventNotifier from '../../../engine/events/AEventNotifier'
import {EEventCategory} from '../../../engine/events/EEventCategory'
import {EEventType} from '../../../engine/events/EEventType'
import {EKey} from '../../../../utils/EKey'
import KeyUpEvent from '../../../engine/events/events/KeyUpEvent'
import {IKeyEventState} from '../../../engine/events/events/KeyEvent'
import KeyDownEvent from '../../../engine/events/events/KeyDownEvent'

export default class Keyboard extends AEventNotifier {

	private static singleton: Keyboard | null = null
	private readonly keysDown: Map<EKey, boolean>

	private constructor() {
		super(EEventCategory.KEYBOARD, [EEventType.KEY_DOWN, EEventType.KEY_UP])
		this.keysDown = new Map<EKey, boolean>()
		Object.keys(EKey).forEach(key => this.keysDown.set(key as EKey, false))
		document.addEventListener('keydown', ev => this.handleKey(ev, true), false)
		document.addEventListener('keyup', ev => this.handleKey(ev, false), false)
	}

	public static getSingleton(): Keyboard {
		if (Keyboard.singleton === null) {
			Keyboard.singleton = new Keyboard()
		}
		return Keyboard.singleton
	}

	private handleKey(ev: KeyboardEvent, isDown: boolean) {
		const key: EKey = (EKey as any)[ev.key.toUpperCase()]
		this.keysDown.set(key, isDown)
		const status: IKeyEventState = {key: key, keysDown: this.keysDown}
		this.notifyListeners(isDown ? new KeyDownEvent(status) : new KeyUpEvent(status))
	}

}