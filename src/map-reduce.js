const { initSingleClient } = require('./common');

const bucket = 'marks';

function map(value) {
    const parsed = JSON.parse(value.values[0].data);
    if (parsed.mark > 90) {
        return [{ top: 1, other: 0 }]
    } else {
        return [{ top: 0, other: 1 }]
    }
}

function reduce(mappedValues) {
    const sums = { top: 0, other: 0 };
    for (var i = 0; i < mappedValues.length; i++) {
        sums.top += mappedValues[i].top;
        sums.other += mappedValues[i].other;
    }
    sums.topPercentage = (sums.top / (sums.top + sums.other)) * 100;
    return [sums];
}

(async() => {
    const client = await initSingleClient();
    for (const name of ['alex', 'bobby', 'john', 'jerry', 'mack']) {
        for (let i = 0; i < 100; i++) {
            const mark = Math.round(Math.random() * 100);
            try {
                await client.storeValue({bucket, key: i.toString(), value: {mark, name}})
            } catch {
                break;
            }
        }
    }

    const marksByName = await client.mapReduce(JSON.stringify({
        inputs: bucket,
        query: [
            {
                map: {
                    language: 'javascript',
                    source: map.toString()
                },
/*                map: {
                    language: 'javascript',
                    bucket: "my_functions",
                    key: "map-marks"
                }*/
            },
            {
                reduce: {
                    language: 'javascript',
                    source: reduce.toString(),
                    keep: true
                }
            }
        ]
    }))
    console.log(marksByName);
})()
