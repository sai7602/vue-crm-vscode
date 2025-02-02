import firebase from 'firebase/app';
export default {
  actions: {
    async createRecord({ dispatch, commit }, record) {
      try {
        const uid = await dispatch('getUid');
        return await firebase
          .database()
          .ref(`/users/${uid}/records`)
          .push(record);
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    async fetchRecords({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid');
        const records =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/records`)
              .once('value')
          ).val() || {};
        const arrayRec = Object.keys(records).map((key) => ({
          ...records[key],
          id: key,
        }));

        return arrayRec;
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
    async fetchRecordById({ dispatch, commit }, id) {
      try {
        const uid = await dispatch('getUid');
        const record =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/records`)
              .child(id)
              .once('value')
          ).val() || {};
        return { ...record, id };
      } catch (error) {
        commit('setError', error);
        throw error;
      }
    },
  },
};
