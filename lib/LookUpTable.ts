class LookUpTable extends GameObject {
    private bufferAngle: ArrayBuffer = null;
    private bufferDistance: ArrayBuffer = null;
    private bufferDepth: ArrayBuffer = null;
    public dataViewAngle: DataView = null;
    public dataViewDistance: DataView = null;
    public dataViewDepth: DataView = null;
 
    public init(gameManager: GameManager) {
        super.init(gameManager);

        var width: number = gameManager.screen.width;
        var height: number = gameManager.screen.height;
        var radToByte: number = 256/(Math.PI * 2);
        var center: Vector2 = new Vector2(width / 2, height / 2);
        var maxMagnitude: number = 256/(center.sub(new Vector2())).magnitude();

        this.bufferAngle = new ArrayBuffer(width * height);
        this.dataViewAngle = new DataView(this.bufferAngle);
        this.bufferDistance = new ArrayBuffer(width * height);
        this.dataViewDistance = new DataView(this.bufferDistance);
        this.bufferDepth = new ArrayBuffer(width * height);
        this.dataViewDepth = new DataView(this.bufferDepth);

        for (var x: number = 0; x < width; x++) {
            for (var y: number = 0; y < height; y++) {
                var vector: Vector2 = center.sub(new Vector2 (x, y));
                var index: number = x + y * width;
                var mag: number = vector.magnitude();

                this.dataViewAngle.setUint8(index, (vector.angle())  * radToByte);
                this.dataViewDistance.setUint8(index, (18000 / mag));
                this.dataViewDepth.setUint8(index, mag * maxMagnitude);
            }
        }
    }
}