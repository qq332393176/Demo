"use strict";
cc._RF.push(module, 'a4181Z5gkpACrdqSYMkLhdi', 'findNum');
// findNum.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function findNum(aList, bList, targetNum) {
    var findTag = false;
    for (var i = 0; i < aList.length; ++i) {
        var num = targetNum - aList[i];
        if (bList.indexOf(num) !== -1) {
            findTag = true;
            console.log(i + "---" + bList.indexOf(num));
            break;
        }
    }
    return findTag;
}
exports.default = findNum;
// O(n);

cc._RF.pop();