import IKeyedMovement from './IKeyedMovement'
import {EKey} from '../../../utils/EKey'
import AMovement from './AMovement'
import {EEventCategory} from '../events/EEventCategory'

export default class HeightWayMovement extends AMovement {

	constructor(speed: number, keys: IKeyedMovement = {up: EKey.ARROWUP, down: EKey.ARROWDOWN, left: EKey.ARROWLEFT, right: EKey.ARROWRIGHT}) {
		super(EEventCategory.HEIGHT_WAY_MOVEMENT, [], speed, keys)
	}

}