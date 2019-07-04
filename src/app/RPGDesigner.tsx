import React, {Component, RefObject} from 'react'
import Layer from './core/scene/Layer'
import Game from './core/engine/Game'
import Scene from './core/Scene'
import Rectangle from './core/scene/nodes/shapes/Rectangle'
import FourDirection from './core/engine/behaviors/FourDirection'
import {EKey} from './utils/EKey'

export default class RPGDesigner extends Component {

	private layer1: RefObject<Layer> = React.createRef<Layer>()
	private layer2: RefObject<Layer> = React.createRef<Layer>()
	private layer3: RefObject<Layer> = React.createRef<Layer>()

	private main(scene: Scene): void {
		const rect1: Rectangle = new class extends Rectangle {
		}('rect1_l1', {x: 10, y: 10}, {w: 32, h: 32})
		const rect2: Rectangle = new class extends Rectangle {
		}('rect2_l1', {x: 20, y: 100}, {w: 600, h: 200})
		const rect3: Rectangle = new class extends Rectangle {
		}('rect3_l2', {x: 20, y: 100}, {w: 600, h: 200})
		rect1.addBehaviour(new FourDirection(0.1))
		rect2.addBehaviour(new FourDirection(0.2, {up: EKey.Z, down: EKey.S, left: EKey.Q, right: EKey.D}))
		rect3.addBehaviour(new FourDirection(0.2, {up: EKey.NONE, down: EKey.NONE, left: EKey.Q, right: EKey.D}))
		this.layer1.current!.addNode(rect1)
		this.layer1.current!.addNode(rect2)
		this.layer2.current!.addNode(rect3)
		Game.run(scene, 60)
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

