import React, {Component, RefObject} from 'react'
import Layer from './core/scene/Layer'
import Game from './core/engine/Game'
import Scene from './core/Scene'
import {EKey} from './utils/EKey'
import {Grid} from './core/scene/nodes/shapes/Grid'
import IKeyedMovement from './core/engine/behaviors/IKeyedMovement'
import SpriteSheet from './core/scene/nodes/sprites/SpriteSheet'
import Sprite from './core/scene/nodes/sprites/Sprite'
import SpriteAnimation from './core/scene/nodes/sprites/SpriteAnimation'
import {IBoundaries} from './utils/IBoundaries'
import pokemon from '../resources/insurgence/Graphics/Characters/148.png'
import EventHandler from './core/engine/events/EventHandler'
import {EEventType} from './core/engine/events/EEventType'
import Direction from './utils/Direction'
import FourWayMovement from './core/engine/behaviors/FourWayMovement'
import DidMoveEvent from './core/engine/events/events/DidMoveEvent'
import {GridMovement} from './core/engine/behaviors/GridMovement'

export default class RPGDesigner extends Component {

	private layer1: RefObject<Layer> = React.createRef<Layer>()

	private main(scene: Scene): void {
		const animationUp: IBoundaries[] = []
		const animationDown: IBoundaries[] = []
		const animationLeft: IBoundaries[] = []
		const animationRight: IBoundaries[] = []
		for (let i = 0; i < 4; i++) {
			animationDown.push({x: i * 64, y: 0, w: 64, h: 64})
			animationRight.push({x: i * 64, y: 128, w: 64, h: 64})
			animationLeft.push({x: i * 64, y: 64, w: 64, h: 64})
			animationUp.push({x: i * 64, y: 192, w: 64, h: 64})
		}
		const defaultKeys: IKeyedMovement = {up: EKey.ARROWUP, down: EKey.ARROWDOWN, left: EKey.ARROWLEFT, right: EKey.ARROWRIGHT}
		const mirroredDefaultKeys: IKeyedMovement = {up: EKey.ARROWDOWN, down: EKey.ARROWUP, left: EKey.ARROWRIGHT, right: EKey.ARROWLEFT}
		const spriteSheet: SpriteSheet = new SpriteSheet('spriteSheet1', pokemon)
		const animSpeed: number = 1
		const animation1: SpriteAnimation = new SpriteAnimation('up', spriteSheet, animationUp, animationUp.length * animSpeed)
		const animation2: SpriteAnimation = new SpriteAnimation('down', spriteSheet, animationDown, animationDown.length * animSpeed)
		const animation3: SpriteAnimation = new SpriteAnimation('left', spriteSheet, animationLeft, animationLeft.length * animSpeed)
		const animation4: SpriteAnimation = new SpriteAnimation('right', spriteSheet, animationRight, animationRight.length * animSpeed)
		const hero: Sprite = new Sprite('hero', {x: 7 * 64, y: 4 * 64}, animation1)
		const grid: Grid = new Grid('grid', {x: 0, y: 0}, {x: 15, y: 9}, {w: 64, h: 64})
		let fourWayMovement = new FourWayMovement(0, defaultKeys)
		let gridMovement = new GridMovement(1, grid, mirroredDefaultKeys)
		hero.addBehaviour(fourWayMovement)
		grid.addBehaviour(gridMovement)
		EventHandler.create(gridMovement, EEventType.DID_MOVE, (event: DidMoveEvent) => {
			switch (event.status.before.direction) {
				case Direction.UP:
					hero.playAnimation(animation2)
					break
				case Direction.DOWN:
					hero.playAnimation(animation1)
					break
				case Direction.LEFT:
					hero.playAnimation(animation4)
					break
				case Direction.RIGHT:
					hero.playAnimation(animation3)
					break
			}
			if (event.status.after.direction === Direction.NONE) {
				hero.stopAnimation()
			}
		})
		this.layer1.current!.addNode(grid)
		this.layer1.current!.addNode(hero)
		Game.run(scene, 200)
	}

	public render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
		return (
			<Scene position={{x: 20, y: 10}} dimensions={{w: 961, h: 577}} ready={scene => this.main(scene)}>
				<Layer id='layer1' position={{x: 0, y: 0}} dimensions={{w: 961, h: 577}} ref={this.layer1} />
			</Scene>
		)
	}

}

