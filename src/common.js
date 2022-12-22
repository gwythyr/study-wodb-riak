const Riak = require("basho-riak-client");
const { promisify } = require("util");

async function initClient(address) {
    return new Promise(resolve => {
        new Riak.Client([address], (err, client) => {
            ['ping', 'storeValue', 'fetchValue', 'mapReduce']
                .forEach(method => client[method] = promisify(client[method]))
            resolve(client);
        })
    })
}


const nodes = [
    'localhost:8095',
    'localhost:8096',
    'localhost:8097',
];
async function initClients() {
    const clients = [];
    for (const address of nodes) {
        clients.push(await initClient(address));
    }
    return clients;
}

async function initSingleClient() {
    return await initClient(nodes[0]);
}

function getValue(result) {
    return result.values[0].value.toString();
}

module.exports = {
    initClients, getValue, initSingleClient
}

