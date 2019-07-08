import {IIdentifiable} from '../../../utils/IIdentifiable'
import {IUpdatable} from './IUpdatable'
import {IDrawable} from './IDrawable'
import Layer from '../Layer'
import {ABehaviour} from '../../engine/behaviors/ABehaviour'
import {IVector} from '../../../utils/IVector'

export abstract class ANode implements IIdentifiable, IDrawable, IUpdatable {

	public readonly id: string
	public position: IVector
	private readonly behaviours: ABehaviour[]

	constructor(id: string, position: IVector) {
		this.id = id
		this.position = position
		this.behaviours = []
	}

	public addBehaviour(behaviour: ABehaviour): void {
		this.behaviours.push(behaviour)
	}

	public updateBehaviours(layer: Layer) {
		this.behaviours.forEach(behaviour => behaviour.applyToNode(this, layer))
	}

	public update(layer: Layer, timeStep: number): void {
	}

	public abstract draw(layer: Layer, context: CanvasRenderingContext2D): void

	public setPosition(position: IVector) {
		this.position = position
	}

}
