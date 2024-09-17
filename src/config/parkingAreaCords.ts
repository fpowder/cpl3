const parkingAreaCords: {
	[key: number]: {
		group: string,
		direction: string,
		cord: { 
			start: [number, number],
			vector: [number, number]
		},
		wayoutPath? : number,
        wayoutCurveCnt?: number
	}
} = {
    1: {
        group: 'top',
        direction: 'down',
        cord: {
            start: [11, 2],
            vector: [6, 10]
        },
        wayoutPath: 30,
        wayoutCurveCnt: 1
    },
    2: {
        group: 'top',
        direction: 'down',
        cord: {
            start: [17, 2],
            vector: [6, 10]
        },
		wayoutPath: 31,
        wayoutCurveCnt: 1
    },
    3: {
        group: 'top',
        direction: 'down',
        cord: {
            start: [24, 2],
            vector: [5, 10]
        },
		wayoutPath: 32,
        wayoutCurveCnt: 1
    },
    4: {
        group: 'top',
        direction: 'down',
        cord: {
            start: [29, 2],
            vector: [5, 10]
        },
		wayoutPath: 33,
        wayoutCurveCnt: 1

    },
    5: {
        group: 'top',
        direction: 'down',
        cord: {
            start: [35, 2],
            vector: [5, 10]
        },
		wayoutPath: 34,
        wayoutCurveCnt: 2,
    },
    6: {
        group: 'right',
        direction: 'left',
        cord: {
            start: [47, 13],
            vector: [9, 4]
        },
		wayoutPath: 34,
        wayoutCurveCnt: 1
    },
    7: {
        group: 'right',
        direction: 'left',
        cord: {
            start: [47, 17],
            vector: [9, 5]
        },
		wayoutPath: 35,
        wayoutCurveCnt: 1
    },
    8: {
        group: 'right',
        direction: 'left',
        cord: {
            start: [47, 22],
            vector: [9, 5]
        },
		wayoutPath: 36,
        wayoutCurveCnt: 1
    },
    9: {
        group: 'right',
        direction: 'left',
        cord: {
            start: [47, 27],
            vector: [9, 5]
        },
		// wayoutPath: 36
    },
    10: {
        group: 'right',
        direction: 'left',
        cord: {
            start: [47, 33],
            vector: [9, 5]
        },
		wayoutPath: 36
    },
    11: {
        group: 'right',
        direction: 'left',
        cord: {
            start: [47, 38],
            vector: [9, 5]
        },
		wayoutPath: 36
    },
    12: {
        group: 'left',
        direction: 'right',
        cord: {
            start: [1, 13],
            vector: [10, 4]
        },
		wayoutPath: 30,
        wayoutCurveCnt: 2,
    },
    13: {
        group: 'left',
        direction: 'right',
        cord: {
            start: [1, 17],
            vector: [10, 5]
        },
		wayoutPath: 30,
        wayoutCurveCnt: 2
    },
    14: {
        group: 'left',
        direction: 'right',
        cord: {
            start: [1, 22],
            vector: [10, 5]
        },
		wayoutPath: 29,
        wayoutCurveCnt: 1
    },
    15: {
        group: 'left',
        direction: 'right',
        cord: {
            start: [1, 27],
            vector: [10, 5]
        },
		wayoutPath: 28,
        wayoutCurveCnt: 1
    },
    16: {
        group: 'left',
        direction: 'right',
        cord: {
            start: [1, 33],
            vector: [10, 4]
        },
		wayoutPath: 27,
        wayoutCurveCnt: 1
    },
    17: {
        group: 'left',
        direction: 'right',
        cord: {
            start: [1, 37],
            vector: [10, 5]
        },
		wayoutPath: 26,
        wayoutCurveCnt: 1
    },
    18: {
        group: 'left',
        direction: 'right',
        cord: {
            start: [1, 42],
            vector: [10, 5]
        },
		wayoutPath: 25,
        wayoutCurveCnt: 1
    },
    19: {
        group: 'left',
        direction: 'right',
        cord: {
            start: [1, 48],
            vector: [10, 4]
        },
		wayoutPath: 24,
        wayoutCurveCnt: 1
    },
    20: {
        group: 'left',
        direction: 'right',
        cord: {
            start: [1, 52],
            vector: [10, 5]
        },
		wayoutPath: 23,
        wayoutCurveCnt: 1
    },
    21: {
        group: 'left',
        direction: 'right',
        cord: {
            start: [1, 57],
            vector: [10, 5]
        },
		wayoutPath: 22,
        wayoutCurveCnt: 1
    },
    22: {
        group: 'left',
        direction: 'right',
        cord: {
            start: [1, 63],
            vector: [10, 4]
        },
		wayoutPath: 21,
        wayoutCurveCnt: 1
    },
    23: {
        group: 'left',
        direction: 'right',
        cord: {
            start: [1, 67],
            vector: [10, 5]
        },
		wayoutPath: 20,
        wayoutCurveCnt: 1
    },
    24: {
        group: 'left',
        direction: 'right',
        cord: {
            start: [1, 72],
            vector: [10, 5]
        },
		wayoutPath: 19,
        wayoutCurveCnt: 1
    },
    25: {
        group: 'left',
        direction: 'right',
        cord: {
            start: [1, 78],
            vector: [10, 4]
        },
		wayoutPath: 18,
        wayoutCurveCnt: 1
    },
    26: {
        group: 'left',
        direction: 'right',
        cord: {
            start: [1, 82],
            vector: [10, 5]
        },
		wayoutPath: 17,
        wayoutCurveCnt: 1
    },
    27: {
        group: 'left',
        direction: 'right',
        cord: {
            start: [1, 87],
            vector: [10, 5]
        },
		wayoutPath: 16,
        wayoutCurveCnt: 1
    },
    28: {
        group: 'left',
        direction: 'right',
        cord: {
            start: [1, 93],
            vector: [10, 6]
        },
		wayoutPath: 15,
        wayoutCurveCnt: 1
    },
    29: {
        group: 'left',
        direction: 'right',
        cord: {
            start: [1, 99],
            vector: [10, 6]
        },
		wayoutPath: 14,
        wayoutCurveCnt: 1
    },
    30: {
        group: 'left',
        direction: 'right',
        cord: {
            start: [1, 106],
            vector: [10, 6]
        },
		wayoutPath: 13,
        wayoutCurveCnt: 1
    },
    31: {
        group: 'left',
        direction: 'right',
        cord: {
            start: [1, 112],
            vector: [10, 5]
        },
		wayoutPath: 12,
        wayoutCurveCnt: 1
    },
    32: {
        group: 'left',
        direction: 'right',
        cord: {
            start: [1, 118],
            vector: [10, 6]
        },
		wayoutPath: 11,
        wayoutCurveCnt: 1
    },
    33: {
        group: 'left',
        direction: 'right',
        cord: {
            start: [1, 124],
            vector: [10, 6]
        },
		wayoutPath: 10,
        wayoutCurveCnt: 1
    },
    34: {
        group: 'middle',
        direction: 'left',
        cord: {
            start: [23, 33],
            vector: [10, 4]
        },
		wayoutPath: 27,
        wayoutCurveCnt: 1
    },
    35: {
        group: 'middle',
        direction: 'left',
        cord: {
            start: [23, 37],
            vector: [10, 5]
        },
		wayoutPath: 27,
        wayoutCurveCnt: 1
    },
    36: {
        group: 'middle',
        direction: 'left',
        cord: {
            start: [23, 42],
            vector: [10, 5]
        },
		wayoutPath: 26,
        wayoutCurveCnt: 1
    },
    37: {
        group: 'middle',
        direction: 'left',
        cord: {
            start: [23, 48],
            vector: [10, 4]
        },
		wayoutPath: 25,
        wayoutCurveCnt: 1
    },
    38: {
        group: 'middle',
        direction: 'left',
        cord: {
            start: [23, 52],
            vector: [10, 5]
        },
		wayoutPath: 24,
        wayoutCurveCnt: 1
    },
    39: {
        group: 'middle',
        direction: 'left',
        cord: {
            start: [23, 57],
            vector: [10, 5]
        },
		wayoutPath: 23,
        wayoutCurveCnt: 1
    },
    40: {
        group: 'middle',
        direction: 'left',
        cord: {
            start: [23, 63],
            vector: [10, 4]
        },
		wayoutPath: 22,
        wayoutCurveCnt: 1
    },
    41: {
        group: 'middle',
        direction: 'left',
        cord: {
            start: [23, 67],
            vector: [10, 5]
        },
		wayoutPath: 21,
        wayoutCurveCnt: 1
    },
    42: {
        group: 'middle',  
        direction: 'left',
        cord: {
            start: [23, 72],
            vector: [10, 5]
        },
		wayoutPath: 20,
        wayoutCurveCnt: 1
    },
    43: {
        group: 'middle',
        direction: 'left',
        cord: {
            start: [23, 78],
            vector: [10, 4]
        },
		wayoutPath: 19,
        wayoutCurveCnt: 1
    },
    44: {
        group: 'middle',
        direction: 'left',                                                                                                 
        cord: {
            start: [23, 82],
            vector: [10, 5]
        },
		wayoutPath: 18,
        wayoutCurveCnt: 1
    },
    45: {
        group: 'middle',
        direction: 'left',
        cord: {
            start: [23, 87],
            vector: [10, 5]
        },
		wayoutPath: 17,
        wayoutCurveCnt: 1
    },
    46: {
        group: 'middle',
        direction: 'left',
        cord: {
            start: [23, 93],
            vector: [10, 6]
        },
		wayoutPath: 15,
        wayoutCurveCnt: 1
    },
    47: {
        group: 'middle',
        direction: 'left',
        cord: {
            start: [23, 99],
            vector: [10, 6]
        },
		wayoutPath: 14,
        wayoutCurveCnt: 1
    },
    48: {
        group: 'middle',
        direction: 'left',
        cord: {
            start: [23, 106],
            vector: [10, 6]
        },
		wayoutPath: 13,
        wayoutCurveCnt: 1
    },
    49: {
        group: 'middle',
        direction: 'left',
        cord: {
            start: [23, 112],
            vector: [10, 5]
        },
		wayoutPath: 12,
        wayoutCurveCnt: 1
    },
    50: {
        group: 'bottom',
        direction: 'up',
        cord: {
            start: [11, 130],
            vector: [6, 10]
        },
		// wayoutPath: 10,
    },
    51: {
        group: 'bottom',
        direction: 'up',
        cord: {
            start: [17, 130],
            vector: [6, 10]
        },
		wayoutPath: 10,
        wayoutCurveCnt: 2
    },
    52: {
        group: 'bottom',
        direction: 'up',
        cord: {
            start: [24, 130],
            vector: [5, 10]
        },
		wayoutPath: 9,
        wayoutCurveCnt: 1
    },
    53: {
        group: 'bottom',
        direction: 'up',
        cord: {
            start: [29, 130],
            vector: [4, 10]
        },
		wayoutPath: 8,
        wayoutCurveCnt: 1
    },
    54: {
        group: 'bottom',
        direction: 'up',
        cord: {
            start: [34, 130],
            vector: [5, 10]
        },
		wayoutPath: 7,
        wayoutCurveCnt: 1
    },
    55: {
        group: 'bottom',
        direction: 'up',
        cord: {
            start: [39, 130],
            vector: [5, 10]
        },
		wayoutPath: 6,
        wayoutCurveCnt: 1
    },
    56: {
        group: 'bottom',
        direction: 'up',
        cord: {
            start: [45, 130],
            vector: [5, 10]
        },
		wayoutPath: 5,
        wayoutCurveCnt: 1
    },
    57: {
        group: 'bottom',
        direction: 'up',
        cord: {
            start: [50, 130],
            vector: [5, 10]
        },
		wayoutPath: 4,
        wayoutCurveCnt: 1
    },   
}

export default parkingAreaCords;