class Tunnel extends GameObject {
	lookUpTable: LookUpTable = null;
	elapsed: number = 0;
	imageData: ImageData = null;
	doDraw: boolean = false;
	texture: ImageData;

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
	}

	public draw(ctx: CanvasRenderingContext2D) { 
		if (!this.doDraw) {
			return;
		}

		if (!this.imageData) {
			this.imageData = ctx.getImageData(0, 0, this.gameManager.screen.width, this.gameManager.screen.height);
		}

		var lutAngle = this.lookUpTable.dataViewAngle;
		var lutDistance = this.lookUpTable.dataViewDistance;
		var lutDepth = this.lookUpTable.dataViewDepth;
		this.elapsed++;

		var width = this.gameManager.screen.width;
		for (var y = this.gameManager.screen.height - 1; y >= 0; y--) {
			var y_comp = y * width;
			for (var x = width - 1; x >= 0; x--) {
				var index = x + y_comp;

				var tx = (lutDistance.getUint8(index)) << 1;
				var ty = (lutAngle.getUint8(index)) << 1;
				tx = (tx  + this.elapsed) % this.texture.height;
				ty = (ty  + this.elapsed) % this.texture.width;

				var color = this.getColorAt(tx, ty);

				this.setPixel(x, y, color[0], color[1], color[2], lutDepth.getUint8(index));
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

	private getColorAt(x: number, y: number): any {
		var index = ((x + y * this.texture.width) << 2);
		return [
			this.texture.data[index],
			this.texture.data[index+1],
			this.texture.data[index+2]
		];
	}
}