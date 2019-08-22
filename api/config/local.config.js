import path from 'path';
let config = {
    web_end_point: "http://192.168.168.94",
    api_end_point: "http://192.168.168.94:8000",
    mongo: {
        database_name: "category_product",
        host: "localhost",
        port: "27017",
        username: "",
        password: ""
    },
    logs: {
        path: path.join(__dirname, '../logs'),
        file_name: 'development.ServiceApp.logs'
    }
};

export default config;
