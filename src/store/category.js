import firebase from 'firebase/app';
export default {
  actions: {
    async fetchCategories({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid');
        const categories =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/categories`)
              .once('value')
          ).val() || {};
        const arrayCat = Object.keys(categories).map((key) => ({
          ...categories[key],
          id: key,
        }));
        arrayCat.sort(function(a, b) {
          var nameA = a.title.toUpperCase();
          var nameB = b.title.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        return arrayCat;
      } catch (error) {
        commit('setError', error);
      }
    },
    async fetchCategoryById({ commit, dispatch }, id) {
      try {
        const uid = await dispatch('getUid');
        const category =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/categories`)
              .child(id)
              .once('value')
          ).val() || {};
        return { ...category, id };
      } catch (error) {
        commit('setError', error);
      }
    },
    async createCategory({ commit, dispatch }, { title, limit }) {
      try {
        const uid = await dispatch('getUid');
        const category = await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .push({ title, limit });
        console.log(category);

        return { title, limit, id: category.key };
      } catch (error) {
        commit('setError', error);
      }
    },
    async updateCategory({ commit, dispatch }, { title, limit, id }) {
      try {
        const uid = await dispatch('getUid');

        const category = await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .child(id)
          .update({ title, limit });

        return { title, limit };
      } catch (error) {
        commit('setError', error);
      }
    },
  },
};
