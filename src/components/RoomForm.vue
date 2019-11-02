<template>
	<v-list-group
    :prepend-icon="icons.door"
    :value="true"
  >
    <template v-slot:activator>
      <v-list-item-title>Room: {{ room_name || ' - ' }}</v-list-item-title>
    </template>

    <v-list-item>
      <v-list-item-content>
      	<div class="text-right">
      		<v-icon>{{ icons.trash }}</v-icon>
      	</div>
        <v-form ref="room-form" v-model="room_valid">
          <v-row>
            <v-col>
              <v-text-field
                  v-model="room_name"
                  label="Room name"
                  type="text"
                ></v-text-field>
            </v-col>
          </v-row>

          <v-row> 
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="width"
                :rules="num_rules"
                label="Width"
                suffix="m"
                type="number"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="depth"
                :rules="num_rules"
                label="Depth"
                suffix="m"
                type="number"
                required
              ></v-text-field>
            </v-col>

            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="height"
                :rules="num_rules"
                label="Height"
                suffix="m"
                type="number"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
        
        <h3 v-if="room_valid">體積 : 使用面積 ({{ format(width * depth) }} m²) x 層高 ({{ format(height) }} m) = ({{ format(width * depth * height) }} m³)</h3>
      </v-list-item-content>
    </v-list-item>

    <v-list-group
      sub-group
      :value="room_valid"
    >
      <template v-slot:activator>
				<v-list-item-title>Materials</v-list-item-title>
				<v-list-item-icon>
					<v-icon>{{ icons.wall }}</v-icon>
				</v-list-item-icon>
      </template>

      <v-list-item v-for="(item, index) in items" :key="index">
				<v-list-item-content>
					<v-list-item-title>Material: {{ item.name }}</v-list-item-title>
					<v-row>
					  <v-col cols="12" md="4">
					    <v-text-field
					        v-model="item.name"
					        label="Name"
					        type="text"
					      >
					    </v-text-field>
					  </v-col>
					  <v-col cols="12" md="4">
					    <v-text-field
					        v-model="item.factor"
					        :rules="num_rules"
					        label="Factor A"
					        type="number"
					        required
					      >
					    </v-text-field>
					  </v-col>
					  <v-col cols="12" md="4">
					    <v-text-field
					        v-model="item.area"
					        :rules="num_rules"
					        label="Area"
					        type="number"
					        suffix="m²"
					        required
					      >
					    </v-text-field>
					  </v-col>
					</v-row>
	      </v-list-item-content>
	      <v-list-item-icon>
					<v-icon @click="delMaterial(index)">{{ icons.trash }}</v-icon>
				</v-list-item-icon>
      </v-list-item>

      <div class="text-right">
        <v-btn rounded color="secondary" dark @click="addMaterial">Add a material</v-btn>
      </div>
    </v-list-group>
  </v-list-group>
</template>

<script>
	import { mdiDoorClosed, mdiWall, mdiTrashCanOutline} from '@mdi/js';

	export default{
		name: "MuaualForm",
		data: ()=>({
      icons: {
        door: mdiDoorClosed,
        wall: mdiWall,
        trash: mdiTrashCanOutline,
      },

      room_name: '',
			width: null,
			depth: null,
			height: null,
      room_valid: false,
      items: [],
      new_item: { name: null, factor: null, area: null },
			num_rules: [
				v => !!v || 'Required',
				v => !isNaN(Number(v)) || 'Must be a number',
				v => Number(v) > 0 || 'Invalid numebr'
			]
		}),
		methods:{
      addMaterial(){
        var vm = this
        vm.items.push(vm.new_item)
      },
      delMaterial(index){
      	var vm = this
      	vm.items.splice(index, 1)
      },
      format(num){
        return Number(num).toFixed(2)
      }
		}
	}
</script>