var order = prevOrder = 2;
var ngrams = {};
var button;

var goButton = document.getElementById("GO");

function markovIt() {
    order = parseInt(document.getElementById("order").value);
    txt = document.getElementById("inputText").value;
    generateNGrams(order);
    var startIndex = Math.max(0, Math.floor(Math.random() * (txt.length - order - 2)));
    var currentGram = txt.substring(startIndex, startIndex + order);
    var result = currentGram;

    for (var i = 0; i < 100; i++) {
        var possibilities = ngrams[currentGram];
        if (!possibilities) {
            break;
        }
        var next = possibilities[Math.floor(Math.random() * possibilities.length)];
        result += next;
        var len = result.length;
        currentGram = result.substring(len - order, len);
    }

    var outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "<h2>Output text</h2><textarea rows=\"20\" cols=\"60\" readonly=\"readonly\">" + result + "</textarea>";
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

goButton.addEventListener("click", markovIt);
