<template>
	<v-container>
    <v-list>
      <v-list-item v-for="(room, index) in rooms" :key="index">
        <v-list-item-content>
          <Room v-model="rooms[index]" @delete="delRoom" :lang="lang"/>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <div class="text-center">
      <v-btn rounded color="primary" dark @click="addRoom">{{ T['add_room'] }}</v-btn>
    </div>
	</v-container>	
</template>

<script>
  import Room from './RoomForm.vue'

  export default {
    components: {
      Room
    },
    props: ['lang'],
    data(){
      var translation =  {
        EN: {
          add_room: 'Add a room'
        },
        CN: {
          add_room: '添加房間'
        }
      }
      return {
        rooms: [],
        translation,
      }
    },
    mounted(){
      var vm = this

      vm.addRoom()
    },
    computed: {
      T(){
        return this.translation[this.lang]
      }
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