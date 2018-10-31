const http2 = require('http2');
const os=require('os');

http2.connect('chensi.moe', (session) => {
    const stream = session.request({
        ':path': '/hole',
        'Content-Type': 'application/json',
    });
    stream.write(JSON.stringify({
       addresses:Object.values(os.networkInterfaces()).filter(x=>!x.internal).map()
    }));
    session.on('stream', (stream) => {
        stream.on('push', (headers) => {

        });
    })
});
