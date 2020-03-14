<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>{{ T['title'] }}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn-toggle
        v-model="lang"
        dense
        tile
        group
        mandatory
      >
        <v-btn value="CN">中</v-btn>
        <v-btn value="EN">EN</v-btn>
      </v-btn-toggle>

      <template v-slot:extension>
        <v-tabs
          v-model="curr_tab"
          centered
        >
          <v-tab href="#upload" class="hidden-sm-and-down">
            {{ T['upload'] }}
          </v-tab>
          <v-tab href="#manual">
            {{ T['manual'] }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-content>
      <v-tabs-items :value="curr_tab">
        <v-tab-item value="upload">
          <TableUpload :lang="lang" />
        </v-tab-item>
        <v-tab-item value="manual">
          <Form :lang="lang" />
        </v-tab-item>
      </v-tabs-items>
    </v-content>
  </v-app>
</template>

<script>
import TableUpload from './components/TableUpload.vue'
import Form from './components/ManualForm.vue'

export default {
  name: 'App',
  components: {
    TableUpload,
    Form
  },
  computed: {
    T(){
      return this.translation[this.lang]
    }
  },
  data(){
    var translation = {
      EN: {
        title: 'Coming Soon...',
        upload: 'Read Excel',
        manual: 'Manual',
      },
      CN: {
        title: '醛威計算器',
        upload: '讀取試算表',
        manual: '輸入計算'
      }
    }
    return {
      lang: 'CN',
      curr_tab: 'manual',
      translation,
    }
  },
  methods: {

  }
};
</script>

<style lang="less">
  
</style>
