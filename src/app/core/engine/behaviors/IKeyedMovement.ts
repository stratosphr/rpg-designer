import {EKey} from '../../../utils/EKey'

export default interface IKeyedMovement {

	readonly up: EKey
	readonly down: EKey
	readonly left: EKey
	readonly right: EKey

}