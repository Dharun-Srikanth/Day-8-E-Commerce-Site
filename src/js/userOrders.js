// order status table

let pending = document.getElementById("pending");
let delivered = document.getElementById("delivered");
let canceled = document.getElementById("canceled");

// Load local Storage
const retrieve = (key) => {
  return JSON.parse(window.localStorage.getItem(key));
};

// Store local Storage
const save = (key, values) => {
  window.localStorage.setItem(key, JSON.stringify(values));
};


// load table data
let pendinTable = `<thead>
                    <tr>
                    <th scope="col">Order ID</th>
                    <th scope="col">Product</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                    <th scope="col">Order Status</th>
                    </tr>
                    </thead>`;
let deliveredTable = `<thead>
                    <tr>
                    <th scope="col">Order ID</th>
                    <th scope="col">Product</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                    <th scope="col">Order Status</th>
                    </tr>
                    </thead>`;
let canceledTable = `<thead>
                    <tr>
                    <th scope="col">Order ID</th>
                    <th scope="col">Product</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                    <th scope="col">Order Status</th>
                    </tr>
                    </thead>`;

const loadTable = (data) => {
    const user = sessionStorage.getItem("user");
    for(let table of data){
        if(table.status === "Pending" && table.userID===user){
            pendinTable += `<tbody>
                            <tr>
                            <th scope="row">${table.id}</th>
                            <td>${table.name}</td>
                            <td>1</td>
                            <td>${table.price}</td>
                            <td width="15%">
                                <p class="fw-bold">${table.status}</p>
                            </td>
                            </tr>
                        </tbody>`

            pending.innerHTML = pendinTable;
        }else if(table.status === "Delivered" && table.userID===user){
            deliveredTable += `<tbody>
                                <tr>
                                <th scope="row">${table.id}</th>
                                <td>${table.name}</td>
                                <td>1</td>
                                <td>${table.price}</td>
                                <td width="15%">
                                    <p class="fw-bold">${table.status}</p>
                                </td>
                                </tr>
                            </tbody>`

            delivered.innerHTML = deliveredTable;
        }else if(table.status === "Canceled" && table.userID===user){
            canceledTable += `<tbody>
                                <tr>
                                <th scope="row">${table.id}</th>
                                <td>${table.name}</td>
                                <td>1</td>
                                <td>${table.price}</td>
                                <td width="15%">
                                    <p class="fw-bold">${table.status}</p>
                                </td>
                                </tr>
                            </tbody>`

            canceled.innerHTML = canceledTable;
        }
    }

}

const orderData = retrieve("orderStatus");
loadTable(orderData);