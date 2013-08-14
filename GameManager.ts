class GameManager {
    lastTimeStamp: number;
    delta: number;
    ctx: CanvasRenderingContext2D;
    screen: GameScreen;
    gameObjects: GameObject[];
    initialized: bool = false;

    constructor() {
        this.lastTimeStamp = new Date().getTime();
        this.delta = 0;
        this.gameObjects = [];
    }

    public add(gameObject: GameObject) {
        this.initialized && gameObject.init(this);
        this.gameObjects.push(gameObject);
    }

    public init(canvas: HTMLCanvasElement) {
        this.screen = new GameScreen(canvas.width, canvas.height);
        this.ctx = canvas.getContext('2d');
        this.initialized = true;

        for (var i = this.gameObjects.length - 1; i >= 0; i--) {
            this.gameObjects[i].init(this);
        }
    }

    public update() {
        for (var i = this.gameObjects.length - 1; i >= 0; i--) {
            this.gameObjects[i].update(this.delta);
        }
    }
 
    public draw() {
        for (var i = this.gameObjects.length - 1; i >= 0; i--) {
            this.gameObjects[i].draw(this.ctx);
        }
    }
 
    public timerStart() {
        this.delta = new Date().getTime() - this.lastTimeStamp;
        this.delta *= 0.01;
    }
 
    public timerEnd() {
        this.lastTimeStamp = new Date().getTime();
    }
}