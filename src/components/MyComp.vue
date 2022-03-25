<template lang="pug">
  .my-comp
    p.text My-Component
    code {{ code }}
</template>

<script>
export default {
  name: 'MyComp',
  props: {
    code: {
      type: String,
      default: `
  const foo = bar;
  console.log(foo);
`.trim(),
    },
  },
}
</script>

<style lang="stylus">
  .text
    color:red
</style>
