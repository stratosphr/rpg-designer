import React, {Component} from 'react'
import Layer from './core/scene/Layer'
import Game from './core/engine/Game'
import Scene from './core/Scene'

export default class RPGDesigner extends Component {

	private layer1 = React.createRef<Layer>()
	private layer2 = React.createRef<Layer>()

	private static main(scene: Scene): void {
		Game.run(scene)
	}

	public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
		return (
			<Scene position={{x: 20, y: 10}} dimensions={{w: 912, h: 513}} ready={scene => RPGDesigner.main(scene)}>
				<Layer id='layer1' position={{x: 100, y: 0}} dimensions={{w: 100, h: 100}} ref={this.layer1} />
				<Layer id='layer2' position={{x: 10, y: 10}} dimensions={{w: 200, h: 50}} ref={this.layer2} />
			</Scene>
		)
	}

}

