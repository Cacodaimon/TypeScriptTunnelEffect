class ImageDataLoader {
    private image: any; 
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private imageData: ImageData;

    constructor() { 
        this.image = new Image();
        this.canvas = (HTMLCanvasElement)document.createElement('canvas');
    }

    public load(name: string, callBack: (imageData: ImageData) => void) : void {
        this.image.src = name;

        var thath: ImageDataLoader = this; 
        this.image.onload = function() {
            thath.canvas.width = thath.image.width;
            thath.canvas.height = thath.image.height;
            thath.ctx = thath.canvas.getContext('2d');
            thath.ctx.drawImage(thath.image, 0, 0, thath.image.width, thath.image.height);
            thath.imageData = thath.ctx.getImageData(0, 0, thath.image.width, thath.image.height);
            callBack && callBack(thath.imageData);
        };
    }
}