import $ from 'jquery'
import {message} from "ant-design-vue";
import router from "@/router/index.js";
export default {
    state: {
        id: "",
        username: "",
        photo: "",
        token: "",
        rating: "",
        is_login: false,
        pulling_info: true,
    },
    getters: {
    },
    mutations: {
        updateUser(state, user) {
            state.id = user.id;
            state.username = user.username;
            state.rating = user.rating;
            state.photo = user.photo;
            state.is_login = user.is_login;
        },
        updateToken(state, token) {
            state.token = token;
        },
        logout(state) {
            state.id = "";
            state.username = "";
            state.rating = "";
            state.photo = "";
            state.token = "";
            state.is_login = false;
        },
        updatePulling_info(state, pulling_info) {
            state.pulling_info = pulling_info;
        }
    },
    actions: {
        login(context, data) {
            $.ajax({
                url: "http://localhost:3000/api/user/account/token",
                type: "post",
                data: {
                    username: data.username,
                    password: data.password,
                },
                success(resp) {
                    if (resp.error_message === "success") {
                        localStorage.setItem("jwt_token", resp.token);
                        context.commit("updateToken", resp.token);
                        data.success(resp);
                    } else {
                        data.error(resp);
                    }
                },
                error(resp) {
                    data.error(resp);
                }
            });
        },
        getinfo(context, data) {
            $.ajax({
                url: "http://localhost:3000/api/user/account/info",
                type: "get",
                headers: {
                    Authorization: "Bearer " + context.state.token,
                },
                success(resp) {
                    if (resp.error_message === "success") {
                        context.commit("updateUser", {
                            ...resp,
                            is_login: true,
                        });
                        data.success(resp);
                    } else {
                        data.error(resp);
                    }
                },
                error(resp) {
                    message.error(resp.message);
                }
            })
        },
        logout(context) {
            localStorage.removeItem("jwt_token");
            context.commit("logout");
            router.push({name: "login"})
        }
    },
    modules: {
    }
}