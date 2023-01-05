
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/findNum.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZmluZE51bS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLFNBQXdCLE9BQU8sQ0FBRSxLQUFvQixFQUFFLEtBQW9CLEVBQUUsU0FBaUI7SUFDMUYsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBRXBCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFO1FBQ25DLElBQUksR0FBRyxHQUFHLFNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQzNCLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1lBQzNDLE1BQU07U0FDVDtLQUVKO0lBRUQsT0FBTyxPQUFPLENBQUM7QUFDbkIsQ0FBQztBQWRELDBCQWNDO0FBRUQsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmaW5kTnVtIChhTGlzdDogQXJyYXk8bnVtYmVyPiwgYkxpc3Q6IEFycmF5PG51bWJlcj4sIHRhcmdldE51bTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICBsZXQgZmluZFRhZyA9IGZhbHNlO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYUxpc3QubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICBsZXQgbnVtID0gdGFyZ2V0TnVtIC0gYUxpc3RbaV07XHJcbiAgICAgICAgaWYgKGJMaXN0LmluZGV4T2YobnVtKSAhPT0gLTEpIHtcclxuICAgICAgICAgICAgZmluZFRhZyA9IHRydWU7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGkgKyBcIi0tLVwiICsgYkxpc3QuaW5kZXhPZihudW0pKVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBmaW5kVGFnO1xyXG59XHJcblxyXG4vLyBPKG4pOyJdfQ==