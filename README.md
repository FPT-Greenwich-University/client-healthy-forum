# client-paginate

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# Project using vuetify and for reuseable pagination component, i using event listener (vm.$emit), currentPage state and lastPage state is store in index.js (store).
## Important: using only using computed to get and set currentPage, get lastPage can be using mapState() from vuex. Using watcher on currenPage state to call event method and call back asynchronous method fetch resrouce of backend side and re-render it again in state of vuex. 
# you can props only last_page in paginate component and must have listen event callback.