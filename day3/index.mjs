
const calculateTreesHit = (slope, mx, my) => {
    let x = mx
    let treesHit = 0
    for (let y = my; y<slope.length; y += my) {

        if (slope[y].charAt(x) === '#') {
            treesHit += 1
        }

        x += mx

        if (x >= slope[y].length) {
            x -= slope[y].length
        }
    }

    return treesHit
}

const parts = [{
    name: 'day 3, part 1',

    workloads: [{
        path: 'day3/sample.csv',
        output: 7
    },{
        path: 'day3/full.csv',
        output: 176
    }],

    run: async (input) => {
        const slope = input.split('\n')
        return calculateTreesHit(slope, 3, 1)
    }
},{
    name: 'day 3, part 2',

    workloads: [{
        path: 'day3/sample.csv',
        output: 336
    },{
        path: 'day3/full.csv',
        output: 5872458240
    }],
    
    run: async (input) => {
        const slope = input.split('\n')
        const paces = [
            [1, 1],
            [3, 1],
            [5, 1],
            [7, 1],
            [1, 2]
        ]
    
        const treesHit = paces.map(pace => {
            return calculateTreesHit(slope, pace[0], pace[1])
        })
    
        return treesHit.reduce((product, treesHitOnSlope) => {
            return product * treesHitOnSlope
        })
    }
}]

export default parts