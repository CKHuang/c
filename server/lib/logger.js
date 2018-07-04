const TYPE = {
    'TRACE': 'TRACE',
    'ERROR': 'ERROR',
    'INFO': 'INFO'
}

const pad = (val) => {
    return val > 9 ? String(val) : '0' + String(val)
}

const now = () => {
    const d = new Date();
    return [
        d.getFullYear(),
        pad( d.getMonth() + 1 ),
        pad( d.getDate() )
    ].join('-') + ' ' + [
        pad( d.getHours() ),
        pad( d.getMinutes() ),
        pad( d.getSeconds() ),
    ].join(':') + '.' + d.getMilliseconds()
}

var color = `[34m`;
const write = (type,message) => {
    color = color.indexOf('[34m') > -1 ? `[35m` : `[34m`
    console.log(`\x1b${color}${now()} [${type}] ${message}\x1b${color}`) 
}

const error = (error) => {

}

const info = () => {

}

const flow = () => {

}

const trace = (action,message = '') => {
    write(TYPE.TRACE,`[${action}][${typeof message == 'object' ? JSON.stringify(message) : message}]`)
}

export default {
    error,
    info,
    flow,
    trace
}