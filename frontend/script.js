function submitName() {
    let name = document.getElementById("nameInput").value;
    
    // Send name to backend
    fetch("https://my-backend-app.azurewebsites.net/save-name", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
        animateName(name);
    })
    .catch(error => console.error("Error:", error));
}

function animateName(name) {
    let animatedName = document.getElementById("animatedName");
    animatedName.innerHTML = ""; // Clear previous text

    for (let char of name) {
        let span = document.createElement("span");
        span.textContent = char;
        span.style.color = getRandomColor();
        animatedName.appendChild(span);
    }
}

function getRandomColor() {
    return "#" + Math.floor(Math.random()*16777215).toString(16);
}
