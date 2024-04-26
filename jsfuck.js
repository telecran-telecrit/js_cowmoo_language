/*! JSFuck 0.5.2 - http://jsfuck.com */

var window = window || global || {};
var global = global || window;

(function(self){
  const MIN = 32, MAX = 126;

  function getCurrentScript () {
      try {
        var src = undefined;
        var script = undefined;
        try {
          src = document.currentScript.src;
          script = document.currentScript;
        } catch (e0) {
          var scripts = document.getElementsByTagName('script');
          script = scripts[scripts.length - 1];
          src = script.src;
        }
        return (!!src) ? script : undefined;
      } catch (e006) {
      } finally {
        if (!src) {
          process.argv.shift();
          process.argv.shift();
          return {
            'src': global.__filename || __filename + '?' + process.argv.join('&'),
          }
        }
      }
  }

  //console.log('getCurrentScript: ', getCurrentScript().src);

  function getParams () {
      try {
          var urlParams = {};
          var search = getCurrentScript().src.split('?')[1] || ''; // window.location.href.split('?')[1] || '';
          var query = search.split('#')[0],
              match,
              pl = /\+/g,  // Regex for replacing addition symbol with a space
              search = /([^&=]+)=?([^&]*)/g,
              decode = function (s) {
                  return decodeURIComponent(s.replace(pl, " "));
              };

          while (match = search.exec(query)) {
              var key = decode(match[1]);
              var value = decode(match[2]);
              if (key in urlParams) {
                  if (!Array.isArray(urlParams[key])) {
                      urlParams[key] = [urlParams[key]];
                  }
                  urlParams[key].push(value);
              } else {
                  urlParams[key] = value;
              }
          }
          return urlParams;
      } catch (e1) {
          return null;
      }
  }

  //console.log(getParams());
  
  let usedKeys = getParams()['usedkeys'];
  if (!usedKeys || !usedKeys.length) {
    throw Error('usedkeys string parameter is required!');
  }
  if (usedKeys.indexOf(' ') >= 0) {
    usedKeys = usedKeys.split('');
    usedKeys[usedKeys.indexOf(' ')] = '+';
    usedKeys.join('');
  }
  if (usedKeys.length < 6 || usedKeys.indexOf('[') < 0 || usedKeys.indexOf(']') < 0 || usedKeys.indexOf('(') < 0 || usedKeys.indexOf(')') < 0 || usedKeys.indexOf('!') < 0 || usedKeys.indexOf('+') < 0) {
    throw Error('usedkeys 6 characters minimum is: []()!+');
  }

  const SIMPLE = {
    'false':      '![]',
    'true':       '!![]',
    'undefined':  '[][[]]',
    'NaN':        '+[![]]',
    'Infinity':   '+(+!+[]+(!+[]+[])[!+[]+!+[]+!+[]]+[+!+[]]+[+[]]+[+[]]+[+[]])' // +"1e1000"
  };

  const CONSTRUCTORS = {
    'Array':    '[]',
    'Number':   '(+[])',
    'String':   '([]+[])',
    'Boolean':  '(![])',
    'Function': '[]["flat"]',
    'RegExp':   'Function("return/"+false+"/")()',
    'Object':	'[]["entries"]()'
  };

  const MAPPING = {
    'a':   '(false+"")[1]',
    'b':   '([]["entries"]()+"")[2]',
    'c':   '([]["flat"]+"")[3]',
    'd':   '(undefined+"")[2]',
    'e':   '(true+"")[3]',
    'f':   '(false+"")[0]',
    'g':   '(false+[0]+String)[20]',
    'h':   '(+(101))["to"+String["name"]](21)[1]',
    'i':   '([false]+undefined)[10]',
    'j':   '([]["entries"]()+"")[3]',
    'k':   '(+(20))["to"+String["name"]](21)',
    'l':   '(false+"")[2]',
    'm':   '(Number+"")[11]',
    'n':   '(undefined+"")[1]',
    'o':   '(true+[]["flat"])[10]',
    'p':   '(+(211))["to"+String["name"]](31)[1]',
    'q':   '("")["fontcolor"]([0]+false+")[20]',
    'r':   '(true+"")[1]',
    's':   '(false+"")[3]',
    't':   '(true+"")[0]',
    'u':   '(undefined+"")[0]',
    'v':   '(+(31))["to"+String["name"]](32)',
    'w':   '(+(32))["to"+String["name"]](33)',
    'x':   '(+(101))["to"+String["name"]](34)[1]',
    'y':   '(NaN+[Infinity])[10]',
    'z':   '(+(35))["to"+String["name"]](36)',

    'A':   '(NaN+[]["entries"]())[11]',
    'B':   '(+[]+Boolean)[10]',
    'C':   'Function("return escape")()(("")["italics"]())[2]',
    'D':   'Function("return escape")()([]["flat"])["slice"]("-1")',
    'E':   '(RegExp+"")[12]',
    'F':   '(+[]+Function)[10]',
    'G':   '(false+Function("return Date")()())[30]',
    'H':   null,
    'I':   '(Infinity+"")[0]',
    'J':   null,
    'K':   null,
    'L':   null,
    'M':   '(true+Function("return Date")()())[30]',
    'N':   '(NaN+"")[0]',
    'O':   '(+[]+Object)[10]',
    'P':   null,
    'Q':   null,
    'R':   '(+[]+RegExp)[10]',
    'S':   '(+[]+String)[10]',
    'T':   '(NaN+Function("return Date")()())[30]',
    'U':   '(NaN+Object()["to"+String["name"]]["call"]())[11]',
    'V':   null,
    'W':   null,
    'X':   null,
    'Y':   null,
    'Z':   null,

    ' ':   '(NaN+[]["flat"])[11]',
    '!':   null,
    '"':   '("")["fontcolor"]()[12]',
    '#':   null,
    '$':   null,
    '%':   'Function("return escape")()([]["flat"])[21]',
    '&':   '("")["fontcolor"](")[13]',
    '\'':  null,
    '(':   '([]["flat"]+"")[13]',
    ')':   '([0]+false+[]["flat"])[20]',
    '*':   null,
    '+':   '(+(+!+[]+(!+[]+[])[!+[]+!+[]+!+[]]+[+!+[]]+[+[]]+[+[]])+[])[2]',
    ',':   '[[]]["concat"]([[]])+""',
    '-':   '(+(.+[0000001])+"")[2]',
    '.':   '(+(+!+[]+[+!+[]]+(!![]+[])[!+[]+!+[]+!+[]]+[!+[]+!+[]]+[+[]])+[])[+!+[]]',
    '/':   '(false+[0])["italics"]()[10]',
    ':':   '(RegExp()+"")[3]',
    ';':   '("")["fontcolor"](NaN+")[21]',
    '<':   '("")["italics"]()[0]',
    '=':   '("")["fontcolor"]()[11]',
    '>':   '("")["italics"]()[2]',
    '?':   '(RegExp()+"")[2]',
    '@':   null,
    '[':   '([]["entries"]()+"")[0]',
    '\\':  '(RegExp("/")+"")[1]',
    ']':   '([]["entries"]()+"")[22]',
    '^':   null,
    '_':   null,
    '`':   null,
    '{':   '(true+[]["flat"])[20]',
    '|':   null,
    '}':   '([]["flat"]+"")["slice"]("-1")',
    '~':   null
  };
  
  for (let key in MAPPING) {
    if (usedKeys.indexOf(key) >= 0 && (!MAPPING[key] || '[]()!+'.indexOf(key) < 0)) {
      MAPPING[key] = key;
    }
  }

  const GLOBAL = 'Function("return this")()';

  function fillMissingDigits(){
    var output, number, i;

    for (number = 0; number < 10; number++){

      output = "+[]";

      if (number > 0){ output = "+!" + output; }
      for (i = 1; i < number; i++){ output = "+!+[]" + output; }
      if (number > 1){ output = output.substr(1); }

      MAPPING[number] = "[" + output + "]";
    }
  }

  function replaceMap(){
    var character = "", value, i, key;

    function replace(pattern, replacement){
      value = value.replace(
        new RegExp(pattern, "gi"),
        replacement
      );
    }

    function digitReplacer(_,x) { return MAPPING[x]; }

    function numberReplacer(_,y) {
      var values = y.split("");
      var head = +(values.shift());
      var output = "+[]";

      if (head > 0){ output = "+!" + output; }
      for (i = 1; i < head; i++){ output = "+!+[]" + output; }
      if (head > 1){ output = output.substr(1); }

      return [output].concat(values).join("+").replace(/(\d)/g, digitReplacer);
    }

    for (i = MIN; i <= MAX; i++){
      character = String.fromCharCode(i);
      value = MAPPING[character];
      if(!value) {continue;}

      for (key in CONSTRUCTORS){
        replace("\\b" + key, CONSTRUCTORS[key] + '["constructor"]');
      }

      for (key in SIMPLE){
        replace(key, SIMPLE[key]);
      }

      replace('(\\d\\d+)', numberReplacer);
      replace('\\((\\d)\\)', digitReplacer);
      replace('\\[(\\d)\\]', digitReplacer);

      replace("GLOBAL", GLOBAL);
      replace('\\+""', "+[]");
      replace('""', "[]+[]");

      MAPPING[character] = value;
    }
  }

  function replaceStrings(){
    var regEx;
    console.log('usedKeys', usedKeys);
    if (!!usedKeys && usedKeys.length > 0) {
      regEx = RegExp( '[^' + (usedKeys.map(h => ((h >= 'a' && h <= 'z') || (h >= 'A' && h <= 'Z') || (h >= '0' && h <= '9')) ? h : '\\' + h).join('')) + ']{1}', 'g');
    } else {
      regEx = /[^\[\]\(\)\!\+]{1}/g;
    }
    /*console.log('regEx', regEx);*/
    var all, value, missing, 
      count = MAX - MIN;

    function findMissing(){
      var all, value, done = false;

      missing = {};

      for (all in MAPPING){

        value = MAPPING[all];

        if (value && value.match(regEx)){
          missing[all] = value;
          done = true;
        }
      }

      return done;
    }

    function mappingReplacer(a, b) {
      return b.split("").join("+");
    }

    function valueReplacer(c) {
      return missing[c] ? c : MAPPING[c];
    }

    for (all in MAPPING){
      if (MAPPING[all]){
        MAPPING[all] = MAPPING[all].replace(/\"([^\"]+)\"/gi, mappingReplacer);
      }
    }

    while (findMissing()){
      //console.log('mmm');
      for (all in missing){
        value = MAPPING[all];
        value = value.replace(regEx, valueReplacer);

        MAPPING[all] = value;
        missing[all] = value;
      }

      if (count-- === 0){
        console.error("Could not compile the following chars:", missing);
      }
    }
  }

  function escapeSequence(c) {
    var cc = c.charCodeAt(0);
    if (cc < 256) {
      return '\\' + cc.toString(8);
    } else {
      var cc16 = cc.toString(16);
      return '\\u' + ('0000' + cc16).substring(cc16.length);  
    }
  }

  function escapeSequenceForReplace(c) {
    return escapeSequence(c).replace('\\', 't');
  }

  function encode(input, wrapWithEval, runInParentScope){
    var output = [];

    if (!input){
      return "";
    }

    var unmappped = ''
    for(var k in MAPPING) {
      if (MAPPING[k]){
        unmappped += k;
      }
    }
    unmappped = unmappped.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    unmappped = new RegExp('[^' + unmappped + ']','g');
    var unmappedCharactersCount = (input.match(unmappped) || []).length;
    if (unmappedCharactersCount > 1) {
      // Without this optimization one unmapped character has encoded length
      // of about 3600 characters. Every additional unmapped character adds 
      // 2000 to the total length. For example, the length of `~` is 3605,
      // `~~` is 5600, and `~~~` is 7595.
      // 
      // The loader with replace has encoded length of about 5300 characters
      // and every additional character adds 100 to the total length. 
      // In the same example the length of `~~` becomes 5371 and `~~~` -- 5463.
      // 
      // So, when we have more than one unmapped character we want to encode whole input
      // except select characters (that have encoded length less than about 70)
      // into an escape sequence.
      //
      // NOTE: `t` should be escaped!
      input = input.replace(/[^0123456789.adefilnrsuN]/g, escapeSequenceForReplace);
    } else if (unmappedCharactersCount > 0) {
      //Because we will wrap the input into a string we need to escape Backslash 
      // and Double quote characters (we do not need to worry about other characters 
      // because they are not mapped explicitly).
      // The JSFuck-encoded representation of `\` is 2121 symbols,
      // so escaped `\` is 4243 symbols and escaped `"` is 2261 symbols
      // however the escape sequence of that characters are 
      // 2168 and 2155 symbols respectively, so it's more practical to 
      // rewrite them as escape sequences.
      input = input.replace(/["\\]/g, escapeSequence);
      //Convert all unmapped characters to escape sequence
      input = input.replace(unmappped, escapeSequence);
    }

    var r = "";
    for (var i in SIMPLE) {
      r += i + "|";
    }
    r+= ".";

    input.replace(new RegExp(r, 'g'), function(c) {
      var replacement = SIMPLE[c];
      if (replacement) {
        output.push("(" + replacement + "+[])");
      } else {
        replacement = MAPPING[c];
        if (replacement){
          output.push(replacement);
        } else {
          throw new Error('Found unmapped character: ' + c);
        }
      }
    });

    output = output.join("+");

    if (/^\d$/.test(input)){
      output += "+[]";
    }

    if (unmappedCharactersCount > 1) {
      // replace `t` with `\\`
      output = "(" + output + ")[" + encode("split") + "](" + encode ("t") + ")[" + encode("join") +"](" + encode("\\") + ")";
    }

    if (unmappedCharactersCount > 0) {
      output = "[][" + encode("flat") + "]"+
      "[" + encode("constructor") + "]" +
      "(" + encode("return\"") + "+" + output + "+" + encode("\"") + ")()";
    }

    if (wrapWithEval){
      if (runInParentScope){
        output = "[][" + encode("flat") + "]" +
          "[" + encode("constructor") + "]" +
          "(" + encode("return eval") + ")()" +
          "(" + output + ")";
      } else {
        output = "[][" + encode("flat") + "]" +
          "[" + encode("constructor") + "]" +
          "(" + output + ")()";
      }
    }

    return output;
  }

  fillMissingDigits();
  replaceMap();
  replaceStrings();

  let resTable = undefined;
  function getTable() {
    if (!resTable) {
      resTable = Object.assign({}, MAPPING);
      for (let i in resTable) {
        resTable[i] = encode(i);
      }
    }
    return Object.assign({}, resTable);
  }
  
  self.JSFuck = {
    encode: encode,
    getTable: getTable,
  };
})(typeof(exports) === "undefined" ? window : exports);
