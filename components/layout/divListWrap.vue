<template>
  <div class='div-list-wrap'>
    <slot></slot>
  </div>
</template>

<style scoped>
  .div-list-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
</style>
