
import { promises } from 'fs';

import _ from 'lodash';

export const part1 = async () => {

    // Source
    //const sourcePath = './sample'
    const sourcePath = './full'

    const input = _.split(await(promises.readFile(new URL(`${sourcePath}.csv`, import.meta.url), 'utf-8')), '\n\n')
    const records = _.map(input, (record) => {
        const parts = _.split(_.replace(record, /\n/g, ' '), ' ')
        const pairs = _.map(parts, (part) => {
            return _.split(part, ':')
        })

        return _.fromPairs(pairs)
    })

    const validPassports = _.filter(records, (record) => {
        return _.has(record, 'byr') && _.has(record, 'iyr') && _.has(record, 'eyr') &&
            _.has(record, 'hgt') && _.has(record, 'hcl') && _.has(record, 'ecl') && _.has(record, 'pid')
    })
    
    process.stdout.write(`day 4, part 1: ${validPassports.length} `)

    const key = parseInt(await(promises.readFile(new URL(`${sourcePath}.1.key`, import.meta.url), 'utf-8')))
    if (key === validPassports.length) {
        console.log("✅")
    } else {
        console.log("❌")
    }
}

export const part2 = async () => {

    // Source
    //const sourcePath = './sample_2'
    const sourcePath = './full'

    const input = _.split(await(promises.readFile(new URL(`${sourcePath}.csv`, import.meta.url), 'utf-8')), '\n\n')
    const records = _.map(input, (record) => {
        const parts = _.split(record, /\n|\s/)
        const pairs = _.map(parts, (part) => {
            return _.split(part, ':')
        })

        return _.fromPairs(pairs)
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
                const val = parseInt(_.trimEnd(value, 'in'))
                return 59 <= val && val <= 76
            } else if (value.endsWith('cm')) {
                const val = parseInt(_.trimEnd(value, 'cm'))
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

    const validPassports = _.filter(records, record => {
        let matches = 0
        for (const [key, validation] of Object.entries(validations)) {
            if (record[key] && validation(record[key])) {
                matches += 1
            }
        }
        return matches === 7
    })
    
    process.stdout.write(`day 4, part 2: ${validPassports.length} `)

    const key = parseInt(await(promises.readFile(new URL(`${sourcePath}.2.key`, import.meta.url), 'utf-8')))
    if (key === validPassports.length) {
        console.log("✅")
    } else {
        console.log("❌")
    }
}