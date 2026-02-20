import APIClient from ".";

function login(username, password) {
    return APIClient.post("/login", { username, password });
}

function me(username){
    return APIClient.get("/me", { params: { username } });
}

export {
    login,
    me
};