function timer(sec) {
    return new Promise((resolve, reject) => {
      if (!sec) {
        reject("Timer is Needed ");
      } else {
        setTimeout(() => {
          resolve();
        }, sec);
      }
    });
  }
  
  export default timer;