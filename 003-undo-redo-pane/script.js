const undoStack = [];
const redoStack = [];

function logState() {
    console.log("--- Current State ---");
    console.log("pane color = " + getPaneColor());
    console.log("undo stack = " + undoStack);
    console.log("redo stack = " + redoStack);
}

function changeColor() {
    const oldColor = getPaneColor();
    const newColor = event.target.style.backgroundColor;

    if (oldColor !== newColor) {
        undoStack.push(oldColor);
        redoStack.length = 0;
        setPaneColor(newColor);
    }
}

function undoColor() {
    if (undoStack.length !== 0) {
        const oldColor = getPaneColor();
        const newColor = undoStack.pop();
        redoStack.push(oldColor);
        setPaneColor(newColor);
    }
}

function redoColor() {
    if (redoStack.length !== 0) {
        const oldColor = getPaneColor();
        const newColor = redoStack.pop();
        undoStack.push(oldColor);
        setPaneColor(newColor);
    }
}

function getPaneColor() {
    const pane = document.getElementById("pane");
    return pane.style.backgroundColor;
}

function setPaneColor(color) {
    const pane = document.getElementById("pane");
    pane.style.backgroundColor = color;
    logState();
}
