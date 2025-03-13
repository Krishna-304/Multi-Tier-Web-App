function submitName() {
    let name = document.getElementById("nameInput").value;
    if (name.trim() === "") {
        alert("Please enter a valid name.");
        return;
    }

    fetch("http://localhost:3000/api/storeName", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name })
    })
    .then(response => response.json())
    .then(data => {
        animateName(name);
    })
    .catch(error => console.error("Error:", error));
}

function animateName(name) {
    let animatedText = document.getElementById("animatedText");
    animatedText.innerHTML = "";

    for (let i = 0; i < name.length; i++) {
        let span = document.createElement("span");
        span.textContent = name[i];
        span.style.opacity = "0";
        span.style.transition = `opacity 0.5s ease-in-out ${i * 0.2}s`;
        animatedText.appendChild(span);

        setTimeout(() => {
            span.style.opacity = "1";
        }, 100);
    }
}
