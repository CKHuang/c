export default {
    append(store,{business}) {
        store.list.push(business);
        console.log('->mutations',business)
    }
}