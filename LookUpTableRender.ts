class LookUpTableRender extends GameObject {
    lookUpTable: LookUpTable = null;
    imageData: ImageData = null;
 
    public init(gameManager: GameManager) {
        super.init(gameManager);
        this.lookUpTable = new LookUpTable();
        this.lookUpTable.init(gameManager);
    }

    public draw(ctx: CanvasRenderingContext2D) {
        this.imageData = this.imageData ? this.imageData : ctx.getImageData(0, 0, this.gameManager.screen.width, this.gameManager.screen.height);
        var lutAngle = this.lookUpTable.dataViewAngle;
        var lutDistance = this.lookUpTable.dataViewDistance;
        var lutDepth = this.lookUpTable.dataViewDepth;

        for (var x = 0; x < this.gameManager.screen.width; x++) {
            for (var y = 0; y < this.gameManager.screen.height; y++) {
                var index = x + y * this.gameManager.screen.width;
                this.setPixel(x, y, lutAngle.getUint8(index), lutDistance.getUint8(index), lutDepth.getUint8(index), 255);
            }
        }

        ctx.putImageData(this.imageData, 0, 0);
    }

    private setPixel(x: number, y: number, r: number, g: number, b: number, a: number) {
        var index = (x + y * this.imageData.width) << 2;
        this.imageData.data[index] = r;
        this.imageData.data[index+1] = g;
        this.imageData.data[index+2] = b;
        this.imageData.data[index+3] = a;
    }
}