import {IVector} from './IVector'
import {IDimensions} from './IDimensions'

export interface IGrid {

	readonly nbCells: IVector
	readonly cellsDimensions: IDimensions

}