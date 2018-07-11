import model from '../../../models/business'

export default {

    one({commit},{id}) {
        return model.one(id).then((business) => {
            console.log(`business`,business)
        })
    }
}