function map(value) {
    const parsed = JSON.parse(value.values[0].data);
    if (parsed.mark > 90) {
        return [{ top: 1, other: 0 }]
    } else {
        return [{ top: 0, other: 1 }]
    }
}
