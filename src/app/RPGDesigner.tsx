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
		const rect1_l1 = new Rectangle('rect1_l1', {x: 10, y: 10}, {w: 32, h: 32})
		const rect1_l2 = new Rectangle('rect1_l2', {x: 10, y: 10}, {w: 32, h: 32})
		const rect1_l3 = new Rectangle('rect1_l3', {x: 10, y: 10}, {w: 32, h: 32})
		const rect2 = new Rectangle('rect2', {x: 10, y: 70}, {w: 32, h: 32})
		const rect3 = new Rectangle('rect3', {x: 10, y: 110}, {w: 32, h: 32})
		this.layer1.current!.addNode(rect1_l1)
		this.layer1.current!.addNode(rect2)
		this.layer1.current!.addNode(rect3)
		this.layer2.current!.addNode(rect1_l2)
		this.layer3.current!.addNode(rect1_l3)
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

