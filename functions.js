const editor = document.getElementById('editor');
const result = document.getElementById('result');
const fileNameInput = document.getElementById('fileNameInput');
const shadowRoot = result.attachShadow({ mode: 'open' });
editor.addEventListener('input', () => {
const rawHTML = marked(editor.value);
const cleanHTML = DOMPurify.sanitize(rawHTML);
shadowRoot.innerHTML = '';
const styleElement = document.createElement('style');
styleElement.textContent = `
:host div{
font-family: "Arial", Courier, monospace;
color: #222;
}
:host h1, :host h2, :host h3, :host h4, :host h5, :host h6 {
color: #222;
}
:host p{
line-height: 1.5;
margin: 20px 0;
}
:host img{
width: 100%;
height: auto;
margin: 20px 0;
}
`;
const contentDiv = document.createElement('div');
contentDiv.innerHTML = cleanHTML;
shadowRoot.appendChild(styleElement);
shadowRoot.appendChild(contentDiv);
});
function clearText(){
editor.value = '';
shadowRoot.innerHTML = '';
}
function copymdText(){
const mdText = editor.value;
if (mdText){
navigator.clipboard.writeText(mdText).then(() => {
alert("MD texten kopierad!");
}).catch(err => {
console.error("Fel vid kopiering: ", err);
});
} else {
alert("Men? Det finns ju ingen text att kopiera!");
}}
function copyhtmlText(){
const contentDiv = shadowRoot.querySelector('div');
const cleanHTML = contentDiv ? contentDiv.innerHTML : '';
if (cleanHTML) {
navigator.clipboard.writeText(cleanHTML).then(() => {
alert("HTML markup kopierad!");
}).catch(err => {
console.error("Fel vid kopiering: ", err);
});
} else {
alert("Men? Det finns ju ingen HTML att kopiera!");
}}
function downloadmdFile(){
const fileName = fileNameInput.value.trim();
const mdText = editor.value;
if (!fileName){
alert("Namnet Saknas");
return;
}
const specialChars = /[<>:"/\\|?*]/;
if (specialChars.test(fileName)){
alert("Namnet Har Spec Char");
return;
}
const sanitizedFileName = fileName.replace(/\s+/g, '-');
const blob = new Blob([mdText], { type: 'text/markdown' });
const downloadLink = document.createElement('a');
downloadLink.href = URL.createObjectURL(blob);
downloadLink.download = `${sanitizedFileName}.md`;
downloadLink.click();
}
