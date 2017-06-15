var order = prevOrder = 2;
var ngrams = {};
var button;


function setup() {
  noCanvas();

  inputText = createElement('label', 'Order: ');
  orderInp = createInput();

  generateButton = createButton("generate");
  generateButton.mousePressed(markovIt);
  deleteButton = createButton("delete all");
  deleteButton.mousePressed(deleteAll);
  textDiv = createElement('div');
  inputText1 = createElement('label', 'Text: ');
  textInp = createInput();
  textDiv.child(inputText1);
  textDiv.child(textInp);
}

function markovIt() {
  order = parseInt(orderInp.value());
  txt = textInp.value();
  generateNGrams(order);
  var currentGram = txt.substring(0, order);
  var result = currentGram;

  for (var i = 0; i < 100; i++) {
    var possibilities = ngrams[currentGram];
    if (!possibilities) {
      break;
    }
    var next = random(possibilities);
    result += next;
    var len = result.length;
    currentGram = result.substring(len - order, len);
  }

  createP(result).addClass("result");
}

function generateNGrams(o) {
    if (o == prevOrder) {
        return;
    }
    for (var i = 0; i <= txt.length - order; i++) {
        var gram = txt.substring(i, i + order);

        if (!ngrams[gram]) {
          ngrams[gram] = [];
        }
        ngrams[gram].push(txt.charAt(i + order));
    }
    prevOrder = o;
}

// ### Function that Deletes all the elements in a certain class ###
function deleteAll() {
    var parags = document.getElementsByClassName("result");
    var len = parags.length;
    var i = 0;
    for (len; len > 0; len--) {
        console.log("i: " + i);
        console.log("P: " + parags[i]);
        parags[i].remove();
    }
}