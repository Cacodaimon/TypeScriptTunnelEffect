class Tunnel extends GameObject {
    private lookUpTable: LookUpTable = null;
    private elapsed: number = 0;
    private imageData: ImageData = null;
    private doDraw: boolean = false;
    private texture: ImageData;
    private delta: number;

    public setTexture(texture: ImageData) {
        this.texture = texture;
    }

    public init(gameManager: GameManager) {
        super.init(gameManager);
        this.lookUpTable = new LookUpTable();
        this.lookUpTable.init(gameManager);
    }

    public update(delta: number) { 
        this.doDraw = delta != 0;
        this.elapsed += delta * 10;
    }

    public draw(ctx: CanvasRenderingContext2D) { 
        if (!this.doDraw) {
            return;
        }

        if (!this.imageData) {
            this.imageData = ctx.getImageData(0, 0, this.gameManager.screen.width, this.gameManager.screen.height);
        }

        var lutAngle: DataView = this.lookUpTable.dataViewAngle;
        var lutDistance: DataView = this.lookUpTable.dataViewDistance;
        var lutDepth: DataView = this.lookUpTable.dataViewDepth;
        var elapsed: number = Math.ceil(this.elapsed);

        var width: number = this.gameManager.screen.width;
        for (var y: number = this.gameManager.screen.height - 1; y >= 0; y--) {
            var yIndex: number = y * width;
            for (var x: number = width - 1; x >= 0; x--) {
                var index: number = x + yIndex;

                var tx: number = (lutDistance.getUint8(index)) << 1;
                var ty: number = (lutAngle.getUint8(index)) << 1;
                tx = (tx  + elapsed) % this.texture.height;
                ty = (ty  + elapsed) % this.texture.width;

                var color: number[] = this.getColorAt(tx, ty);

                this.setPixel(x, y, color[0], color[1], color[2], lutDepth.getUint8(index));
            }
        }

        ctx.putImageData(this.imageData, 0, 0);
    }

    private setPixel(x: number, y: number, r: number, g: number, b: number, a: number) {
        var index: number = (x + y * this.imageData.width) << 2;
        this.imageData.data[index] = r;
        this.imageData.data[index+1] = g;
        this.imageData.data[index+2] = b;
        this.imageData.data[index+3] = a;
    }

    private getColorAt(x: number, y: number): number[] {
        var index: number = ((x + y * this.texture.width) << 2);
        return [
            this.texture.data[index],
            this.texture.data[index+1],
            this.texture.data[index+2]
        ];
    }
}