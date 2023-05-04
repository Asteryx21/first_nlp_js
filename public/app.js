const input = document.querySelector('input');
const output = document.querySelector('#output');

input.addEventListener('keyup', async e =>{
    let test = '';
    if(e.key !== 'Enter') return;
 
    const request = await fetch(`/split-words?${new URLSearchParams({
        sentence: e.target.value
    })}`);

    const other = await fetch(`/natural?${new URLSearchParams({
      sentence: e.target.value
    })}`);

    const response = await request.json();
    response.forEach((obj, i) => {
        Object.entries(obj).forEach(([key, value]) => {
            test += `${key} : ${value}`;
        })
        test += `<br></br>`;
    })

    output.innerHTML = test;

}) 