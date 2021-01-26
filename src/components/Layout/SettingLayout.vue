<template>
<div :class="{root: true, sidebarClose}">
  <Header />
  <Sidebar />
  <div ref="content" class="content animated fadeInUp">
    <transition name="router-animation">
      <router-view />
    </transition>
  </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import Sidebar from '@/components/Sidebar/SidebarSetting';
import Header from '@/components/Header/Header';

import './Layout.scss';

export default {
  name: 'SettingLayout',
  components: {Header ,Sidebar },
  methods: {
    ...mapActions(
      'layout', ['switchSidebar', 'changeSidebarActive'],
    ),
    currentUser: function() {
      return this.$store.state.auth.user;
    },
    ...mapState('layout', {
      sidebarClose: state => state.sidebarClose,
    }),
  },
  /*
  computed: {
    currentUser: function() {
      return this.$store.state.auth.user;
    },
    ...mapState('layout', {
      sidebarClose: state => state.sidebarClose,
    }),
  },*/
  mounted() {
    if (!this.currentUser()) {
      this.$router.push('/login');
    }
    this.$refs.content.addEventListener('animationend', () => {
      this.$refs.content.classList.remove('animated');
      this.$refs.content.classList.remove('fadeInUp');
    });
  }
};
</script>

<style src="./Layout.scss" lang="scss" />
