class FPSDisplay extends GameObject{
    seconds: number;
    fps: number;
    fpsCounter: number;
 
    public init(gameManager: GameManager) {
		super.init(gameManager);
        this.seconds = -1;
        this.fps = 0;
    }
 
    public update(delta: number) {
    	var currentSeconds = new Date().getSeconds();

    	if (this.seconds == currentSeconds) {
    		this.fpsCounter++;
    	} else {
    		this.fps = this.fpsCounter;
    		this.fpsCounter = 0;
    		this.seconds = currentSeconds;
    	}
    }
 
    public draw(ctx: CanvasRenderingContext2D) {
    	ctx.fillStyle = '#f00';
    	ctx.font = '10px Arial';
    	ctx.fillText('FPS: ' + this.fps, 10, 10);
    }
}