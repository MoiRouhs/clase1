function circulosReactivos(argNoise1=0,argNoise2=255,c=camara){
  for (let cy = 0; cy < c.height; cy += 20) {
    for (let cx = 0; cx < c.width; cx += 20) {
      let offset = ((cy*c.width)+cx)*4;
      let xpos = (cx / c.width) * width;
      let ypos = (cy / c.height) * height;
      pop()
        let n = noise(random(argNoise1,argNoise2))
        let n1 = noise(n)
        let n2 = noise(n1)
        fill(n*255,n1*255,n2*255,150)
        //fill(random(0,255),random(0,255),random(0,255),150)
        noStroke()
        ellipse(xpos, ypos, 60 * (c.pixels[offset+1]/255), 60 * (c.pixels[offset+1]/255));
      push()
    }
  } 
}
function pixelar(arg=25, c=camara){
  for (let y = 0; y < height; y += arg) {
    for (let x = 0; x < width; x += arg) {
      let offset = ((y*width)+x)*4;
      pop()
      fill(c.pixels[offset], c.pixels[offset+1], c.pixels[offset+2]);
      noStroke()
      rect(x, y, arg, arg);
      push()
    }
  }
}
class Loza{
  constructor(rotacion = 0, circulo = 180, frecuencia = 7e-6){
    this.rotacion = rotacion
    this.circulo = circulo
    this.frecuencia = frecuencia
    this.color
    this.tamaño
  }
  activar(){
    translate(width/2, height/2);
    rotate(radians(this.rotacion));
    ellipseMode(RADIUS);
    for(let a=0;a <=2000;a++){
      this.circulo= 130 + (height/3)*sin(frameCount*this.frecuencia*a);
      this.color=map(this.circulo,255,0,255,70);
      this.tamaño=map(this.circulo,150,100,4.5,3.5);
      noStroke()
      fill(this.color,abs(sin(millis()*1e-4)*255),abs(cos(frameCount*0.01)*255))
      ellipse(this.circulo*sin(a),this.circulo*cos(a),this.tamaño)
      this.rotacion += 1e-9
    }
  }
}
class espiralDeTriangulos {
  constructor(){
    this.d = 0;
  }
  activar(x = width/2, y = height/2){
    translate(x, y)
    rotate( radians(frameCount*0.2))
    for(let i = 1;i<=800;i++){
      push()
      rotate(radians(i*15))
      noFill()
      stroke(abs(sin(i*1e-1)*255),abs(cos(millis()*(4e-4))*255),(i*9)-abs(sin(frameCount*(3e-4))*220))
      triangle(this.d*i,this.d*i,-50+this.d*i,100+this.d*i,50+this.d*i,100+this.d*i)
      pop()
      this.d = abs(cos(frameCount*(3e-3))*2)+ abs(cos(frameCount*0.02)*2)
    }
  }
}
class opArt{
  constructor(long = 600,spc = 15){
    this.long = long
    this.spc = 15
  }
  activar(x = width/2, y = height/2){
    translate(x,y);
    noStroke();
    for(let i=0;i <= this.long/this.spc;i++){

      if(i%2 == 0){
        fill(240,30,90,25);
      }else{
        fill(0,0,0,25);
      }

      rotate(radians(sin(frameCount*1e-3)*89));
      rect(-this.long/2+(this.spc/2)*i,-this.long/2+(this.spc/2)*i,this.long-this.spc*i,this.long-this.spc*i);
    }
  }
}
