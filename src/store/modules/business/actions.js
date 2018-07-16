import model from '../../../models/business'

export default {

    one({commit},{id}) {
        model.one(id)
            .then((business) => {
                commit('append',{business})
            }).catch((error) => {})
    },

    list({commit}) {
        
    }
}