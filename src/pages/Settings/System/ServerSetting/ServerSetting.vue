<template>
  <div class="tables-basic">
    <h2 class="page-title">
      <span class="fw-semi-bold">{{ $t('sidebar.server_settings') }}</span>
      <h5>{{ $t("content.manage_system_settings_include_ports_logging")}}</h5>
    </h2>

    <!--Bản chuẩn-->
    <b-row>
      <b-col lg="9" sm="9" xs="12">
        <b-list-group>
          <b-list-group-item>
            <a href="#">{{ $t('content.general_settings') }}</a>
          </b-list-group-item>
          <b-list-group-item>
            <a href="#">{{ $t('content.login_background') }}</a>
          </b-list-group-item>
          <b-list-group-item>
            <a href="#">{{ $t('content.email_settings') }}</a>
          </b-list-group-item>
          <b-list-group-item>
            <a href="#">{{ $t('content.server_logging') }}</a>
          </b-list-group-item>
                    <b-list-group-item>
            <a href="#">{{ $t('content.server_logging') }}</a>
          </b-list-group-item>
                    <b-list-group-item>
            <a href="#">{{ $t('content.deployment_client') }}</a>
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "ServerSetting",
  components: {},
  data() {
    return {};
  },
};
</script>

