
const parts = [{
    name: 'day 4, part 1',

    workloads: [{
        path: 'day4/sample.csv',
        output: 2
    },{
        path: 'day4/full.csv',
        output: 233
    }],

    run: async (input) => {
        input = input.split('\n\n')
        const records = input.map(record => {
            const parts = record.replace(/\n/g, ' ').split(' ')
            const parsedRecord = {}
            parts.forEach(part => {
                const split = part.split(':')
                parsedRecord[split[0]] = split[1]
            })
            return parsedRecord
        })

        return records.filter(record => {
            return record['byr'] && record['iyr'] && record['eyr'] &&
                record['hgt'] && record['hcl'] && record['ecl'] && record['pid']
        }).length
    }
},{
    name: 'day 4, part 2',

    workloads: [{
        path: 'day4/sample_2.csv',
        output: 4
    },{
        path: 'day4/full.csv',
        output: 111
    }],
    
    run: async (input) => {
        input = input.split('\n\n')

        const records = input.map(record => {
            const parts = record.split(/\n|\s/)
            const parsedRecord = {}
            parts.forEach(part => {
                const split = part.split(':')
                parsedRecord[split[0]] = split[1]
            })
            return parsedRecord
        })

        const validations = {
            byr: value => {
                const val = parseInt(value)
                return 1920 <= val && val <= 2002
            },
            iyr: value => {
                const val = parseInt(value)
                return 2010 <= val && val <= 2020
            },
            eyr: value => {
                const val = parseInt(value)
                return 2020 <= val && val <= 2030
            },
            hgt: value => {
                if (value.endsWith('in')) {
                    const val = parseInt(value.substring(0, value.length-2))
                    return 59 <= val && val <= 76
                } else if (value.endsWith('cm')) {
                    const val = parseInt(value.substring(0, value.length-2))
                    return 150 <= val && val <= 193
                }

                return false
            },
            hcl: value => {
                return /^#[0-9a-z]{6,6}$/.test(value)
            },
            ecl: value => {
                return value == 'amb' || value == 'blu' || value == 'brn' ||
                    value == 'gry' || value == 'grn' || value == 'hzl' || value == 'oth'
            },
            pid: value => {
                return /^[0-9]{9,9}$/.test(value)
            }
        }

        return records.filter(record => {
            let matches = 0
            for (const [key, validation] of Object.entries(validations)) {
                if (record[key] && validation(record[key])) {
                    matches += 1
                }
            }
            return matches === 7
        }).length
    }
}]

export default parts