import React, {Component, RefObject} from 'react'
import Layer from './core/scene/Layer'
import Game from './core/engine/Game'
import Scene from './core/Scene'
import Rectangle from './core/scene/nodes/shapes/Rectangle'
import FourWayMovement from './core/engine/behaviors/FourWayMovement'
import {EKey} from './utils/EKey'
import {Grid} from './core/scene/nodes/shapes/Grid'
import {IVector} from './utils/IVector'
import {GridMovement} from './core/engine/behaviors/GridMovement'

// TODO: set speed in pixel per frame
export default class RPGDesigner extends Component {

	private layer1: RefObject<Layer> = React.createRef<Layer>()
	private layer2: RefObject<Layer> = React.createRef<Layer>()
	private layer3: RefObject<Layer> = React.createRef<Layer>()

	private main(scene: Scene): void {
		const rect1: Rectangle = new class extends Rectangle {
			private dir: IVector = {x: 1, y: 1}

			public update(layer: Layer, timeStep: number): void {
				let speed: number = 0.1
				if ((this.position.x <= layer.props.position.x && this.dir.x === -1) || (this.position.x + this.dimensions.w >= layer.props.position.x + layer.props.dimensions.w && this.dir.x === 1)) {
					this.dir = {x: -this.dir.x, y: this.dir.y}
				}
				if ((this.position.y <= layer.props.position.y && this.dir.y === -1) || (this.position.y + this.dimensions.h >= layer.props.position.y + layer.props.dimensions.h && this.dir.y === 1)) {
					this.dir = {x: this.dir.x, y: -this.dir.y}
				}
				this.setPosition({x: this.position.x + this.dir.x * timeStep * speed, y: this.position.y + this.dir.y * timeStep * speed})
			}
		}('rect1_l1', {x: 320, y: 0}, {w: 32, h: 32})
		const rect2: Rectangle = new class extends Rectangle {
		}('rect2_l1', {x: 16, y: 64}, {w: 16, h: 48})
		const rect3: Rectangle = new class extends Rectangle {
		}('rect3_l2', {x: 20, y: 100}, {w: 32, h: 32})
		const grid: Grid = new class extends Grid {
		}('grid', {x: 0, y: 0}, {x: 28, y: 16}, {w: 16, h: 48})
		rect1.addBehaviour(new FourWayMovement(0.7))
		rect2.addBehaviour(new GridMovement(0.2, {nbCells: {x: 28, y: 16}, cellsDimensions: {w: 16, h: 48}}, {up: EKey.Z, down: EKey.S, left: EKey.Q, right: EKey.D}))
		rect3.addBehaviour(new FourWayMovement(0.2, {up: EKey.NONE, down: EKey.NONE, left: EKey.NONE, right: EKey.NONE}))
		this.layer1.current!.addNode(grid)
		this.layer1.current!.addNode(rect1)
		this.layer1.current!.addNode(rect2)
		this.layer2.current!.addNode(rect3)
		Game.run(scene, 120)
	}

	public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
		return (
			<Scene position={{x: 20, y: 10}} dimensions={{w: 897, h: 513}} ready={scene => this.main(scene)}>
				<Layer id='layer1' position={{x: 0, y: 0}} dimensions={{w: 897, h: 513}} ref={this.layer1} />
				<Layer id='layer2' position={{x: 10, y: 200}} dimensions={{w: 500, h: 300}} ref={this.layer2} />
				<Layer id='layer3' position={{x: 300, y: 150}} dimensions={{w: 500, h: 300}} ref={this.layer3} />
			</Scene>
		)
	}

}

