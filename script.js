function displayOutput() {
    let input = document.getElementById("input_array").value;
    if (input === "") {
      alert("Input is empty...");
    } else {
      let arr = input.split(",").map(Number);
      let n = arr.length;
      let max = Math.max(...arr) + 1;
  
      let table1 = document.getElementById("inputTable");
      let table2 = document.getElementById("outputTable");
  
      table1.removeChild(table1.firstElementChild);
      table2.removeChild(table2.firstElementChild);
  
      table1.append(createTable(max, n));
      table2.append(createTable(max, n));
  
      let fillTable1 = document.querySelectorAll("#inputTable > table > tr");
      let fillTable2 = document.querySelectorAll("#outputTable > table > tr");
  
      document.getElementById("input_array_display").innerText = arr;
  
      let result = calculateWater(arr, n);
      document.getElementById("output_value").innerHTML =
        "Output: " + result[0] + " Units";
  
      tableFillColor(fillTable1, result[1], arr, max, n, true);
      tableFillColor(fillTable2, result[1], arr, max, n, false);
    }
  }
  
  function createTable(m, n) {
    let table = document.createElement("table");
    table.style.width = "100%";
    table.setAttribute("cellpadding", "15px");
    table.setAttribute("border", "1");
    table.setAttribute("bordercolor", "black");
    table.setAttribute("rules", "all");
    for (let i = 0; i < m; i++) {
      var tr = document.createElement("tr");
      for (let j = 0; j < n; j++) {
        var td = document.createElement("td");
        td.setAttribute("id", j);
        tr.appendChild(td);
      }
      tr.setAttribute("id", i);
      table.appendChild(tr);
    }
    return table;
  }
  
  function calculateWater(arr, n) {
    let res = 0;
    let fill = [0];
    for (let i = 1; i < n - 1; i++) {
      let left = arr[i];
      for (let j = 0; j < i; j++) {
        left = Math.max(left, arr[j]);
      }
      let right = arr[i];
      for (let j = i + 1; j < n; j++) {
        right = Math.max(right, arr[j]);
      }
      res += Math.min(left, right) - arr[i];
      fill.push(Math.min(left, right) - arr[i]);
    }
    fill.push(0);
    return [res, fill];
  }
  
  function tableFillColor(element, fill, arr, m, n, yellowFill) {
    for (let i = 0; i < n; i++) {
      let blueFill = fill[i];
      for (let j = 0; j < m; j++) {
        if (j >= m - fill[i] - arr[i] && blueFill != 0) {
          element[j].children[i].style.backgroundColor = "blue";
          blueFill -= 1;
        }
        if (j >= m - arr[i] && yellowFill) {
          element[j].children[i].style.backgroundColor = "yellow";
        }
      }
    }
  }
  
  var btn = document.getElementById("submitButton");
  btn.addEventListener("click", displayOutput);