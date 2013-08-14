class LookUpTable extends GameObject {
    bufferAngle: ArrayBuffer = null;
    dataViewAngle: DataView = null;
    bufferDistance: ArrayBuffer = null;
    dataViewDistance: DataView = null;
    bufferDepth: ArrayBuffer = null;
    dataViewDepth: DataView = null;
 
    public init(gameManager: GameManager) {
        super.init(gameManager);

        var width = gameManager.screen.width;
        var height = gameManager.screen.height;
        var radToByte = 256/(Math.PI * 2);
        var center = new Vector2(width / 2, height / 2);
        var maxMagnitude = 256/(center.sub(new Vector2())).magnitude();

        this.bufferAngle = new ArrayBuffer(width * height);
        this.dataViewAngle = new DataView(this.bufferAngle);
        this.bufferDistance = new ArrayBuffer(width * height);
        this.dataViewDistance = new DataView(this.bufferDistance);
        this.bufferDepth = new ArrayBuffer(width * height);
        this.dataViewDepth = new DataView(this.bufferDepth);

        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var vector = center.sub(new Vector2 (x, y));
                var index = x + y * width;
                var mag = vector.magnitude();

                this.dataViewAngle.setUint8(index, (vector.angle())  * radToByte);
                this.dataViewDistance.setUint8(index, (18000 / mag));
                this.dataViewDepth.setUint8(index, mag * maxMagnitude);
            }
        }
    }
}