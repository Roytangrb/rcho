<template>
	<v-container>
		<h2>Width * Depth * Height</h2>
		<v-row>
			<v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="width"
            :rules="meterRules"
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
            :rules="meterRules"
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
            :rules="meterRules"
            label="Height"
            suffix="m"
            type="number"
            required
          ></v-text-field>
        </v-col>
		</v-row>
	</v-container>	
</template>

<script>
	export default{
		name: "MuaualForm",
		data: ()=>({
			width: null,
			depth: null,
			height: null,
			meterRules: [
				v => !!v || 'Required',
				v => !isNaN(Number(v)) || 'Must be a number',
				v => Number(v) > 0 || 'Invalid numebr'
			]
		}),
		methods:{

		}
	}
</script>