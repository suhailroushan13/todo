function timer(sec) {
    return new Promise((resolve, reject) => {
        if (!sec) {
            throw reject("Seconds are Needed.");
        }
        setTimeout(() => {
            resolve();
        }, sec);
    })
}

export default timer;