let isDragging = false;
let offsetX, offsetY;

function handleMouseDown(event) {
    isDragging = true;
    const rect = guiContainer.getBoundingClientRect();
    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;
}

function handleMouseMove(event) {
    if (isDragging) {
        const x = event.clientX - offsetX;
        const y = event.clientY - offsetY;
        guiContainer.style.left = x + 'px';
        guiContainer.style.top = y + 'px';
    }
}

function handleMouseUp() {
    isDragging = false;
}

function exportData() {
    const data = localStorage.getItem('infinite-craft-data');
    if (data) {
        prompt('Copy this:', data);
    } else {
        alert('No data found!');
    }
}

function addItems() {
    let doesExists = localStorage.getItem('infinite-craft-data');
    let confirmed;
    let replace = '{"elements":[{"text":"Water","emoji":"💧","discovered":false},{"text":"Fire","emoji":"🔥","discovered":false},{"text":"Wind","emoji":"🌬️","discovered":false},{"text":"Earth","emoji":"🌍","discovered":false}]}';

    if (doesExists === null) {
        localStorage.setItem('infinite-craft-data', replace);
    }

    let initial = localStorage.getItem('infinite-craft-data');
    let array = JSON.parse(initial).elements;
    let userInput = prompt('Enter items with name and emoji separated by a space for each item. Example: 💸 Money 💰');
    let items = userInput.split(' ');

    if (items.length % 2 !== 0) {
        alert('Invalid number of items. Please enter both name and emoji for each item.');
        return;
    }

    for (let i = 0; i < items.length; i += 2) {
        let text = items[i];
        let emoji = items[i + 1];
        let ItemsToAdd = {
            text: text,
            emoji: emoji,
            discovered: false
        };
        array.push(ItemsToAdd);
    }

    let newItem = {
        elements: array
    };

    array = JSON.stringify(newItem);
    confirmed = confirm('Are you sure? This CANNOT be easily undone!');

    if (confirmed === true) {
        localStorage.setItem('infinite-craft-data', array);
        alert('Reloading!');
        window.location.reload();
    }

    console.log('DONE');
}

function addItem() {
    let doesExists = localStorage.getItem('infinite-craft-data');
    let confirmed;
    let replace = '{"elements":[{"text":"Water","emoji":"💧","discovered":false},{"text":"Fire","emoji":"🔥","discovered":false},{"text":"Wind","emoji":"🌬️","discovered":false},{"text":"Earth","emoji":"🌍","discovered":false}]}';

    if (doesExists === null) {
        localStorage.setItem('infinite-craft-data', replace);
    }

    let initial = localStorage.getItem('infinite-craft-data');
    let array = JSON.parse(initial).elements;
    let text = prompt('What is the name of the item?');
    let emoji = prompt('What should the emoji be for the item? Hint: Press Windows + . ');
    let discovered = confirm('Should the item be a first discovery?');
    let ItemsToAdd = {
        text: text,
        emoji: emoji,
        discovered: discovered
    };
    array.push(ItemsToAdd);

    let newItem = {
        elements: array
    };

    array = JSON.stringify(newItem);
    confirmed = confirm('Are you sure? This CANNOT be easily undone!');

    if (confirmed === true) {
        localStorage.setItem('infinite-craft-data', array);
        alert('Reloading!');
        window.location.reload();
    }

    console.log('DONE');
}

const guiContainer = document.createElement('div');
guiContainer.id = 'gui-container';
guiContainer.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; padding: 20px; border: 1px solid black; z-index: 9999; cursor: move;';

const h2 = document.createElement('h2');
h2.textContent = 'Infinite Craft GUI';
guiContainer.appendChild(h2);

const addItemsBtn = document.createElement('button');
addItemsBtn.textContent = 'Add Multiple Items';
addItemsBtn.addEventListener('click', addItems);
guiContainer.appendChild(addItemsBtn);
guiContainer.appendChild(document.createElement('br'));

const addItemBtn = document.createElement('button');
addItemBtn.textContent = 'Add Single Item';
addItemBtn.addEventListener('click', addItem);
guiContainer.appendChild(addItemBtn);
guiContainer.appendChild(document.createElement('br'));

const exportDataBtn = document.createElement('button');
exportDataBtn.textContent = 'Export Data';
exportDataBtn.addEventListener('click', exportData);
guiContainer.appendChild(exportDataBtn);
guiContainer.appendChild(document.createElement('br'));


document.body.appendChild(guiContainer);

function showGUI() {
    guiContainer.style.display = 'block';
}

guiContainer.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);

showGUI();
