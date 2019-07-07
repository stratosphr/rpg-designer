import React, {Component, RefObject} from 'react'
import Layer from './core/scene/Layer'
import Game from './core/engine/Game'
import Scene from './core/Scene'
import {EKey} from './utils/EKey'
import {Grid} from './core/scene/nodes/shapes/Grid'
import IKeyedMovement from './core/engine/behaviors/IKeyedMovement'
import SpriteSheet from './core/scene/nodes/sprites/SpriteSheet'
import Sprite from './core/scene/nodes/sprites/Sprite'
import {GridMovement} from './core/engine/behaviors/GridMovement'
import SpriteAnimation from './core/scene/nodes/sprites/SpriteAnimation'
import {IBoundaries} from './utils/IBoundaries'
import skeleton from '../resources/skeleton_spritesheet.png'

export default class RPGDesigner extends Component {

	private layer1: RefObject<Layer> = React.createRef<Layer>()

	private main(scene: Scene): void {
		const animationUp: IBoundaries[] = []
		const animationDown: IBoundaries[] = []
		const animationLeft: IBoundaries[] = []
		const animationRight: IBoundaries[] = []
		for (let i = 1; i < 9; i++) {
			animationUp.push({x: i * 64, y: 0, w: 64, h: 64})
			animationDown.push({x: i * 64, y: 128, w: 64, h: 64})
			animationLeft.push({x: i * 64, y: 64, w: 64, h: 64})
			animationRight.push({x: i * 64, y: 192, w: 64, h: 64})
		}
		const defaultKeys: IKeyedMovement = {up: EKey.UP, down: EKey.DOWN, left: EKey.LEFT, right: EKey.RIGHT}
		const spriteSheet: SpriteSheet = new SpriteSheet('spriteSheet1', skeleton)
		const animation1: SpriteAnimation = new SpriteAnimation('up', spriteSheet, animationUp, animationUp.length)
		const animation2: SpriteAnimation = new SpriteAnimation('down', spriteSheet, animationDown, animationDown.length)
		const animation3: SpriteAnimation = new SpriteAnimation('left', spriteSheet, animationLeft, animationLeft.length)
		const animation4: SpriteAnimation = new SpriteAnimation('right', spriteSheet, animationRight, animationRight.length)
		const sprite1: Sprite = new Sprite('sprite1', {x: 128, y: 128}, spriteSheet, [animation1, animation2, animation3, animation4])
		const grid: Grid = new Grid('grid', {x: 0, y: 0}, {x: 28, y: 16}, {w: 64, h: 64})
		sprite1.addBehaviour(new GridMovement(1, grid, defaultKeys))
		this.layer1.current!.addNode(grid)
		this.layer1.current!.addNode(sprite1)
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

