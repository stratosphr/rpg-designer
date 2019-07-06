import HeightWayMovement from './HeightWayMovement'
import {GridMovement} from './GridMovement'
import FourWayMovement from './FourWayMovement'

export interface IBehaviourListener {

	handleBehaviourNotification(heightWayMovement: HeightWayMovement, event: string): void

	handleBehaviourNotification(heightWayMovement: FourWayMovement, event: string): void

	handleBehaviourNotification(heightWayMovement: GridMovement, event: string): void

}