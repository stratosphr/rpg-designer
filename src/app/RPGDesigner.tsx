import React, {Component, RefObject} from 'react'
import Layer from './core/scene/Layer'
import Game from './core/engine/Game'
import Scene from './core/Scene'
import {EKey} from './utils/EKey'
import {Grid} from './core/scene/nodes/shapes/Grid'
import IKeyedMovement from './core/engine/behaviors/IKeyedMovement'
import SpriteSheet from './core/scene/nodes/settings/SpriteSheet'
import Sprite from './core/scene/nodes/sprites/Sprite'
import {GridMovement} from './core/engine/behaviors/GridMovement'

export default class RPGDesigner extends Component {

	private layer1: RefObject<Layer> = React.createRef<Layer>()

	private main(scene: Scene): void {
		const defaultKeys: IKeyedMovement = {up: EKey.UP, down: EKey.DOWN, left: EKey.LEFT, right: EKey.RIGHT}
		const spriteSheet: SpriteSheet = new SpriteSheet('rect1_l1', 'https://i.stack.imgur.com/C3ZwL.png')
		const sprite: Sprite = new Sprite('sprite1', {x: 128, y: 128}, spriteSheet, {x: 0, y: 0, w: 64, h: 64})
		const grid: Grid = new Grid('grid', {x: 0, y: 0}, {x: 28, y: 16}, {w: 64, h: 64})
		sprite.addBehaviour(new GridMovement(1, grid, defaultKeys))
		this.layer1.current!.addNode(sprite)
		this.layer1.current!.addNode(grid)
		Game.run(scene, 120)
	}

	public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
		return (
			<Scene position={{x: 20, y: 10}} dimensions={{w: 897, h: 513}} ready={scene => this.main(scene)}>
				<Layer id='layer1' position={{x: 0, y: 0}} dimensions={{w: 897, h: 513}} ref={this.layer1} />
			</Scene>
		)
	}

}

