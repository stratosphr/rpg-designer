import Scene from '../../Scene'

export interface IUpdatable {

	update(scene: Scene, timeStep: number): void

}

