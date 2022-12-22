const { initClients, getValue } = require('./common');

const data = [
    { key: 'name', value: 'MySQL' },
    { key: 'nodesCount', value: 5 },
    { key: 'options', value: { maxConnections: 50 }}
]

const bucket = 'configuration';


async function initRiak() {
    const clients = await initClients();
    const client = clients[0];
    const ping = await client.ping();
    console.log(`Ping: ${ping}`);

    await Promise.all(
        data.map(record => client.storeValue({ bucket, ...record }))
    );

    console.log('\nComparing nodes');
    for (const record of data) {
        const results = await Promise.all(clients.map(
            client => client.fetchValue({ bucket, key: record.key })
        ))
        const value1 = getValue(results[0]);
        const value2 = getValue(results[1]);
        const value3 = getValue(results[2]);
        console.log(`${value1} == ${value2} == ${value3}`);
    }
}

initRiak().then(() => console.log('\ncompleted'));


