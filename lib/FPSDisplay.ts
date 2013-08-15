class FPSDisplay extends GameObject{
    private seconds: number;
    private fps: number;
    private fpsCounter: number;
 
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
        ctx.fillStyle = '#000';
        ctx.font = 'bold 14px Curier';
        this.fps && ctx.fillText('' + this.fps, 10, 15);
    }
}