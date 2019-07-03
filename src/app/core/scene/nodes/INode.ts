import {IIdentifiable} from '../../../utils/IIdentifiable'
import {IUpdatable} from './IUpdatable'
import {IDrawable} from './IDrawable'

export interface INode extends IIdentifiable, IUpdatable, IDrawable {

}