<template>
  <div>
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <b-tabs fill v-model="tabIndex">
          <b-tab title="Select Source" active id="1">
            <b-row>
              <b-text
                >Configure this instance to listen on any TCP or UDP port to
                capture data sent over the network (such as syslog).
                <b-link href="#">Learn More</b-link></b-text
              >
            </b-row>
            <b-row>
              <b-col></b-col>
              <b-col cols="8">
                <b-button-group style="width: 100%">
                  <b-button variant="default" style="" :pressed="isChoose" @click="singleSelect1($event)"
                    >TCP</b-button
                  >
                  <b-button variant="default" :pressed="!isChoose" @click="singleSelect1($event)">UDP</b-button>
                </b-button-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col
                ><div style="float: right"><p>Port</p></div></b-col
              >
              <b-col cols="8">
                <b-form-input v-model="text" placeholder=""></b-form-input>
              </b-col>
            </b-row>

            <!--Thay đổi v-model -->
            <b-row>
              <b-col
                ><div style="float: right"><p>Source name override</p></div>
              </b-col>
              <b-col cols="8">
                <b-form-input
                  v-model="text"
                  placeholder="optional"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col
                ><div>
                  <p style="float: right">Only accept connection</p>
                </div></b-col
              >
              <b-col cols="8">
                <b-form-input
                  v-model="text"
                  placeholder="optional"
                ></b-form-input>
              </b-col>
            </b-row>

            <b-row>
              <b-col lg="4"></b-col>
              <b-col lg="8"> </b-col>
            </b-row>
            <b-row>
              <b-col cols="0.5" style="text-align: left">
                <v-btn text small @click="tabIndex--"
                  ><v-icon style="color: white; margin-right: 0px"
                    >fa fa-angle-double-left</v-icon
                  ></v-btn
                >
              </b-col>
              <b-col></b-col>
              <b-col cols="0.5" style="text-align: right">
                <v-btn text small @click="tabIndex++"
                  ><v-icon style="color: white; margin-right: 0px"
                    >fa fa-angle-double-right</v-icon
                  ></v-btn
                >
              </b-col>
            </b-row>
          </b-tab>

          <b-tab title="Input Settings">
            <b-row>
              <b-text
                >Configure this instance to listen on any TCP or UDP port to
                capture data sent over the network (such as syslog). Learn
                More</b-text
              >
            </b-row>

            <b-row>
              <b-col
                ><div style="float: right"><p>Source type</p></div></b-col
              >
              <b-col cols="8">
              <!--Xử lý selected button -->
                <b-button-group style="width: 100%">
                  <b-button variant="default" id="select" :pressed="isPressed" @click="singleSelect2($event)">Select</b-button>
                  <b-button variant="default" id="new" :pressed="!isPressed" @click="singleSelect2($event)">New</b-button>
                </b-button-group>
                <div>
                <b-dropdown
                  :text="textDropdown1"
                  ref="SourceType"
                  variant="default"
                  menu-class="w-100"
                  style="width: 100%; padding-top: 10px"
                >
                  <b-dropdown-item  
                    v-for="app in appContext"
                    :key="app.text"
                    v-on:click="changeItem('SourceType', app.text)"
                  >
                  {{app.text}}
                  </b-dropdown-item>
                  
                </b-dropdown>
                </div>
              </b-col>
            </b-row>

            <!--App Context-->
            <b-row>
              <b-col
                ><div style="float: right"><p>App Context</p></div></b-col
              >
              <b-col cols="8">
                <b-dropdown
                  ref="appContext"
                  :text="textDropdown2"
                  variant="default"
                  menu-class="w-100"
                  style="width: 100%"
                >
                  <b-dropdown-item 
                    v-for="app in appContext"
                    :key="app.text"
                    v-on:click="changeItem('app-context', app.text)"
                  >
                  {{app.text}}
                  </b-dropdown-item>
                  
                </b-dropdown>
              </b-col>
            </b-row>

            <!--Thay đổi v-model -->
            <b-row>
              <b-col
                ><div style="float: right"><p>Method</p></div>
              </b-col>
              <b-col cols="8">
                <b-button-group style="width: 100%">
                  <b-button variant="default" :pressed="!isMethodChoosed && !isCustomBtn" v-on:click.self="singleSelect3($event)">IP</b-button>
                  <b-button variant="default" :pressed="isMethodChoosed && !isCustomBtn" v-on:click.self="singleSelect3($event)">DNS</b-button>
                  <b-button variant="default" :pressed="isCustomBtn" v-on:click.self="singleSelect3($event)">Custom</b-button>
                </b-button-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col
                ><div style="float: right"><p>Index</p></div></b-col
              >
              <b-col cols="8">
                <b-dropdown
                  ref="index"
                  :text="textDropdown3"
                  variant="default"
                  menu-class="w-100"
                  style="width: 100%; padding-top: 10px"
                >
                  
                 <b-dropdown-item 
                    v-for="i in index"
                    :key="i.text"
                    v-on:click="changeItem('index', i.text)"
                  >
                  {{i.text}}
                  </b-dropdown-item>
                </b-dropdown>

                <div></div>
              </b-col>
            </b-row>

            <b-row>
              <b-col lg="4"></b-col>
              <b-col lg="8"> </b-col>
            </b-row>
            <b-row>
              <b-col cols="0.5" style="text-align: left">
                <v-btn text small @click="tabIndex--"
                  ><v-icon style="color: white; margin-right: 0px"
                    >fa fa-angle-double-left</v-icon
                  ></v-btn
                >
              </b-col>
              <b-col></b-col>
              <b-col cols="0.5" style="text-align: right">
                <v-btn text small @click="tabIndex++"
                  ><v-icon style="color: white; margin-right: 0px"
                    >fa fa-angle-double-right</v-icon
                  ></v-btn
                >
              </b-col>
            </b-row>
          </b-tab>

          <b-tab title="Review">
            <b-row>
              <b-col lg="8">
                <b-list-group>
                  <b-list-group-item
                    class="d-flex justify-content-between align-items-center"
                  >
                    Input Type
                    <b-text>Value</b-text>
                  </b-list-group-item>
                  <b-list-group-item
                    class="d-flex justify-content-between align-items-center"
                  >
                    Input Type
                    <b-text>Hola</b-text>
                  </b-list-group-item>
                  <b-list-group-item
                    class="d-flex justify-content-between align-items-center"
                  >
                    Input Type
                    <b-text>Hola</b-text>
                  </b-list-group-item>
                  <b-list-group-item
                    class="d-flex justify-content-between align-items-center"
                  >
                    Input Type
                    <b-text>Hola</b-text>
                  </b-list-group-item>
                </b-list-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="4"></b-col>
              <b-col lg="8"> </b-col>
            </b-row>
            <b-row>
              <b-col cols="0.5" style="text-align: left">
                <v-btn text small @click="tabIndex--"
                  ><v-icon style="color: white; margin-right: 0px"
                    >fa fa-angle-double-left</v-icon
                  ></v-btn
                >
              </b-col>
              <b-col></b-col>
              <b-col cols="0.5" style="text-align: right">
                <v-btn text small @click="tabIndex++"
                  ><v-icon style="color: white; margin-right: 0px"
                    >fa fa-angle-double-right</v-icon
                  ></v-btn
                >
              </b-col>
            </b-row>
          </b-tab>

          <b-tab title="Done">
            <b-row>
              <h4>TCP input has been created successfully.</h4>
            </b-row>
            <b-row>
            <b-col cols="12">
              <b-button href="/more/query" variant="default" style="margin: auto; display: block; width: 150px">Start searching</b-button>
            </b-col>
            </b-row>
          </b-tab>
        </b-tabs>
        <b-progress height="5px" :value="(tabIndex+1)*25" style=""></b-progress>
      </b-col>

      <b-col> </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "NewTCP",
  components: {},
  data() {
    return {
      textDropdown1: '',
      textDropdown2: '',
      textDropdown3: '',
      isChoose: true,
      isMethodChoosed: true,
      isPressed: true,
      isCustomBtn: false,
      value: 0,
      tabIndex: 1,

      sourceType: [
        {text: "Host 1"},
        {text: "Host 2"},
        {text: "Host 3"},
      ],

      appContext: [
        {text: "VNCS Web Analytics 1"},
        {text: "VNCS Web Analytics 2"},
        {text: "VNCS Web Analytics 3"},
      ],

      index: [
        {text: "history"},
      ],

    };
  },


  methods: {

    changeItem: function (refName, item) {
        this.textDropdown1 = item;
    },

    singleSelect1: function(event){
      let el = event.currentTarget;
      let bool = Boolean(el.getAttribute('aria-pressed') === "true");
      if(bool != this.isChoose){
        this.isChoose = false;
      }else{
        this.isChoose = true;
      }
    },

    singleSelect2: function(event){
      event.preventDefault();
      let el = event.currentTarget;
      let bool = Boolean(el.getAttribute('aria-pressed')==="true");
      if(bool!=this.isPressed){
        this.isPressed = false;
      }else{
        this.isPressed = true;
      }
    },
    
    singleSelect3: function(event){
      event.preventDefault();
      let el = event.currentTarget;
      let bool = Boolean(el.getAttribute('aria-pressed')==="true");
      if(el.innerHTML==="Custom"){
        this.isCustomBtn = true;
      }
      else if(bool!=this.isMethodChoosed){
        this.isMethodChoosed = false;
        this.isCustomBtn = false;
      }else{
        this.isMethodChoosed = true;
        this.isCustomBtn = false;
      }
    },

  },

  mounted(){
    this.singleSelect1(event);
    this.singleSelect2(event);
    this.singleSelect3(event);
  }

};
</script>