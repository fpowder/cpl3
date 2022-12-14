const path: { x:number, y: number, z: number, quadraticPath?: any[]} [] = [
    {x: 38.5, y: 0, z: 113.5},   // 1 entrance bifurcation (입구 분기점)
    {
        x: 42.5, y: 0, z: 121,
        quadraticPath: [
            {x: 38.5, y: 0, z: 113.5},
            {x: 38.5, y: 0, z: 121},
            {x: 42.5, y: 0, z: 121},
        ]
    },    // 2
    {x: 47.5, y: 0, z: 121},    // 3
    {
        x: 52.5, y: 0, z: 124,
        quadraticPath: [
            {x: 47.5, y: 0, z: 121},
            {x: 52.5, y: 0, z: 121},
            {x: 52.5, y: 0, z: 124},
        ]
    
    },    // 4
    {
        x: 47.5, y: 0, z: 127,
        quadraticPath: [
            {x: 52.5, y: 0, z: 124},
            {x: 52.5, y: 0, z: 127},
            {x: 47.5, y: 0, z: 127},
        ]
    },    // 5
    {x: 41.5, y: 0, z: 127},    // 6
    {x: 36.5, y: 0, z: 127},    // 7
    {x: 31,   y: 0, z: 127},    // 8
    {x: 26.5, y: 0, z: 127},    // 9
    {x: 20,   y: 0, z: 127},    // 10
    {
        x: 14,   y: 0, z: 121,
        quadraticPath: [
            {x: 20,   y: 0, z: 127},
            {x: 14,   y: 0, z: 127},
            {x: 14,   y: 0, z: 121},
        ]
    },    // 11
    {x: 14,   y: 0, z: 114.5},  // 12
    {x: 14,   y: 0, z: 109},    // 13
    {x: 14,   y: 0, z: 102},    // 14
    {x: 14,   y: 0, z: 96},     // 15
    {x: 14,   y: 0, z: 89.5},   // 16    
    {x: 14,   y: 0, z: 84.5},   // 17
    {x: 14,   y: 0, z: 80},     // 18
    {x: 14,   y: 0, z: 74.5},   // 19
    {x: 14,   y: 0, z: 69.5},   // 20
    {x: 14,   y: 0, z: 65},     // 21
    {x: 14,   y: 0, z: 59.5},   // 22
    {x: 14,   y: 0, z: 54.5},   // 23
    {x: 14,   y: 0, z: 50},     // 24
    {x: 14,   y: 0, z: 44.5},   // 25
    {x: 14,   y: 0, z: 39.5},   // 26
    {x: 14,   y: 0, z: 35},     // 27
    {x: 14,   y: 0, z: 29.5},   // 28
    {x: 14,   y: 0, z: 24.5},   // 29
    {x: 14,   y: 0, z: 19.5},   // 30
    // {x: 14,   y: 0, z: 15},     // 31
    
    {
        x: 20,   y: 0, z: 15,
        quadraticPath: [
            {x: 14,   y: 0, z: 19.5},
            {x: 14,   y: 0, z: 15},
            {x: 20,   y: 0, z: 15},
        ]
    },     // 31
    {x: 26.5, y: 0, z: 15},     // 32
    {x: 31.5, y: 0, z: 15},     // 33
    {x: 37.5, y: 0, z: 15},     // 34
    {
        x: 43.5, y: 0, z: 19.5,
        quadraticPath: [
            {x: 37.5,   y: 0, z: 15},
            {x: 43.5,   y: 0, z: 15},
            {x: 43.5,   y: 0, z: 19.5},
        ]
    },   // 35
    {x: 43.5, y: 0, z: 24.5},   // 36
    {    // 37 exit bifurcation (출구 분기점) 출구 좌표 { x: 38.5, y: 41.5 }
        x: 38.5, y: 0, z: 29.5,
        quadraticPath: [
            {x: 43.5, y: 0, z: 24.5},
            {x: 43.5,   y: 0, z: 29.5},
            {x: 38.5,   y: 0, z: 29.5},
        ]
    },   
    {
        x: 31.5, y: 0, z: 27.5,
        quadraticPath: [
            {x: 38.5,   y: 0, z: 29.5},
            {x: 31.5,   y: 0, z: 29.5},
            {x: 31.5,   y: 0, z: 27.5},
        ]
    },   // 38
    {
        x: 25,   y: 0, z: 22.5,
        quadraticPath: [
            {x: 31.5,   y: 0, z: 27.5},
            {x: 31.5,   y: 0, z: 22.5},
            {x: 25,   y: 0, z: 22.5},
        ]
    },   // 39
    {
        x: 20,   y: 0, z: 35,
        quadraticPath: [
            {x: 25,   y: 0, z: 22.5},
            {x: 20,   y: 0, z: 22.5},
            {x: 20,   y: 0, z: 35},
        ]
    },     // 40
    {x: 20,   y: 0, z: 39.5},   // 41
    {x: 20,   y: 0, z: 44.5},   // 42
    {x: 20,   y: 0, z: 50},     // 43
    {x: 20,   y: 0, z: 54.5},   // 44
    {x: 20,   y: 0, z: 59.5},   // 45
    {x: 20,   y: 0, z: 65},     // 46
    {x: 20,   y: 0, z: 69.5},   // 57
    {x: 20,   y: 0, z: 74.5},   // 58
    {x: 20,   y: 0, z: 80},     // 59
    {x: 20,   y: 0, z: 84.5},   // 60
    {x: 20,   y: 0, z: 89.5},   // 61
    {x: 20,   y: 0, z: 96},     // 62
    {x: 20,   y: 0, z: 102},    // 63
    {x: 20,   y: 0, z: 109},    // 64
    {x: 20,   y: 0, z: 114.5},  // 65
    {x: 20,   y: 0, z: 119},    // 66
    {
        x: 28,   y: 0, z: 121,
        quadraticPath: [
            {x: 20,   y: 0, z: 119},
            {x: 20,   y: 0, z: 121},
            {x: 28,   y: 0, z: 121},
        ]
    },    // 66
    {x: 42.5, y: 0, z: 121}
];

export default path;