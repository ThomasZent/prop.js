namespace $P {
    export class Prop extends Base { //Prop class to create, manage, and display 'objects' in the application.
        static toDegrees(radians: number): number { //Static method to convert radians to degrees.
            return (radians / Math.PI) * 180;
        }

        static toRadians(degrees: number): number { //Static method to convert degrees to radians.
            return (degrees / 180) * Math.PI;
        }

        static perSecond(val: number): number { //Static method to convert a value into a 'per-millisecond' version, for use with update() and dt.
            return val / 1000;
        }

        
        public stage: Stage; //Declare the stage property.
        public triangles: Float32Array; //The triangles that make up this Prop's shape.
        public texTriangles: Float32Array; //The triangles that make up this Prop's texture coordinates.
        public texID: number; //Declare the texture for this Prop.


        constructor(public pos: Coord = new Coord(0, 0), public radians: number = 0, public bounds: Coord[] = [new Coord(-10, -10), new Coord(10, -10), new Coord(10, 10), new Coord(-10, 10)]) {
            super();

            this.texID = 0;
        }
        

        set x(x: number) { //Set x coord
            this.pos.x = x;
        }
        
        set y(y: number) { //Set y coord
            this.pos.y = y;
        }
        
        set degrees(degrees: number) { //Convert & set radians
            this.radians = Prop.toRadians(degrees);
        }


        get x(): number { //Get x coord
            return this.pos.x;
        }
        
        get y(): number { //Get y coord
            return this.pos.y;
        }
        
        get degrees(): number { //Convert & get degrees
            return $P.Prop.toDegrees(this.radians);
        }
        
        get index() { //Get index of this prop in the parent stage's props array.
            if (this.stage) {
                return this.stage.props.indexOf(this);
            } else {
                return -1;
            }
        }


        setPos(x: number, y: number) { //Set position of this prop using separate x and y coordinate arguments.
            this.pos[0] = x;
            this.pos[1] = y;
        }

        move(vect: Coord): Coord { //Move this prop by coordinates specified in provided Coord.
            return this.pos = Coord.addCoords(this.pos, vect);
        }

        moveEx(x: number, y: number): Coord { //Move this prop by coordinates specified by specific x and y coordinate arguments.
            return this.pos = Coord.addCoords(this.pos, new Coord(x, y));
        }

        rotate(radians: number): number { //Rotate this prop by provided radians amount.
            this.radians += radians % 2 * Math.PI; //Rotate the prop by the amount, modulo operator to wrap around after 2PI radians.

            if (this.radians <= 0) { //If resultant radians is less than zero
                this.radians = 2 * Math.PI + this.radians; //Loop back to 2PI
            } else if (this.radians >= Math.PI) { //Otherwise, if resultant radians is more than 2PI
                this.radians -= 2 * Math.PI; //Loop back to 0.
            }

            return this.radians; //Return the new radians value.
        }

        rotateDegrees(degrees: number) { //Rotate this prop by provided degrees amount.
            return Prop.toDegrees(this.rotate(Prop.toRadians(degrees)));
        }

        remove(quiet: boolean) {} //Empty remove method to be redefined by derivative objects and classes.

        init(quiet: boolean) {} //Empty init method to be redefined by derivative objects and classes.

        
        beforeUpdate(dt: number) {} //Empty beforeUpdate method to be redefined by derivative objects and classes.

        update(dt: number) { //Default update method to be redefined by derivative objects and classes.
            this.rotateDegrees(0.18 * dt);
        }

        afterUpdate(dt: number) {} //Empty afterUpdate method to be redefined by derivative objects and classes.

        draw(gl: WebGL2RenderingContext, rel: Coord, scale: Coord) { //Default draw method to be redefined by derivative objects and classes.

        }
    }
}