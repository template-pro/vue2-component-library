import MyComp from '@/components/MyComp.vue'

const components = [
  MyComp,
]

components.install = function(Vue) {
  components.forEach((comp) => {
    Vue.component(comp.name, comp)
  })
}

export default components
