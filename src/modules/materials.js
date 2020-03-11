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
	},
	{	
		id: 1,
		name: '密度板02',
		levels: [
			{ code: 'E0', level: '一级', rcho: 0.15, tvoc: 0.2},
			{ code: 'E1', level: '二级', rcho: 0.79, tvoc: 0.19},
			{ code: 'E2', level: '三级', rcho: 1.24, tvoc: 0.37},
			{ code: 'E3', level: '四级', rcho: 1.8, tvoc: 0.43},
		]
	},
	{	
		id: 2,
		name: '细木工板04',
		levels: [
			{ code: 'E0', level: '一级', rcho: 0.23, tvoc: 0.38},
			{ code: 'E1', level: '二级', rcho: 0.27, tvoc: 0.37},
			{ code: 'E2', level: '三级', rcho: 0.42, tvoc: 0.83},
			{ code: 'E3', level: '四级', rcho: 0.84, tvoc: 0.77},
		]
	},
	{	
		id: 3,
		name: '饰面木板05',
		levels: [
			{ code: 'E0', level: '一级', rcho: 0.06, tvoc: 1.6},
			{ code: 'E1', level: '二级', rcho: 0.23, tvoc: 0.84},
			{ code: 'E2', level: '三级', rcho: 0.45, tvoc: 0.82},
			{ code: 'E3', level: '四级', rcho: 0.59, tvoc: 1.55},
		]
	},
	{	
		id: 4,
		name: '刨花板06',
		levels: [
			{ code: 'E0', level: '一级', rcho: 0.16, tvoc: 0.32},
			{ code: 'E1', level: '二级', rcho: 0.34, tvoc: 0.5},
			{ code: 'E2', level: '三级', rcho: 0.48, tvoc: 0.66},
		]
	},
	{	
		id: 5,
		name: '木地板07',
		levels: [
			{ code: 'E0', level: '一级', rcho: 0.14, tvoc: 0.59},
			{ code: 'E1', level: '二级', rcho: 0.18, tvoc: 0.68},
			{ code: 'E2', level: '三级', rcho: 0.36, tvoc: 0.65},
		]
	},
	{	
		id: 6,
		name: '实木板材08',
		levels: [
			{ code: 'E0', level: '一级', rcho: 0.07, tvoc: 0.43},
			{ code: 'E1', level: '二级', rcho: 0.13, tvoc: 0.62},
			{ code: 'E2', level: '三级', rcho: 0.22, tvoc: 0.59},
		]
	},
	{	
		id: 7,
		name: '乳胶漆09',
		levels: [
			{ code: 'E0', level: '一级', rcho: 0.08, tvoc: 0.37},
			{ code: 'E1', level: '二级', rcho: 0.25, tvoc: 0.37},
			{ code: 'E2', level: '三级', rcho: 0.32, tvoc: 0.32},
		]
	},
	{	
		id: 8,
		name: '壁纸10',
		levels: [
			{ code: 'E0', level: '一级', rcho: 0.09, tvoc: 0.15},
			{ code: 'E1', level: '二级', rcho: 0.11, tvoc: 0.18},
			{ code: 'E2', level: '三级', rcho: 0.78, tvoc: 1.18},
		]
	},
	{	
		id: 9,
		name: '硬包12',
		levels: [
			{ code: 'E0', level: '一级', rcho: 0.07, tvoc: 0.09},
			{ code: 'E1', level: '二级', rcho: 0.13, tvoc: 0.55},
			{ code: 'E2', level: '三级', rcho: 0.27, tvoc: 1.09},
		]
	},
	{	
		id: 10,
		name: '地毯13',
		levels: [
			{ code: 'E0', level: '一级', rcho: 0.13, tvoc: 0.4},
			{ code: 'E1', level: '二级', rcho: 0.32, tvoc: 0.82},
			{ code: 'E2', level: '三级', rcho: 0.48, tvoc: 0.66},
		]
	},
]

const U = 0.26 //综合折算系数

export { materials, U }