export const WEB_STARTER = {
  html: `<h1>Hello, world!</h1>
<p>Edit the HTML, CSS, and JS tabs and watch your page update live.</p>
<button id="cheer-btn">Click me</button>`,
  css: `body {
  font-family: sans-serif;
  background: #0f172a;
  color: #f1f5f9;
  padding: 24px;
}

button {
  background: #6366f1;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  background: #4f46e5;
}`,
  js: `const btn = document.getElementById("cheer-btn");
let clicks = 0;

btn.addEventListener("click", () => {
  clicks++;
  btn.textContent = "Clicked " + clicks + " time" + (clicks === 1 ? "" : "s") + "!";
});`,
};
