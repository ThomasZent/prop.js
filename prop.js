$P={Base:class{static uuidGen(b){return b?(b^16*Math.random()>>b/4).toString(16):"10000000-1000-4000-8000-100000000000".replace(/[018]/g,$P.Base.uuidGen)}constructor(){this._uuid=$P.Base.uuidGen()}get uuid(){return this._uuid}},Coord:class{static addCoords(a,b){return new $P.Coord(a.x+b.x,a.y+b.y)}static multCoord(a,b){return new $P.Coord(a.x*b,a.y*b)}constructor(a,b){this._x=a,this._y=b}set x(a){this._x=a}set y(a){this._y=a}get x(){return this._x}get y(){return this._y}toArr(){return[this._x,this._y]}},Canvas:class{constructor(a,b=200,c=100){this._id=a,this._el=document.getElementById(a),this._width=b,this._height=c,this._el.width=b,this._el.height=c}set width(a){this._width=a,this._el.width=a}set height(a){this._height=a,this._el.height=a}get width(){return this._width}get height(){return this._height}get el(){return this._el}},updateLoop:function(a,b=8){var c=Date.now();window.setInterval(function(){let b=Date.now(),d=b-c;c=b,a.update(d)},b)}},$P.Stage=class extends $P.Base{constructor(){super(),this._props=[]}get props(){return this._props}addProp(a,b=-1,c=!1){let d;return 0<=b?(this._props.splice(b,0,a),d=this._props.length):d=this._props.push(a),a.stage=this,a.init(c),d}addProps(a,b=-1,c=!1){if(0<=b)for(var d in a)this._props.splice(b,0,a[d]),a[d].stage=this,a[d].init(c);else for(var d in a)this._props.push(a[d]),a[d].stage=this,a[d].init(c);return this._props.length}removeProp(a,b=!1){let c=a.index;return-1!==c&&(this._props[c].destroy(b),this._props[c].stage=null,this._props.splice(c,1),c)}removePropByID(a,b=!1){for(var c in this._props)if(this._props[c].uuid===a){this._props[c].destroy(b),this._props[c].stage=null;let a=this._props.splice(c,1)[0];return{prop:a,index:c}}return!1}removePropByIndex(a,b=!1){if(this._props[a]){this._props[a].destroy(b),this._props[a].stage=null;let c=this._props.splice(a,1)[0];return c}return!1}moveProp(a,b){let c,d=this._props.splice(a,1)[0];return 0>b||b>=this._props.length?(c=this._props.push(d)-1,c):(this._props.splice(b,0,d),b)}update(a){for(var b in this._props)this._props[b].beforeUpdate(a);for(b in this._props)this._props[b].update(a);for(b in this._props)this._props[b].afterUpdate(a);return!0}},$P.Prop=class extends $P.Base{static toDegrees(a){return 180*(a/Math.PI)}static toRadians(a){return a/180*Math.PI}static perSecond(a){return a/1e3}constructor(a=new $P.Coord(0,0),b=0,c=[new $P.Coord(-10,-10),new $P.Coord(10,-10),new $P.Coord(10,10),new $P.Coord(-10,10)]){super(),this._pos=a,this._radians=b,this._bounds=c,this._stage}set _x(a){this._pos.x=a}set _y(a){this._pos.y=a}set x(a){this._pos.x=a}set y(a){this._pos.y=a}set radians(a){this._radians=a}set degrees(a){this._radians=$P.Prop.toRadians(a)}set _degrees(a){this._radians=$P.Prop.toRadians(a)}set bounds(a){this._bounds=a}set stage(a){this._stage=a}get _x(){return this._pos.x}get _y(){return this._pos.y}get x(){return this._pos.x}get y(){return this._pos.y}get radians(){return this._radians}get degrees(){return $P.Prop.toDegrees(this._radians)}get _degrees(){return $P.Prop.toDegrees(this._radians)}get bounds(){return this._bounds}get stage(){return this._stage}get index(){return this.stage?this.stage.props.indexOf(this):-1}move(a){this._x+=a.x,this._y+=a.y}rotate(a){return this._radians+=a,this._radians>=2*Math.PI?void(this._radians-=2*Math.PI):0>this._radians?void(this._radians+=2*Math.PI):void 0}rotateDegrees(a){return this._degrees+=a,this._radians>=2*Math.PI?void(this._radians-=2*Math.PI):0>this._radians?void(this._radians+=2*Math.PI):void 0}beforeUpdate(){}update(a){this.rotateDegrees($P.Prop.perSecond(180)*a)}afterUpdate(){}draw(a,b){a.strokeStyle="black",a.fillStyle="green",a.save(),a.translate(b.x,b.y),a.rotate(this._radians),a.beginPath(),a.moveTo(this._bounds[0].x,this._bounds[0].y);for(var c=1;c<this._bounds.length;c++)a.lineTo(this._bounds[c].x,this._bounds[c].y);a.lineTo(this._bounds[0].x,this._bounds[0].y),a.closePath(),a.stroke(),a.fill(),a.restore()}init(){}destroy(){}},$P.Camera=class extends $P.Base{constructor(a,b,c=new $P.Coord(-100,-50),d=new $P.Coord(0,0),e=new $P.Coord(200,100),f=new $P.Coord(1,1),g=!0){super(),this._canvas=b,this._ctx=this._canvas.el.getContext("2d"),this._stage=a,this._stagePos=c,this._canvasPos=d,this._dimensions=e,this._scale=f,this._clip=g,this._back="black",this._stroke="",this._lineWidth=1}set canvas(a){this._canvas=a,this._ctx=this._canvas.el.getContext("2d")}set stage(a){this._stage=a}set stagePos(a){this._stagePos=a}set canvasPos(a){this.canvasPos=a}set width(a){this._dimensions.x=a}set height(a){this._dimensions.y=a}set dimensions(a){this._dimensions=a}set scale(a){this._scale=a}set clip(a){this._clip=a}set back(a){this._back=a}set stroke(a){this._stroke=a}set lineWidth(a){this._lineWidth=a}get canvas(){return this._canvas}get stage(){return this._stage}get stagePos(){return this._stagePos}get canvasPos(){return this._canvasPos}get width(){return this._dimensions.x}get height(){return this._dimensions.y}get dimensions(){return this._dimensions}get scale(){return this._scale}get clip(){return this._clip}get back(){return this._back}get stroke(){return this._stroke}get lineWidth(){return this._lineWidth}draw(){for(var a in this._ctx.save(),this._ctx.beginPath(),this._back&&(this._ctx.fillStyle=this._back,this._ctx.fillRect(this._canvasPos.x,this._canvasPos.y,this._dimensions.x,this._dimensions.y)),this._stroke&&(this._ctx.strokeStyle=this._back,this._ctx.lineWidth=this._lineWidth,this._ctx.strokeRect(this._canvasPos.x,this._canvasPos.y,this._dimensions.x,this._dimensions.y)),this._clip&&(this._ctx.rect(this._canvasPos.x,this._canvasPos.y,this._dimensions.x,this._dimensions.y),this._ctx.clip()),this._ctx.scale(this._scale.x,this._scale.y),this._stage.props){let b=this._stage.props[a],c=new $P.Coord(b.x-this._stagePos.x,b.y-this._stagePos.y);c.x+=this._canvasPos.x/this._scale.x,c.y+=this._canvasPos.y/this._scale.y,b.draw(this._ctx,c)}this._ctx.closePath(),this._ctx.restore()}};
