class zonaDetector{
  constructor(nombre, color, x, y, a, v = vida){
    this.nombre = nombre ;
    this.backgroundCapturedFlag = false;
    this.color = color;
    this.limite = 35;
    this.index = 'nil'
    this.x = x;
    this.y = y;
    this.a = a;
    this.v = v
    this.teclas = {
      testmode:false,
      fondoestatico:false
    }

    this.v.addActiveZone(
      this.nombre,
      map(this.x, 0, width, 0.0, 1.0),
      map(this.y, 0, height, 0.0, 1.0),
      map(this.a, 0, width, 0.0, 1.0),
      map(this.a, 0, height, 0.0, 1.0)
    )
    this.v.activeZones.findIndex( i =>{ 
      if( i.id === this.nombre){
        this.index = vida.activeZones.indexOf(i);
      };
    });

  }
  activar(){
    this.avgX = 0;
    this.avgY = 0;
    let contador = 0;
    let bordeColor = [190,30,90]
    if(this.v.activeZones[this.index].isMovementDetectedFlag){
      bordeColor = [118,255,3]
      for (let y = this.y; y < this.y + this.a ; y++ ) {
        for (let x = this.x; x < this.x + this.a ; x++ ) {
          let loc = x + y * this.a;
          let r1 = camara.pixels[loc   ]; 
          let g1 = camara.pixels[loc + 1];
          let b1 = camara.pixels[loc + 2];

          let r2 = this.color[0];
          let g2 = this.color[1];
          let b2 = this.color[2];
          let d = dist(r1, g1, b1, r2, g2, b2);

          if (d < this.limite) {
            this.avgX += x;
            this.avgY += y;
            contador++;
          }
        }
      }
    }
      if(keyIsDown(77)){
        if(this.teclas['testmode'] === false){
          this.teclas['testmode'] = true ;
        }else if(this.teclas['testmode'] === true){
          this.teclas['testmode'] = false ;
        }
      }
      if(this.teclas['testmode'] == true){
        if (contador > 0) { 
          //console.log('ok cd')
          this.avgX = this.avgX / contador;
          this.avgY = this.avgY / contador;
          push()
            fill(this.color);
            strokeWeight(4.0);
            stroke(0);
            ellipse(this.avgX, this.avgY, 16, 16);
          pop()
        }
        push()
          noFill()
          strokeWeight(5)
          stroke(bordeColor)
          rect(this.x, this.y, this.a)
        pop()
      }

  }
  estaActivo(){
    return this.v.activeZones[this.index].isMovementDetectedFlag;
  }
  hayColor(){
    if (contador > 0) { 
      return true ;
    }else{
      return false ;
    }
  }
  estaTodo(){
    if(this.v.activeZones[this.index].isMovementDetectedFlag && this.worldRecord < 50){
      return true ;
    }else{
      return false ;
    }
  }
}

function prepararDectector(c = camara,v = vida){
  pixelDensity(1);
  c.hide();
  v.progressiveBackgroundFlag = false;
  v.imageFilterThreshold = 0.2;
  v.handleActiveZonesFlag = true;
  v.setActiveZonesNormFillThreshold(0.05);
}
function iniciarDetector(x = 0, y = 0, c = camara, v = vida){
  v.update(c);
  image(v.currentImage, x, y);
  c.loadPixels();
  if(keyIsDown(70)){
    image(v.backgroundImage, x, y);
  }
}
function capturarFondo(c = camara, v = vida){
  if(c !== null && c !== undefined) { // safety first
    v.setBackgroundImage(camara);
    backgroundCapturedFlag = true;
    console.log('Fondo estaico ok');
  }
}
function capturarColor(arrayObjetos, c = camara){
  if(c !== null && c !== undefined) { // safety first
    let trackColor = c.get(mouseX,mouseY);
    arrayObjetos.forEach(function (i){
      if(typeof i != 'undefined'){
        if(i instanceof zonaDetector ){
          let rango = i.a + 1;
          let rangoX = Array.from({length: rango}, (x, e) => e + i.x);
          let rangoY = Array.from({length: rango}, (x, e) => e + i.y);
          if(rangoX.includes(mouseX) && rangoY.includes(mouseY)){
            console.log('X:' + mouseX + ' Y:' + mouseY);
            console.log('zona: '+ i.nombre +' IX:' + i.x + ' FX:' + (i.x + i.a) + ' IY:' + i.y + ' FY:' + (i.y + i.a));
            i.color = trackColor ;
            console.log(i.color);
          }
        }else{
          console.log('NO es una instancia de zonaDetector');
        }
      }else{
        console.log('NO es un objeto');
      }
    })
  }
}
