<template>
  <div>
    <Header></Header>
    <div class='main'>
      <div class='flex flex-wrap justify-between'>
        <div class='scene-card' v-for='(item, index) in imgList' :key='index'>
          <a :href='item.href' class='img' target='_blank'>
            <div>
              <img :src='item.src' alt='图片加载中...' />
            </div>
            <span>{{ item.title }}</span>
          </a>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Index from "./index.js";

export default Index;
</script>
