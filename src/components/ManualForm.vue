<template>
	<v-container>
    <v-list>
      <v-list-item v-for="(room, index) in rooms" :key="index">
        <v-list-item-content>
          <Room />
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <div class="text-center">
      <v-btn rounded color="primary" dark @click="addRoom">Add a room</v-btn>
    </div>
	</v-container>	
</template>

<script>
  import Room from './RoomForm.vue'

  export default {
    components: {
      Room
    },
    data: ()=>({
      rooms: [],
    }),
    mounted(){
      var vm = this

      vm.addRoom()
    },
    methods: {
      addRoom(){
        var vm = this

        vm.rooms.push({})
      },
      delRoom(){

      }
    }
  }
</script>