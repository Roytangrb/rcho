const materials = [
	{	
		id: 0,
		name: '胶合板01',
		levels: [
			{ code: 'E0', level: '一级', rcho: 0.12, tvoc: 0.14},
			{ code: 'E1', level: '二级', rcho: 0.32, tvoc: 0.48},
			{ code: 'E2', level: '三级', rcho: 0.44, tvoc: 1.4},
			{ code: 'E3', level: '四级', rcho: 0.5, tvoc: 2.08},
		]
	}
]

const U = 0.26 //综合折算系数

export { materials, U }