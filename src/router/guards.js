import router from "@/router/index";

export const checkAuthenticated = (to, from, next) => {
    if (!localStorage.getItem('token') && to.name !== 'Login') { // if user not authenticated and try to go route isn't login
        next({name: 'Login'})
    } else if (localStorage.getItem('token') && to.name === 'Login') {  // if user has login and try to redirect route login
        router.go(-1)
    } else {  // next to route
        next()
    }
}

// export const checkUserLogged = (to, from, next) => {
//     console.log('to', to)
//
//     console.log('from', from);
//     console.log('next', next)
//     // if user has login and try to redirect route login
//     if (localStorage.getItem('token') && to.name === 'Login') {
//         next(false)
//     } else {
//         next()
//     }
// }