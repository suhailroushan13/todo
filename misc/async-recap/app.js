import axios from "axios";
axios.get('http://59.92.225.188')
    .then((res) => {
        let data = res.data;
        const salaries =
            data.map(ele => +ele.salary.split(' ')[0])
        let min = salaries[0];
        salaries.forEach(ele => {
            if (ele < min) {
                min = ele;
            }
        });
        console.log(min);
    })
    .catch((err) => {
        console.error(err);
    })





// axios.get('http://59.92.225.188')
//     .then((res) => {
//         let data = res.data;
//         const max =
//             data.map(ele => +ele.salary.split(' ')[0])
//                 .sort((a, b) => b - a)[0];

//         console.log(max);
//     })
//     .catch((err) => {
//         console.error(err);
//     })