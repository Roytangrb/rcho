<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>醛微計算器</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn-toggle
        v-model="lang"
        dense
        tile
        group
      >
        <v-btn value="CN">中</v-btn>
        <v-btn value="EN">EN</v-btn>
      </v-btn-toggle>

      <template v-slot:extension>
        <v-tabs
          v-model="tab"
          centered
        >
          <v-tab
            v-for="(tab, i) in tabs"
            :key="i"
          >
            {{ tab }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-content>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <TableUpload />
        </v-tab-item>
        <v-tab-item>
          <Form />
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
  data: () => ({
    lang: "CN",
    tabs: ["Upload", "Manual"],
    tab: "Manual",
  }),
  methods: {

  }
};
</script>
