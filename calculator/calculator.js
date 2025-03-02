// show the value of a key on the screen when pressed
document.addEventListener('keydown', function(event) {
    if (event.key == '0' || event.key == '1' 
        || event.key == '2' || event.key == '3' 
        || event.key == '4' || event.key == '5' 
        || event.key == '6' || event.key == '7' 
        || event.key == '8' || event.key == '9' 
        || event.key == '+' || event.key == '-' 
        || event.key == '*' || event.key == '/') {
            document.querySelector("#screen").value += event.key;
        }       

       // delete a character from the screen if the backspace key was pressed 
        else if (event.key == 'Backspace') {
        backspace();
    }
})

document.addEventListener('keydown', function(event) {
    if (event.key == 'enter') {
        operate();
    }
})

function backspace() {
    screen = document.querySelector('#screen').value;
    result = screen.toString();
    y = result.slice(0, result.length-1);
    document.querySelector('#screen').value = y;
}

function operate() {
    screen = document.querySelector('#screen').value;
    
    try {
        result = math.evaluate(screen);
        localStorage.setItem('Ans', result);
        document.querySelector('#result').value = `=${result}`;
    }
    catch(err) {
        console.log(err.Name);
        document.querySelector('#result').value = 'SYNTAX ERROR';
    }      
}  

function show(value) {
    screen = document.querySelector('#screen');
    screen.value += value;
}

function prev_answer() {
    previous = localStorage.getItem('Ans');
    document.querySelector('#screen').value = previous;
    document.querySelector('#result').value = '';
}

function clear_screen() {
    document.querySelector('#screen').value = '';
    document.querySelector('#result').value = '';
}

