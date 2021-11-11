import instance from "./axoisInstance";

// 로그인- Login.js
export const postSignIn = (req) => {
    return instance({
        url: "/signin",
        method: "post",
        data: req
    });
};