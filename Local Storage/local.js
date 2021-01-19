var inpkey = document.getElementById('inpKey');
var inpVal = document.getElementById('inpValue');
var insertBtn = document.getElementById('insertBtn');
var output = document.getElementById('output');

insertBtn.addEventListener('click', addLocalStorage);

function addLocalStorage()
{
    var key= inpkey.value;
    var value = inpVal.value;

    if (key && value)
    {
        localStorage.setItem(key, value);
        location.reload();
    }
}
for (var i=0; i<localStorage.length; i++)
{
    var key = localStorage.key(i);
    var value = localStorage.getItem(key);

    output.innerHTML+= `${key}: ${value}<br>`;
}