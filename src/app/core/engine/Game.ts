import Scene from '../Scene'
import {IVector} from '../../utils/IVector'

let pos: IVector = {x: 0, y: 0}
const speed: number = 0.0001

export default class Game {

	public static run(scene: Scene, fps: number = 60) {
		window.requestAnimationFrame((timestamp) => Game.loop(scene, 1000 / fps, timestamp, 0, 0))
	}

	private static loop(scene: Scene, timeStep: number, timestamp: number, delta: number, lastFrameTimeMs: number) {
		delta += timestamp - lastFrameTimeMs
		lastFrameTimeMs = timestamp
		let numUpdateSteps = 0
		while (delta >= timeStep) {
			this.update(scene, timeStep)
			delta -= timeStep
			if (++numUpdateSteps >= 200) {
				Game.panic(timeStep)
				break
			}
		}
		/*scene.clear()
		scene.drawEntities()*/
		window.requestAnimationFrame((timestamp) => Game.loop(scene, timeStep, timestamp, delta, lastFrameTimeMs))
	}

	private static update(scene: Scene, timeStep: number) {
		//scene.update(timeStep)
		pos = {x: pos.x + timeStep * speed, y: pos.y + timeStep * speed}
		console.log(pos)
	}

	private static panic(timeStep: number) {
		console.error('The update process is too slow to render the game at expected refresh rate (' + Math.round(1000 / timeStep) + ' frames per second)')
	}

}