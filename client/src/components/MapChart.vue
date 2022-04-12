<template>
    <div id="mapChart">

    </div>
</template>

<script>
import * as mapboxgl from "mapbox-gl"
import axios from "axios"
export default {
    name: 'MapChart',
    data(){
        return {
            loading: true,
        }
    },
    create(){

    },
    mounted(){
        this.map = "";
        this.mapInit(this);
    },
    computed:{

    },
    watch:{
        
    },
    methods:{
        mapInit(that){
            mapboxgl.accessToken="pk.eyJ1Ijoia3Vua3VueXkiLCJhIjoiY2tna2pxNm8wMDIwcTJ4bzFmZmN3cnBmaSJ9.lIlQrcMFrHeWPQpL-03ETg";
            this.map = new mapboxgl.Map({
                container: "mapChart", // container id
                style: "mapbox://styles/kunkunyy/cl1vt1ruy00be14o9b5aecd7r", // stylesheet location
                center: [104.946465,35.347269], // starting position [lng, lat]
                zoom: 3.5, // starting zoom
                doubleClickZoom:false,
            });
        },
    },
}
</script>

<style>
#mapChart{
  height: 100%;
  width: 100%;
}
.mapboxgl-control-container{
    visibility: hidden;
}
</style>