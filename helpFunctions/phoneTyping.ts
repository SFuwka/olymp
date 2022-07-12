

export const handlePhoneTyping = (value: string, prev: string) => {
    const phoneRegex = /^([+]?\d)\D*(\d{0,3})\D*(\d{0,3})\D*(\d{0,2})\D*(\d{0,2})$/
    let res = ''
    let curLen = value.length
    let prevLen = prev.length
    if (!value.charAt(value.length - 1).match(/[0-9+]/) && value.length === 1) return prev
    if (value.startsWith('+') && curLen > 18) return prev
    if (!value.startsWith('+') && curLen > 17) return prev
    return value.replace(phoneRegex, function (_, g1, g2, g3, g4, g5) {
        if (g1.length) {
            res += g1 + ' ('
            if (curLen < prev.length && curLen < 4) {
                res = g1
            }
            if (g2.length) {
                res += g2
                if (g2.length === 3 && (curLen > prevLen || g3.length)) {
                    res += ') '
                } else res = g1 + ' (' + g2
                if (g3.length) {
                    res += g3
                    if (g3.length === 3 && (curLen > prevLen || g4.length)) {
                        res += ' '
                    }
                    if (g4.length) {
                        res += g4
                        if (g4.length === 2 && (curLen > prevLen || g5.length)) {
                            res += ' '
                        }
                        if (g5.length) {
                            res += g5
                            if (g5.length === 2 && curLen > prevLen) {
                                res += ''
                            }
                        }
                    }
                }
            } else {
                if (curLen < prev.length) {
                    res = g1
                } else res = g1 + ' ('
            }
        }
        return res
    })
}