<template>
  <router-view />
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      user_login: {
        name: '',
        full_name: '',
        email: '',
        role: ''
      }
    }
  },
  created() {
    localStorage.setItem("language",this.$i18n.locale);
    const currentPath = this.$router.history.current.path;

    if (window.localStorage.getItem('user') === 'false') {
      this.$router.push('/login');
    }

    if (currentPath === '/' || currentPath === '/app') {
      this.$router.push('/app/dashboard');
    }
  },
};
</script>

<style src="./styles/theme.scss" lang="scss" />
