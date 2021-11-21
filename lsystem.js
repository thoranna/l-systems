let axiom = "FX";
let sentence = axiom;
let width = 512;
let height = 512;
let len;
let weight;
let angle;

let choices = [];

choices[0] = {
  a: "F",
  b: "FF-[-F+F+F]+[+F-F-F]",
  angle: 22.5,
  n: 4,
  len: 105,
  weight: 2 
}
choices[1] = {
  a: "F",
  b: "F[+F]F[-F]F",
  angle: 25.7,
  n: 5,
  len: 60, 
  weight: 5
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
  d: "F[+X]F[-X]+X",
  angle: 20,
  n: 7,
  len: 130,
  weight: 4
}
choices[4] = {
  a: "F",
  b: "FF",
  c: "X",
  d: "F[+X]F[-X]FX",
  angle: 25.7,
  n: 7, 
  len: 110, 
  weight: 4
}

choices[5] = {
  a: "F",
  b: "FF",
  c: "X",
  d: "F-[[X]+X]+F[+FX]-X",
  angle: 22.5,
  n: 6,
  len: 120, 
  weight: 3
}

let rules = [];
rules[0] = choices[1];
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
  background(70, 120, 150);
  stroke(255,100);
  resetMatrix();
  translate(width/2, height);
  for (let i=0; i < sentence.length; i++){
    let current = sentence.charAt(i);
    if (current == "F") {
      strokeWeight(weight);
      line(0,0,0, -len);
      translate(0, -len);
    }
    else if (current == "X"){
      translate(0, -len);
    }
    else if (current == "+"){
      rotate(angle);
    }
    else if (current == "-") {
      rotate(-angle);
    }
    else if (current == "[") {
      push();
    }
    else if (current == "]") {
      pop();
    }
  }
}
  
function setup() {
  cnv = createCanvas(width, height);
  background(51);
  turtle();
  angle = radians(rules[0].angle);
  for (var i = 0; i < rules[0].n; i++) {
    generate();
  }
  save(cnv, 'lsystem_colored.jpg');
  // var button = createButton("generate");
  // button.mousePressed(generate);
}

function draw() {
  turtle();
}
