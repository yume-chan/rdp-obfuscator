const stream = require('stream');
const zlib = require('zlib');

exports.createPair = function() {
    const gzip = zlib.createGzip({
        flush: zlib.constants.Z_SYNC_FLUSH,
    });
    gzip.on('error', (e) => {
        console.error(`gzip error: ${e}`);
    });

    const unzip = zlib.createUnzip({
        flush: zlib.constants.Z_SYNC_FLUSH,
    });
    unzip.on('error', (e) => {
        console.error(`unzip error: ${e}`);
    });

    return { gzip, unzip };
}
