<template>
	<v-container>
    <v-list>
      <v-list-item v-for="(room, index) in rooms" :key="index">
        <v-list-item-content>
          <Room v-model="rooms[index]" @delete="delRoom" />
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
        var room_id = vm.rooms.length

        vm.rooms.push({
          id: room_id,
          name: null,
          width: null,
          depth: null,
          height: null,
          items: [],
        })
      },
      delRoom(index){
        var vm = this

        vm.rooms.splice(index, 1)
      }
    }
  }
</script>