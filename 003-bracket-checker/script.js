const openChars = ["(", "[", "{"];
const closeChars = [")", "]", "}"];

function allowBrackets(e) {
    const keynum = window.event ? e.keyCode : e.which;
    if (keynum === 13) {
        checkBrackets();
        return;
    }
    const char = String.fromCharCode(keynum);
    return openChars.concat(closeChars).includes(char);
}

function checkBrackets() {
    const string = document.getElementById("string").value;
    if (string.length === 0) return;

    const stack = [];
    let checked = true;

    for (const char of string) {
        if (openChars.includes(char)) {
            stack.push(char);
        } else if (stack.length === 0) {
            checked = false;
            break;
        } else {
            const top = stack.pop();
            if (openChars.indexOf(top) !== closeChars.indexOf(char)) {
                checked = false;
                break;
            }
        }
    }

    checked &&= stack.length === 0;
    alert(checked ? "Valid" : "Invalid");
}
