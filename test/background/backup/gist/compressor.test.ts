import { devide2Buckets, gistData2Rows } from "@src/common/backup/gist/compressor"

test('devide 1', () => {
    const rows: timer.stat.Row[] = [{
        host: 'www.baidu.com',
        date: '20220801',
        focus: 0,
        time: 10,
        mergedHosts: []
    }, {
        host: 'www.baidu.com',
        // Invalid date, count be compress
        date: '',
        focus: 0,
        time: 10,
        mergedHosts: []
    }]
    const devided = devide2Buckets(rows)
    expect(devided.length).toEqual(1)
    const [bucket, gistData] = devided[0]
    expect(bucket).toEqual('202208')
    const expectData: GistData = {
        "01": {
            "www.baidu.com": [10, 0]
        }
    }
    expect(gistData).toEqual(expectData)
})

test('gistData2Rows', () => {
    const gistData: GistData = {
        '01': {
            'baidu.com': [0, 1]
        },
        '08': {
            'google.com': [1, 1]
        }
    }
    const rows = gistData2Rows('202209', gistData)
    expect(rows.length).toEqual(2)
    rows.sort((a, b) => a.date > b.date ? 1 : -1)
    const row0 = rows[0]
    const row1 = rows[1]
    expect(row0.date).toEqual('20220901')
    expect(row0.time).toEqual(0)
    expect(row0.focus).toEqual(1)

    expect(row1.date).toEqual('20220908')
    expect(row1.time).toEqual(1)
    expect(row1.focus).toEqual(1)
})