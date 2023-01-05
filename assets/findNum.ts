
export default function findNum (aList: Array<number>, bList: Array<number>, targetNum: number): boolean {
    let findTag = false;

    for (let i = 0; i < aList.length; ++i) {
        let num = targetNum - aList[i];
        if (bList.indexOf(num) !== -1) {
            findTag = true;
            console.log(i + "---" + bList.indexOf(num))
            break;
        }

    }

    return findTag;
}

// O(n);