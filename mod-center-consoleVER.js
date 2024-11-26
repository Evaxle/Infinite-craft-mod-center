(function () {
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.height = '100%';
    container.style.width = '250px';
    container.style.backgroundColor = 'white';
    container.style.padding = '20px';
    container.style.borderRight = '2px solid black';
    container.style.zIndex = '9999';
    container.style.overflow = 'auto';
    container.style.resize = 'both';
    container.style.userSelect = 'none';

    const heading = document.createElement('h1');
    heading.textContent = 'Infinite Craft Mod Center';
    container.appendChild(heading);

    const loadButton = document.createElement('input');
    loadButton.type = 'file';
    loadButton.style.marginTop = '10px';
    loadButton.addEventListener('change', handleFileSelect);
    container.appendChild(loadButton);

    const addMultipleItemsBtn = document.createElement('button');
    addMultipleItemsBtn.textContent = 'Add Multiple Items';
    addMultipleItemsBtn.style.marginTop = '10px';
    addMultipleItemsBtn.addEventListener('click', addItems);
    container.appendChild(addMultipleItemsBtn);

    const addSingleItemBtn = document.createElement('button');
    addSingleItemBtn.textContent = 'Add Single Item';
    addSingleItemBtn.style.marginTop = '10px';
    addSingleItemBtn.addEventListener('click', addNewItem);
    container.appendChild(addSingleItemBtn);

    const exportDataBtn = document.createElement('button');
    exportDataBtn.textContent = 'Export Data';
    exportDataBtn.style.marginTop = '10px';
    exportDataBtn.addEventListener('click', exportData);
    container.appendChild(exportDataBtn);

    const wikibutton = document.createElement('button');
    wikibutton.textContent = 'Open Infinite Craft Wiki';
    wikibutton.style.marginTop = '10px';
    wikibutton.addEventListener('click', openWiki);
    container.appendChild(wikibutton);

    const minimizeButton = document.createElement('button');
    minimizeButton.textContent = '-';
    minimizeButton.style.position = 'absolute';
    minimizeButton.style.bottom = '10px';
    minimizeButton.style.left = '10px';
    minimizeButton.addEventListener('click', toggleUI);
    container.appendChild(minimizeButton);

    const plusButton = document.createElement('button');
    plusButton.textContent = '+';
    plusButton.style.position = 'absolute';
    plusButton.style.bottom = '10px';
    plusButton.style.left = '10px';
    plusButton.style.display = 'none';
    plusButton.addEventListener('click', toggleUI);
    container.appendChild(plusButton);

    document.body.appendChild(container);

    let isMinimized = false;
    let prevWidth = '300px';
    const MINIMIZED_WIDTH = '50px';

    function addNewItem() {
        let data = localStorage.getItem('infinite-craft-data');
        if (!data) {
            localStorage.setItem('infinite-craft-data', JSON.stringify({ elements: [] }));
            data = localStorage.getItem('infinite-craft-data');
        }

        const elements = JSON.parse(data).elements;
        const text = prompt("What is the name of the item?");
        const emoji = prompt("What should the emoji be for the item? Hint: Press Windows + .");
        const discovered = confirm("Should the item be a first discovery?");
        const newItem = { text, emoji, discovered };

        elements.push(newItem);
        const updatedData = JSON.stringify({ elements });

        if (confirm("Are you sure? This CANNOT be easily undone!")) {
            localStorage.setItem('infinite-craft-data', updatedData);
            alert("Reloading!");
            window.location.reload();
        }
    }

    function toggleUI() {
        const isMinimized = container.style.width === MINIMIZED_WIDTH;

        if (isMinimized) {
            container.style.width = prevWidth;
            minimizeButton.textContent = '-';
            heading.style.display = 'block';
            loadButton.style.display = 'block';
            addMultipleItemsBtn.style.display = 'block';
            addSingleItemBtn.style.display = 'block';
            exportDataBtn.style.display = 'block';
        } else {
            prevWidth = container.style.width;
            container.style.width = MINIMIZED_WIDTH;
            minimizeButton.textContent = '+';
            heading.style.display = 'none';
            loadButton.style.display = 'none';
            addMultipleItemsBtn.style.display = 'none';
            addSingleItemBtn.style.display = 'none';
            exportDataBtn.style.display = 'none';
        }
    }

    function openWiki() {
        window.open('https://expitau.github.io/InfiniteCraftWiki/', '_blank');
    }

    function handleFileSelect(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function (event) {
            const data = JSON.parse(event.target.result);
            const currentData = localStorage.getItem('infinite-craft-data');
            const elements = currentData ? JSON.parse(currentData).elements : [];

            data.forEach(item => elements.push(item));

            localStorage.setItem('infinite-craft-data', JSON.stringify({ elements }));
            location.reload();
        };

        reader.readAsText(file);
    }

    function addItems() {
        alert("This feature is not implemented yet.");
    }

    function exportData() {
        const data = localStorage.getItem('infinite-craft-data');
        if (!data) {
            alert("No data to export.");
            return;
        }

        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');

        a.href = url;
        a.download = 'infinite-craft-data.json';
        a.click();

        URL.revokeObjectURL(url);
    }
})();
