// admin products table
let orderTable = document.getElementById("order-table");

// Load local Storage
const retrieve = (key) => {
  return JSON.parse(window.localStorage.getItem(key));
};

// Store local Storage
const save = (key, values) => {
  window.localStorage.setItem(key, JSON.stringify(values));
};

// load Table data
let tableData = `<thead>
                <tr>
                <th scope="col">User ID</th>
                <th scope="col">Product</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                <th scope="col">Order Status</th>
                <th class="text-center" scope="col">Action</th>
                </tr>
                </thead>`;

const loadTable = (data) => {
  for (let table of data) {
    tableData += `<tbody>
                        <tr>
                        <th scope="row">${table.id}</th>
                        <td>${table.name}</td>
                        <td>1</td>
                        <td>${table.price}</td>
                        <td width="15%">
                            <select
                            class="form-select form-select-sm w-100 status"
                            aria-label="Default select example"
                            id="${table.id}"
                            >
                            <option value="Pending">Pending</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Canceled">Canceled</option>
                            </select>
                        </td>
                        <td class="text-center">
                            <button class="btn btn-success update" value="${table.id}">Update</button>
                        </td>
                        </tr>
                    </tbody>`;
  }
  orderTable.innerHTML = tableData;
};

const orderData = retrieve("orderStatus");
loadTable(orderData);

// update status
const status = document.querySelectorAll(".status");
const updateBtn = document.querySelectorAll(".update");
updateBtn.forEach((btn) => {
    console.log(btn);
  btn.addEventListener("click", (e) => {
    status.forEach((s) => {
      let statusData = retrieve("orderStatus");
      console.log(statusData);
      if (s.id === e.target.value) {
        console.log(e.target.value);
        statusData = statusData.map((val) => {
            console.log(val);
            if(val.id === e.target.value){
                s.value = s.value;
                return {...val, status:s.value};
            }else{
                return val;
            }
        });
        save("orderStatus", statusData);
        alert("Status Updated");
      }
    });
  });
});
