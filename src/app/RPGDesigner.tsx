import React, {Component} from 'react'
import Scene from './core/Scene'
import Layer from './core/nodes/Layer'
import Game from './core/engine/Game'

export default class RPGDesigner extends Component {

	private static main(scene: Scene): void {
		let layer1 = <Layer id='layer1' position={{x: 100, y: 0}} dimensions={{w: 100, h: 100}} />
		let layer2 = <Layer id='layer2' position={{x: 10, y: 10}} dimensions={{w: 200, h: 50}} />
		scene.addLayer(layer1)
		scene.addLayer(layer2)
		Game.run(scene)
	}

	public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
		return (
			<Scene position={{x: 20, y: 10}} dimensions={{w: 912, h: 513}} ready={scene => RPGDesigner.main(scene)} />
		)
	}

}

