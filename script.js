
// Table Dataset Section
function initTable() {
    // 初始化表格
    let resultTable = document.getElementById("result-table");

    // 创建表头
    const thead = resultTable.createTHead();
    const titleRow = thead.insertRow();
    const th_hour = document.createElement("th");
    th_hour.textContent = "Time (h)";
    titleRow.appendChild(th_hour);
    for (let i = 4; i <= 8; i++) {
        const th = document.createElement("th");
        th.textContent = `${i} Components`;
        titleRow.appendChild(th);
    }

    // 创建内容
    const tbody = resultTable.createTBody();
    for (let i = 1; i <= 24; i++) {
        const tr = tbody.insertRow();
        const td_hour = document.createElement("td");
        td_hour.textContent = i;
        tr.appendChild(td_hour);
        for (let j = 4; j <= 8; j++) {
            const td = document.createElement("td");
            td.textContent = "***";
            tr.appendChild(td);
        }
    }

}

function updateTable(path) {
    let resultTable = document.getElementById("result-table");
    $.ajax({
        url: path,
        success: function(data){
            let rows = data.split("\n");
            for(let i = 1; i < 25; i++){
                let row = rows[i].split(",");
                let tbody = resultTable.tBodies[0];
                let tr = tbody.rows[i-1];
                for(let j = 1; j <= 5; j++){
                    let td = tr.cells[j];
                    td.textContent = row[j];
                }
            }
        }
    });
}

// listen to the change of radio button
function tableChooseChange(){
    const showTypeValue = document.getElementById("show-type-group").querySelector("input:checked").value;
    const indicatorsValue = document.getElementById("indicators-group").querySelector("input:checked").value;
    const filename = `${indicatorsValue}_${showTypeValue}.csv`;
    const path = `assets/table/${filename}`;
    updateTable(path);
}

initTable();
updateTable("assets/table/Availability_RAND.csv");
document.getElementById("show-type-group").addEventListener("change", tableChooseChange);
document.getElementById("indicators-group").addEventListener("change", tableChooseChange);


// Map Dataset Section
function addOneElement(component_index, element_index, id) {
    const row_container = document.getElementById(id);
    const html = `
      <div class="pic-container">
        <img src="assets/map-dataset/${component_index}-widgets/png/${element_index}.png">
        <div class="map-dataset-caption-row">
          <span class="map-caption">${element_index}</span>
          <button class="button-6" role="button" onclick="window.open('assets/map-dataset/${component_index}-widgets/apollo/${element_index}.xml')">↓ Apollo</button>
          <button class="button-6" role="button" onclick="window.open('assets/map-dataset/${component_index}-widgets/png/${element_index}.png')">↓ png</button>
          <button class="button-6" role="button" onclick="window.open('assets/map-dataset/${component_index}-widgets/unity/${element_index}.zip')">↓ Unity</button>
        </div>
      </div>
    `;
    row_container.insertAdjacentHTML("beforeend", html);
}

function addOneRow(component_index, from_index, to_index, id){
    const overall_container = document.getElementById(id);
    let new_row_container = document.createElement("div");
    const new_row_id = `c${component_index}-f${from_index}-t${to_index}`;
    new_row_container.setAttribute("class", "map-group-container");
    new_row_container.setAttribute("id", new_row_id);
    overall_container.appendChild(new_row_container);
    for(let i = from_index; i <= to_index; i++){
        addOneElement(component_index, i, new_row_id);
    }
}

function reloadMap(component_index){
    let overall_container_id = "map-dataset-overall-container"
    let overall_container = document.getElementById(overall_container_id);
    overall_container.innerHTML = "";
    for(let i = 1; i <= 50; i += 3){
        addOneRow(component_index, i, Math.min(i+2, 50), overall_container_id);
    }
}

function mapChooseChange(){
    const componentValue = document.getElementById("dataset-group").querySelector("input:checked").value;
    reloadMap(componentValue);
}

reloadMap(4);
document.getElementById("dataset-group").addEventListener("change", mapChooseChange);
