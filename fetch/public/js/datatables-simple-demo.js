window.addEventListener('DOMContentLoaded', event => {
    // Simple-DataTables
    // https://github.com/fiduswriter/Simple-DataTables/wiki

    let dataTable;

    function loadData() {
    fetch('/data')
        .then(response => response.json())
        .then(data => {
            // Check if data is empty
            if (!data['driving-history'].length) {
                return;
            }

            // Get a reference to the table and device select element
            const table = document.querySelector('.table');
            const deviceSelect = document.querySelector('#device-select');

            // Map the data in the desired order
            const myData = data['driving-history'].reverse();
            const mappedData = myData.map(event => [event.time, event.device_id, event.behavior, event.latitude, event.longitude, event.score]);

            // Destroy the existing table
            if (dataTable) {
                dataTable.destroy();
            }

            // Filter the data by device_id if a device is selected
            const selectedDevice = deviceSelect.value;
            const filteredData = selectedDevice ? mappedData.filter(event => event[1] === selectedDevice) : mappedData;

            // Set up the table using Simple-DataTables
            dataTable = new window.simpleDatatables.DataTable(".table", {
                data: {
                    data: filteredData
                }
            });
            
            // Update the device options in the select element
            const devices = new Set(myData.map(event => event.device_id));
            deviceSelect.innerHTML = '<option value="">All Device Ids</option>' + Array.from(devices).map(device => `<option value="${device}">${device}</option>`).join('');

            // Set the selected option to the current device, or to "" if all devices are selected
            deviceSelect.value = selectedDevice || "";
        });
}

// Refresh the table when the device is changed
document.querySelector('#device-select').addEventListener('change', () => {
    loadData();
});

// Load the data on page load
loadData();

// Refresh the table every 30 seconds
setInterval(loadData, 30000);
});
