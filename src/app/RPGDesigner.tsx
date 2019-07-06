import React, {Component, RefObject} from 'react'
import Layer from './core/scene/Layer'
import Game from './core/engine/Game'
import Scene from './core/Scene'
import Rectangle from './core/scene/nodes/shapes/Rectangle'
import HeightWayMovement from './core/engine/behaviors/HeightWayMovement'
import {EKey} from './utils/EKey'
import {Grid} from './core/scene/nodes/shapes/Grid'
import {GridMovement} from './core/engine/behaviors/GridMovement'
import FourWayMovement from './core/engine/behaviors/FourWayMovement'

export default class RPGDesigner extends Component {

	private layer1: RefObject<Layer> = React.createRef<Layer>()
	private layer2: RefObject<Layer> = React.createRef<Layer>()
	private layer3: RefObject<Layer> = React.createRef<Layer>()

	private main(scene: Scene): void {
		const rect1: Rectangle = new class extends Rectangle {
		}('rect1_l1', {x: 320, y: 0}, {w: 32, h: 32})
		const rect2: Rectangle = new class extends Rectangle {
		}('rect2_l1', {x: 52, y: 38}, {w: 32, h: 32})
		const rect3: Rectangle = new class extends Rectangle {
		}('rect3_l2', {x: 20, y: 100}, {w: 32, h: 32})
		const grid: Grid = new class extends Grid {
		}('grid', {x: 0, y: 0}, {x: 28, y: 16}, {w: 32, h: 32})
		rect1.addBehaviour(new HeightWayMovement(1))
		rect2.addBehaviour(new GridMovement(0.2, {nbCells: {x: 28, y: 16}, cellsDimensions: {w: 32, h: 32}}, {up: EKey.Z, down: EKey.S, left: EKey.Q, right: EKey.D}))
		rect3.addBehaviour(new FourWayMovement(1, {up: EKey.I, down: EKey.K, left: EKey.J, right: EKey.L}))
		this.layer1.current!.addNode(grid)
		this.layer1.current!.addNode(rect1)
		this.layer1.current!.addNode(rect2)
		this.layer2.current!.addNode(rect3)
		this.layer3.current!.addNode(rect3)
		Game.run(scene, 120)
	}

	public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
		return (
			<Scene position={{x: 20, y: 10}} dimensions={{w: 897, h: 513}} ready={scene => this.main(scene)}>
				<Layer id='layer1' position={{x: 0, y: 0}} dimensions={{w: 897, h: 513}} ref={this.layer1} />
				<Layer id='layer2' position={{x: 10.27, y: 200.18}} dimensions={{w: 500, h: 300}} ref={this.layer2} />
				<Layer id='layer3' position={{x: 300, y: 150}} dimensions={{w: 500, h: 300}} ref={this.layer3} />
			</Scene>
		)
	}

}

