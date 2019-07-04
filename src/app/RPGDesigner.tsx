import React, {Component, RefObject} from 'react'
import Layer from './core/scene/Layer'
import Game from './core/engine/Game'
import Scene from './core/Scene'
import Rectangle from './core/scene/nodes/shapes/Rectangle'

export default class RPGDesigner extends Component {

	private layer1: RefObject<Layer> = React.createRef<Layer>()
	private layer2: RefObject<Layer> = React.createRef<Layer>()
	private layer3: RefObject<Layer> = React.createRef<Layer>()

	private main(scene: Scene): void {
		const speedFactor: number = 1
		const rect1: Rectangle = new class extends Rectangle {

			public update(layer: Layer, timeStep: number): void {
				this.position = {x: this.position.x + timeStep * speedFactor * Math.random(), y: this.position.y}
			}
		}('rect1_l1', {x: 10, y: 10}, {w: 32, h: 32})
		const rect2: Rectangle = new class extends Rectangle {

			public update(layer: Layer, timeStep: number): void {
				this.position = {x: this.position.x + timeStep * speedFactor * Math.random(), y: this.position.y}
			}
		}('rect1_l1', {x: 20, y: 100}, {w: 32, h: 32})
		this.layer1.current!.addNode(rect1)
		this.layer1.current!.addNode(rect2)
		Game.run(scene, 200)
	}

	public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
		return (
			<Scene position={{x: 20, y: 10}} dimensions={{w: 912, h: 513}} ready={scene => this.main(scene)}>
				<Layer id='layer1' position={{x: 100, y: 0}} dimensions={{w: 500, h: 200}} ref={this.layer1} />
				<Layer id='layer2' position={{x: 10, y: 200}} dimensions={{w: 500, h: 300}} ref={this.layer2} />
				<Layer id='layer3' position={{x: 300, y: 150}} dimensions={{w: 500, h: 300}} ref={this.layer3} />
			</Scene>
		)
	}

}

