const net = require('net');
const { createPair } = require('./lib/gzip');

require('yargs')
    .usage('$0 <command> [args]')
    .command('client', 'start client mode', {
        localPort: {
            describe: 'local listening port',
            type: 'number',
            default: 3390,
        },
        remoteAddress: {
            describe: 'remote IP address',
            type: 'string',
            demandOption: true,
        },
        remotePort: {
            describe: 'remote port',
            type: "number",
            default: 3391,
        },
    }, (args) => {
        const server = net.createServer((socket) => {
            const remote = net.connect(args.remotePort, args.remoteAddress, () => {
                console.log(`connected to ${args.remoteAddress}:${args.remotePort}`);

                const { gzip, unzip } = createPair();
                socket.pipe(gzip).pipe(remote);
                remote.pipe(unzip).pipe(socket);
            });
            remote.on('error', (e) => {
                console.error(`remote error: ${e}`);
                socket.end();
            });

            socket.on('error', (e) => {
                console.error(`client error: ${e}`);
                remote.end();
            });
        });
        server.on('error', (e) => {
            console.error(`listening error: ${e}`);
        });
        server.listen(args.localPort, () => {
            console.log(`listening on ${args.localPort}`);
        });
    })
    .command('server', 'start server mode', {
        localPort: {
            describe: 'local listening port',
            type: 'number',
            default: 3391,
        },
        rdpPort: {
            describe: 'local RDP server port',
            type: 'number',
            default: 3389,
        }
    }, (args) => {
        const server = net.createServer((socket) => {
            console.log(`incoming connection from ${socket.remoteAddress}:${socket.remotePort}`);

            const remote = net.connect(args.rdpPort, '127.0.0.1', () => {
                const { gzip, unzip } = createPair();
                socket.pipe(unzip).pipe(remote);
                remote.pipe(gzip).pipe(socket);
            });
            remote.on('error', (e) => {
                console.error(`remote error: ${e}`);
                socket.end();
            });

            socket.on('error', (e) => {
                console.error(`client error: ${e}`);
                remote.end();
            });
        });
        server.on('error', (e) => {
            console.error(`listening error: ${e}`);
        });
        server.listen(args.localPort, () => {
            console.log(`listening on ${args.localPort}`);
        });
    })
    .help()
    .argv;
