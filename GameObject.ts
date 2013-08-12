class GameObject {
	public gameManager: GameManager;
 
	public init(gameManager: GameManager) {
		this.gameManager = gameManager;
	}
 
	public update(delta: number) { }
 
	public draw(ctx: CanvasRenderingContext2D) { }
}