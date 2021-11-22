let axiom = "FX";
let sentence = axiom;
let width = 512;
let height = 512;
let len;
let weight;
let angle;

let colors = [
  [160, 151, 209],
  [196, 177, 222],
  [247, 224, 160],
  [238, 155, 123],
  [209, 97, 128],
  [137, 76, 120],
]

let choices = [];

choices[0] = {
  a: "F",
  b: "FF-[-F+F-F]+F[+F-F-F]",
  angle: 23.5,
  n: 4,
  len: 40,
  weight: 2 
}

choices[1] = {
  a: "F",
  b: "F[+FF]F[F-F]F",
  angle: 25.7,
  n: 5,
  len: 40, 
  weight: 2
}

choices[2] = {
  a: "F",
  b: "F[+F]F[-F][F]",
  angle: 20,
  n: 5,
  len: 200, 
  weight: 2
}

choices[3] = {
  a: "F",
  b: "FF",
  c: "X",
  d: "F[-X]F[+X]F[-X]F[-F]F+X",
  angle: 22,
  n: 5,
  len: 80,
  weight: 4
}

choices[4] = {
  a: "F",
  b: "FF",
  c: "X",
  d: "FF-[[X]+X]+F[+FX]FF-X",
  angle: 25.5,
  n: 6,
  len: 80, 
  weight: 4
}

let rules = [];
rules[0] = choices[4];
len = rules[0].len;
weight = rules[0].weight;

function generate() {
  let nextSentence = "";
  len *= 0.5;
  weight *= 0.8;
  for (let i=0; i < sentence.length; i++){
    let current = sentence.charAt(i);
    let found = false;
    for (let j = 0; j < rules.length; j++){
      if(current == rules[j].a) {
          nextSentence += rules[j].b; 
          found = true;
          break;   
      } else if (current == rules[j].c) {
        nextSentence += rules[j].d;
        found = true;
        break;
      }
      if (!found){
        nextSentence += current;
      }
    }
  }
  sentence = nextSentence;
  turtle();
}

function turtle() {
  let f = round(random(0, 5));
  background(colors[f][0], colors[f][1], colors[f][2]);
  let c = random(0, 1);
  stroke(51);
  resetMatrix();
  translate(width/2, height);
  for (let i=0; i < sentence.length; i++){
    let current = sentence.charAt(i);
    if (current == "F") {
      strokeWeight(weight);
      let g = round(random(0, 5));
      let a = random(0, 2);
      stroke(colors[g][0], colors[g][1], colors[g][2]);
      //fill(colors[g][0], colors[g][1], colors[g][2]);
      // stroke(51);
      line(0, 0, 0, -len)
      //ellipse(0 + a, -len*a, 1, 2);
      translate(0, -len);
    }
    else if (current == "X"){
      translate(0, -len);
    }
    else if (current == "+"){
      let c = random(0, 2);
      rotate(angle*c);
    }
    else if (current == "-") {
      let d = random(0, 3);
      rotate(-angle);
    }
    else if (current == "[") {
      push();
    }
    else if (current == "]") {
      let h = round(random(0, 5));
      stroke(colors[h][0], colors[h][1], colors[h][2]);
      fill(colors[h][0], colors[h][1], colors[h][2])
      let r = round(random(0, 3));
      let b = random(0, 1/2);
      ellipse(0, -len, b, b);
      pop();
    }
  }
}

  
function setup() {
  cnv = createCanvas(width, height);
  turtle();
  angle = radians(rules[0].angle);
  for (var i = 0; i < rules[0].n; i++) {
    generate();
  }
  noLoop();
  // save(cnv, 'lsystem_colored.jpg');
  // var button = createButton("save this");
  // button.mousePressed(save_this);
}

function draw() {
  turtle();
}
