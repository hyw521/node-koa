const path = require('path')
const { resolve } = require('path')

const logConfig = {
    level: 'INFO',
    outDir: resolve(__dirname, '../logInfo'),
    flag: true
}
const base = {
    logConfig
}

module.exports = base