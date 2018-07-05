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
const write = (type,message,ucolor = '') => {
    if ( type == TYPE.TRACE ) {
        color = color.indexOf('[34m') > -1 ? `[35m` : `[34m`
        ucolor = color;
    }
    console.log(`\x1b${ucolor}${now()} [${type}] ${message}\x1b${ucolor}`) 
}

const error = (action,error = new Error()) => {
    write(TYPE.ERROR,`[${action}][${error}]`,`[31m`)
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