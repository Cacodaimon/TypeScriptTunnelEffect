class Vector2 {
	constructor(public x: number, public y: number) { }

    public add(other: Vector2) : Vector2 {
		return new Vector2(this.x + other.x, this.y + other.y);
    }

	public sub(other: Vector2) : Vector2 {
		return new Vector2(this.x - other.x, this.y - other.y);
    }

    public magnitude() : number {
		return Math.sqrt(this.x * this.x + this.y * this.y);
    }

	public angle() : number {
		return Math.atan2(this.x, this.y); 
	}
}