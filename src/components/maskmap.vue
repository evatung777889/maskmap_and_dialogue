<template>
  <div class="row no-gutters">
    <!-- 選擇所在縣市 -->
    <div class="toolbox col-sm-3 p-2 bg-white ">
      <div class="form-group d-flex">
        <label for="cityName" class="col-form-label mr-2 text-right"
          >縣市</label
        >
        <div class="flex-fill">
          <select id="cityName" class="form-control" v-model="select.city">
            <option value="">請選擇縣市</option>
            <option :value="c.CityName" v-for="c in CityName">
              {{ c.CityName }}</option
            >
          </select>
        </div>
      </div>
      <!-- 選擇所在地區 -->
      <div class="form-group d-flex">
        <label for="area" class="col-form-label mr-2 text-right">地區</label>
        <div class="flex-fill">
          <select id="area" class="form-control" v-model="select.area">
            <option value="">請選擇地區</option>
            
            <!-- find()回傳第一個找到符合條件的那項，用v-for產生 cityName的縣市地區資料。 -->
            <option
              :value="a.AreaName"
              v-for="a in CityName.find(city => city.CityName === select.city)
                .AreaList"
            >
              {{ a.AreaName }}</option
            >
          </select>
        </div>
      </div>
    </div>

    <!-- 顯示藥局位置 -->
    <div class="col-sm-9">
      <div id="map"></div>
    </div>
  </div>
</template>

<script>
import CityName from "../assets/CityCountyData.json";
import L from "leaflet";
let openStreetMap = {}; //建立空地圖物件

export default {
  data() {
    return {
      CityName,
      openStreetMap: {},
      data: [],
      select: {
        city: "新北市",
        area: "新莊區"
      }
    };
  },
  mounted() {
    const api =
      "https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json";
      //使用 vue-axios提供的方法 this.$http.get(api)獲得遠端資料
      this.$http.get(api).then(response => {
      //將空陣列 data 指定為遠端獲得的資料，資料僅需取得藥局資訊
      //這裡的features指的是console.log(response)後的陣列資料
      this.data = response.data.features;

      //地圖建立
      openStreetMap = L.map("map", {
        center: [25.02449, 121.4139574],
        zoom: 16
      });
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18
      }).addTo(openStreetMap);
    });
  },

  computed: {
    pharmacies() {
      // this.data = 前面存取的藥局陣列，filter()為篩選功能
      return this.data.filter(pharmacy => {
        if (!this.select.area) {
          //properties = console.log的陣列資料，county = 縣市
          //因為口罩地圖是依據使用者所選擇的區域進行查詢，所以藥局標記出現的位置需為「縣市／地區下拉選單的值」與「藥局的縣市／地區的值」相符。
          return pharmacy.properties.county === this.select.city;
        }
        //                        town = 區域 
        return pharmacy.properties.town === this.select.area;
        
      });
    }
  },
  //使用 watch 來監聽篩選資料是否有變化
  watch: {
    pharmacies(value) {
      //當值發生變化就執行 updateMap() 更新地圖標記
      console.log(value)
      this.updateMap();
    }
  },methods:{
    updateMap() {
      //移除舊標記，leaflet內建函式
      openStreetMap.eachLayer((layer) =>{
        if(layer instanceof L.Marker){
          openStreetMap.removeLayer(layer)
        }
      })
      
      
      //用forEach()跑迴圈，並用Leaflet提供的marker將藥局位置標出來
      this.pharmacies.forEach((pharmacy) => {
        // 透過藥局經緯度疊加標記
        L.marker([
          //geometry.coordinates = 陣列資料的經緯度，[0] = 經度，[1] = 緯度
          pharmacy.geometry.coordinates[1],
          pharmacy.geometry.coordinates[0],
          //bindPopup()是Leaflet的函示，顯示藥局彈窗
        ]).addTo(openStreetMap).bindPopup(`<p><strong style="font-size: 20px;">${pharmacy.properties.name}</strong></p>
          <strong style="font-size: 16px; color: #d45345;">口罩剩餘：成人 - ${pharmacy.properties.mask_adult ? `${pharmacy.properties.mask_adult} 個` : '未取得資料'} / 兒童 - ${pharmacy.properties.mask_child ? `${pharmacy.properties.mask_child} 個` : '未取得資料'}</strong><br>
          地址: ${pharmacy.properties.address}<br>
          電話: ${pharmacy.properties.phone}<br>
          <small>最後更新時間: ${pharmacy.properties.updated}</small>`);
      });
    },
  }
};
</script>

<style scoped>
#map {
  position: relative;
  height: 80vw;
}

.row {
  --bs-gutter-x: 0rem;
}
</style>
