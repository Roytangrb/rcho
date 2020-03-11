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
          <v-tab
            v-for="tab in tabs"
            :key="tab.id"
          >
            {{ T[tab.name] }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-content>
      <v-tabs-items v-model="curr_tab">
        <v-tab-item>
          <TableUpload :lang="lang" />
        </v-tab-item>
        <v-tab-item>
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
      tabs: [
        { id: 1, name: 'upload' },
        { id: 2, name: 'manual' }
      ],
      curr_tab: 1,
      translation,
    }
  },
  methods: {

  }
};
</script>

<style lang="less">
  
</style>
