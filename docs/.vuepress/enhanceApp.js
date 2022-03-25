
export default ({ Vue, isServer }) => {
  if (!isServer) {
    Vue.prototype.$nextTick(() => {
        console.log(`Hello.`);
    })

    const options = {

    }

    import('@').then(module => Vue.use(module.default, options))
  }
}
