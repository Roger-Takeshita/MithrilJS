const m = require('mithril');

let User = {
    list: [],
    loadList: async () => {
        try {
            const response = await m.request({
                method: 'GET',
                url: 'https://rem-rest-api.herokuapp.com/api/users',
                withCredentials: true,
            });
            User.list = response.data;
            return User.list;
        } catch (error) {
            console.log(error);
        }
    },
    current: {},
    load: async (id) => {
        try {
            const response = await m.request({
                method: 'GET',
                url: `https://rem-rest-api.herokuapp.com/api/users/${id}`,
                withCredentials: true,
            });
            User.current = response;
        } catch (error) {
            console.log(error);
        }
    },
    save: async () => {
        try {
            const response = await m.request({
                method: 'PUT',
                url: `https://rem-rest-api.herokuapp.com/api/users/${User.current.id}`,
                body: User.current,
                withCredentials: true,
            });
            const idx = User.list.findIndex((user) => user.id === response.id);
            User.list[idx] = response;
            return response;
        } catch (error) {
            console.log(error);
        }
    },
};

module.exports = User;
