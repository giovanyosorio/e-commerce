// const http = require('http');
// const server = http.createServer();
// const days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'
// ];

// const getDayName = function (chunk) {
//   if ( Date.parse(chunk) ) {
//     let date = new Date (chunk);
//     let dayNumber = date.getDay();
//     return days[dayNumber];
//   } else {
//     return 'El formato de fecha no concuerda, intenta nuevamente.';
//   }
// }

// server.on('request', (req, res) => {
//   if (req.method === 'POST') {
//     let body = [];

//     req.on('data', chunk => {
//       let dayName = getDayName(chunk);
//       body.push(dayName);
//     })
//     .on('end', () => {
//       res.writeHead(200, {'Content-Type' : 'text-plain'});

//       res.end(body.toString());
//     });
//   };
// });

// server.listen(8003);
// console.log('Cumpleserver en la url http://localhost:8003')





    // const {Transform}=require('stream')

    // const camelStream = new Transform({
    //     transform(chunk, callback) {
    //         const data = chunk.toString();
    //         data.split(" ").map((word) => {
    //             this.push(word.charAt(0).toUpperCase()+word.slice(1).toLowerCase())
    //         }).join("");
    //     }
    // });


    // process.stdin.pipe(camelStream).pipe(process.stdout)



    const os=require('os')

    console.log(os.userInfo());