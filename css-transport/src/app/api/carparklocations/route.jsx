import Papa from 'papaparse';

function foo(callback) {
    Papa.parse('./carpark.csv', { // Adjusted to the correct path in the public folder
        download: false,
        header: true,
        complete: (result) => {
            callback(result.data);
        }
    });
}

