import router from "@/router/index";
import store from "@/store";

export const checkAuthenticated = (to, from, next) => {
  if (!localStorage.getItem("token") && to.name !== "Login") {
    // if user not authenticated and try to go route isn't login
    next({ name: "Login" });
  } else if (localStorage.getItem("token") && to.name === "Login") {
    // if user has login and try to redirect route login
    router.go(-1);
  } else {
    // next to route
    next();
  }
};

export const checkIsDoctor = (to, from, next) => {
  if (!localStorage.getItem("token") && to.name !== "Login") {
    // if user not authenticated and try to go route isn't login
    console.log("user not auth");
    // return
    next({ name: "Login" });
  } else if (localStorage.getItem("token") && to.name === "Login") {
    // if user has login and try to redirect route login
    console.log("user auth");
    // return
    router.go(-1);
  } else if (store.state.AUTH.userRoles.includes("doctor") === true) {
    console.log("user is doctor");
    // return
    next();
  }
};

export const checkIsAdmin = (to, from, next) => {
  if (
    store.state.AUTH.isAuthenticated &&
    store.state.AUTH.userRoles.includes("admin")
  ) {
    next();
  } else {
    router.go(-1);
  }
};
