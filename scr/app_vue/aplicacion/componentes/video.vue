<template>
<div>
  <div  class="container-fluid">
        <div class="row">
          <div class="col-lg-12 col-sm-12 col-md-12 col-sm-12 col-xl-12">
            <video id="video" :src="direccionVideo" autoplay controls></video>

          </div>

        </div>
      </div>

   

</div>

</template>
   
<script>

export default {
  name: "video",
  data() {
    return {
      
    };
  },
  computed: {},
  methods: {},
  mounted: function() {


  },
  created: function() { },
  components: {},
  props: ['direccionVideo'],
};
</script>

<style scoped>

video { 
  margin: 0px; 
  padding: 0px; 
  height: 100%; 
  border: none;
  background-color: #000; 
} 

video {
  display: block;       /* iframes are inline by default */
  background: #000;
  border: none;         /* Reset default border */
  height: 98vh;        /* Viewport-relative units */
  width: 98vw;
}


.container{
  background-color: #000;
  height: 100vh; 
}
.row{
  background-color: #000; 
}
.app{
  background-color: #000; 
}

.img-class{
  margin-top: 25%;
  margin-left: 25%;
}
</style>