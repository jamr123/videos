<template>
<div>
   <app-video v-if="rutas.video"  :direccionVideo="rutaVideo"></app-video>
  <app-inicio v-if="rutas.inicio"></app-inicio>
</div>

</template>
   
<script>

import io from 'socket.io-client';
import video from "./video.vue";
import inicio from "./inicio.vue";
export default {
  name: "Api",
  data() {
    return {
      rutas: {
        video:true,
        inicio:false
      },
      socket:io.connect('http://192.168.1.78:3333', { 'forceNew': true }),
      rutaVideo:"/videos/v1_atocha_sub.mp4"
    };
  },
  computed: {},
  methods: {
    
  },
  mounted: function() {
    
    
this.socket.on('messages', function(data) {

      console.log(data);
     

    if (data== "nivel0") {
      this.rutaVideo = "/videos/v1_atocha_sub.mp4";
    }

    if (data == "nivel1") {
      
      this.rutaVideo = "/videos/v2_atocha_sub.mp4";
     
    }

    if (data == "nivel2") {
      
      this.rutaVideo = "/videos/v3_atocha_sub.mp4";
     
    }

    if (data == "nivel3") {
      
      this.rutaVideo ="/videos/v4_atocha_sub.mp4";
     
    }

	
}.bind(this));


  },
  created: function() { },
  components: {
    'app-video':video,
    'app-inicio':inicio,
  }
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
  height: 90vh;        /* Viewport-relative units */
  width: 90vw;
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