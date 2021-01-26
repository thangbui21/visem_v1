<template>
  <highcharts
    :constructor-type="'mapChart'"
    :options="mapOptions"
    class="map"
  ></highcharts>
</template>

<script>
export default {
  name: "bubble-map",
  data() {
    return {
      mapOptions: {
        chart: {
          map: "worldmap",
          backgroundColor: "transparent",
          borderColor: false,
          // width: 1500,
          // height: 800,
        },
        credits: {
          enabled: false,
        },
        exporting: {
          enabled: false,
        },
        title: {
          text: "",
          style: {
            color: "#b4b5bf",
          },
        },

        subtitle: {
          text: "",
        },

        legend: {
          enabled: false,
          itemStyle: {
            color: "#b4b5bf",
          },
        },

        //Zoom in, Zoom out
        mapNavigation: {
          enabled: false,
          buttonOptions: {
            theme: {
              fill: "#a4edba",
              //'stroke-width': 0.3,
              stroke: "#3A3E6B",
              r: 0,
              states: {
                hover: {
                  fill: "#E75F5B",
                },
                select: {
                  stroke: "#039",
                  fill: "#a4edba",
                },
              },
            },
            verticalAlign: "bottom",
          },
        },
        series: [
          {
            name: "Countries",
            borderColor: "#6979C9",
            borderWidth: 0.5,
          },

          {
            type: "mapbubble",
            name: "Attack Origins",
            color: "#E75F5B",

            joinBy: ["iso-a2", "code"],
            //data: data
            data: [
              {
                code3: "VNM",
                z: 117,
                code: "VN",
              },
              {
                code3: "HKG",
                z: 36,
                code: "HK",
              },
              {
                code3: "CHN",
                z: 56,
                code: "CN",
              },
              {
                code3: "KOR",
                z: 35,
                code: "KR",
              },
              {
                code3: "USA",
                z: 100,
                code: "US",
              },
              {
                code3: "GEO",
                z: 21,
                code: "GE",
              },
              {
                code3: "VGB",
                z: 31,
                code: "VG",
              },
            ],
            minSize: 4,
            maxSize: "11%",
            tooltip: {
              pointFormat: "attacks: {point.z} ",
              style: {
                color: 'red',
              },
              // pointFormat: "{point.properties.hc-a2}: {point.z} thousands",
            },
          },
        ],
      },
    };
  },

  methods: {},
};
</script>
 <style scoped>
.map {
  min-height: 500px;
}
</style>