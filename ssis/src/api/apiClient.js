import instance from "./axoisInstance";

// 회원가입 - Register.js
export const postRegiter = (req) => {
    return instance({
        url : "/signup",
        method : "post",
        data : req
    });
};

// 아이디 중복 확인 - Register.js
export const checkId = (req) => {
    return instance({
        url : "/checkid",
        method : "post",
        data : req
    });
};