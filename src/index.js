


const cityWeather = {

};

const button = document.getElementById('search-button');
button.addEventListener("click", () => {
    const inputValue = document.getElementById('input-field').value;
    getWeather(inputValue)
});

let outerHtml = false
function getWeather(value) {
    fetch(`https://python3-dot-parul-arena-2.appspot.com/test?cityname=${value}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.status !== "failed") {
                if (outerHtml === false) {
                    document.getElementById("no-item").outerHTML = "";
                    outerHtml = true;
                }


                cityWeather[value] = data
                console.log(cityWeather, data)
                const table = document.getElementById("myTable");
                const row = table.insertRow();
    
                // Add cells to the row
                const cell1 = row.insertCell(0);
                const cell2 = row.insertCell(1);
                const cell3 = row.insertCell(2);
                const cell4 = row.insertCell(3);
                const cell5 = row.insertCell(4);
                const cell6 = row.insertCell(5);

                cell1.innerHTML = value;
                cell2.innerHTML = `<input value="${data.description}" class="input-field-table" /> `;
                cell3.innerHTML = data.temp_in_celsius;
                cell4.innerHTML = data.pressure_in_hPa;
                cell5.innerHTML = getHours(data.date_and_time);
                cell6.innerHTML = `<button class="delete-button" onclick="deleteRow(this)" >Delete</button>`;
            }
        });

}
console.log(Date.now());
console.log(new Date());
function getHours(date_and_time) {
    console.log(date_and_time);
    const split1 = date_and_time.split(",");
    console.log(split1);
    const split2 = split1[0].split("/");
    console.log(split2);
    const dataTime = new Date(`${split2[2]}-${split2[1]}-${split2[0]}T${split1[1]}`);
    console.log(`${split2[2]}-${split2[1]}-${split2[0]}T${split1[1]}`);
    const currentTime = Date.now();
    const ageInMilliseconds = currentTime - dataTime.getTime();
    const ageInHours = ageInMilliseconds / (1000 * 60 * 60);
    return ageInHours
}

function deleteRow(btn) {
    console.log(btn)
    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
    
  }