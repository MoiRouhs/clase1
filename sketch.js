


let camara;
let vida;
let h;
let e;
let fallo;
function preload(){
  soundFormats('mp3', 'ogg');
  fallo = loadSound('media/fallo.mp3');
}
function setup(){
  lienzo = createCanvas(windowWidth, windowHeight);
  lienzo.parent('canvas');
  frameRate(90);
  camara = createCapture(VIDEO);
  camara.size(windowWidth, windowHeight);
  vida = new Vida(this); // create the object
  prepararDectector();
  
  h = new zonaDetector('uno',[199,190,101],200, 200, 100)
}
function draw(){
  //translate( - width / 2, - height / 2)
  iniciarDetector()
  h.activar()
  if(h.estaActivo()){
  } 
}
function mousePressed() {
  capturarColor([h]);
}
function keyPressed() {
  if (keyIsDown(32)) {
    capturarFondo();
  }
}

