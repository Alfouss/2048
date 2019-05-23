window.onload = function(event) {

  function arrEmpty(){
    return [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
  }

  let grid;

  function setup() {
    grid = arrEmpty()
    addNumber();
    draw()
    keyPressed(event)
  }

  setup()

  function addNumber() {
    let options = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (grid[i][j] === 0) {
          options.push({ //PUSH THE TABLE OBJECT THE ARRAY
            x: i,
            y: j
          })
        }
      }
    }

    if (options.length > 0) {

      for (count = 0; count < Object.keys(options).length; count++) {}// NEED OF COUNT FOR PLACE  THE NUMNER RANDOMLY
      let NumberCase = Math.floor(Math.random() * count);// count = 0 - 15
      let focusPlace = options[NumberCase];// Select (case/place) grid
      let value = Object.values(focusPlace);// select value select by the NumberPlace
      var line = grid[value[0]]// Acces complete in the array object

      let randomly = Math.random() * 1;// for choice number to display after
      line[value[1]] = randomly > 0.5 ? 2 : 4;// change value 0 by randomly
    }
  }

  function draw() { //DRAW THE BLOCK GAME

    //BIG SQUARE
    var parent = document.getElementById('test');
    parent.style.height = "415x";
    parent.style.width = "415px";
    parent.style.border = "8px solid orange";

    //CREATE ROW
    for (let i = 0; i < 4; i++) {
      var div = document.createElement("div");
      var newContent = document.createTextNode("");
      parent.append(div)
      div.appendChild(newContent);
      parent.getElementsByTagName("DIV")[i].setAttribute("id", "line-" + i);
    }

    //CREATE BLOCK BLUE FOR ROW
    for (let j = 0; j < 4; j++) {
      var parent2 = document.getElementById('line-' + j);
      parent2.style.display = "flex";
      // parent2.style.border = "2px solid blue";
      parent2.style.borderRadius = "8px";

      //CREATE CASE
      for (let c = 0; c < 4; c++) {
        var parent2 = document.getElementById('line-' + j);

        var div = document.createElement("div");
        var newContent = document.createTextNode("");
        parent2.append(div)
        div.appendChild(newContent);
        parent2.getElementsByTagName("DIV")[c].setAttribute("class", 'case-' + c);

      }
    }

    for (let j = 0; j < 4; j++) {   //CREATE BLOCK Orange FOR CASE
      for (let l = 0; l < 4; l++) {
        var parent2 = document.getElementsByClassName('case-' + j);

        parent2[l].style.border = "2px solid orange";
        parent2[l].style.borderRadius = "8px";
        parent2[l].style.height = "100px";
        parent2[l].style.width = "100px";

        if (grid[j][l] !== 0) {  //MAKE VALUE IN CASE

          var parent3 = document.getElementsByClassName('case-' + l);

          parent3[j].innerHTML = '<p class="fill">' + grid[j][l] + '</p>';
          parent3[j].style.textAlign = 'center';
          parent3[j].style.fontSize = '30px';

        }
      }
    }
  }

  //new array
  function slide(row) {

    let arr = row.filter(val => val);// find sort value different to zero
    let missing = 4 - arr.length;// number of case sub value (it will remain a positive number)
    let zeros = Array(missing).fill(0)// find all wero in the array
    arr = zeros.concat(arr);// Replace value by zero, left to rigth
    // console.log(arr)
    return arr;// result

  }

  //calcul itself
  function combine(row) {
    for (let i = 3; i >= 1; i--) {// decrement
      let a = row[i];// last value of array
      let b = row[i - 1];// the one before
      if (a == b) {// check if the values are the same
        row[i] = a + b;// addition
        row[i - 1] = 0;// give zero
      }
    }
    return row;
  }

  function copyGrid(grid) {
    let extra = arrEmpty()// it's the array init

    for (let g = 0; g < 4; g++) {
      for (let l = 0; l < 4; l++) {
        extra[g][l] = grid[g][l];// take the values of table
      }
    }
    return extra
  }

  function apply(row) {
    row = slide(row);// slide
    row = combine(row);//addition
    row = slide(row);//slide

    return row;
  }

  function compare(a, b) {
    for (let g = 0; g < 4; g++) {
      for (let l = 0; l < 4; l++) {
        if (a[g][l] !== b[g][l]) {// check if the value of array a equal to array b
          return true;
        }
      }
    }
    return false
  }

  function makeGame() {
    for (let g = 0; g < 4; g++) {
      for (let l = 0; l < 4; l++) {

        var parent2 = document.getElementsByClassName('case-' + l);

        if (grid[g][l] !== 0) {
          parent2[g].innerHTML = '<p class="fill">' + grid[g][l] + '</p>';
          parent2[g].style.textAlign = 'center';
          parent2[g].style.fontSize = '30px';
        } else {
          parent2[g].innerHTML = '<p class="fill"></p>';
        }
      }
      // let changed = compare(past, grid)
    }
  }

  function flipGrid(grid){
    for (let k = 0; k < 4; k++) {
      grid[k].reverse()// reverse array
    }
    return grid;
  }

  function rotateGrid(grid){
    let newGrid = arrEmpty();
    for (let k = 0; k < 4; k++) {
      for (let l = 0; l < 4; l++) {
        newGrid[k][l] = grid[l][k]//rotate grid
      }
    }
    return newGrid;
  }
  document.onkeydown = keyPressed;

  function keyPressed(event) {
    e = event || window.event;
    let past = copyGrid(grid);
    let flipped = false;
    let rotated = false;

    if (e.keyCode == "39") {// right slide

    } else if (e.keyCode == "37") {// left slide
      grid = flipGrid(grid)
      flipped = true
    }else if (e.keyCode == "40") {// down slide
      grid = rotateGrid(grid)
      rotated = true
    }else if (e.keyCode == "38") {// up slide
      grid = rotateGrid(grid)
      grid = flipGrid(grid)
      flipped = true
      rotated = true
    }

    for (let k = 0; k < 4; k++) {
      grid[k] = apply(grid[k])
    }

    let changed = compare(past, grid)

    if(flipped){
      grid = flipGrid(grid)
    }

    if(rotated){
      grid = rotateGrid(grid)
    }
    if (changed) {
      addNumber()
    }
    colorGrid()

    makeGame()

  }

  function colorGrid(){
    for (let g = 0; g < 4; g++) {
      for (let l = 0; l < 4; l++) {
        var parent2 = document.getElementsByClassName('case-' + l);

        if(grid[g][l] == 0) {
          parent2[g].style.backgroundColor = 'white';

        }else if(grid[g][l] == 2){
          parent2[g].style.backgroundColor = 'grey';
        }
        else if(grid[g][l] == 4){
          parent2[g].style.backgroundColor = 'blue';
        }
        else if(grid[g][l] == 8){
          parent2[g].style.backgroundColor = 'red';
        }
        else if(grid[g][l] == 16){
          parent2[g].style.backgroundColor = 'brown';
        }
        else if(grid[g][l] == 32){

        }
        else if(grid[g][l] == 64){

        }else if(grid[g][l] == 128){

        }
      }
    }
  }
}
