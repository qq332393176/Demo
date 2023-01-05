
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Main.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6d1cdMS7HJAmY2lFlCe9A9R', 'Main');
// Main.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inputX = null;
        _this.inputY = null;
        _this.btnPlay = null;
        _this.cellLayout = null;
        _this.cellItem = null;
        _this.xNum = 0;
        _this.yNum = 0;
        _this.cellList = [[]];
        _this.colorList = [];
        return _this;
    }
    NewClass.prototype.onLoad = function () {
        this.colorList = [cc.color(255, 0, 0), cc.color(0, 255, 0), cc.color(0, 0, 255), cc.color(255, 255, 0), cc.color(0, 255, 255)];
        this.btnPlay.on(cc.Node.EventType.TOUCH_START, this.onBtnTouchBegan, this);
        this.btnPlay.on(cc.Node.EventType.TOUCH_END, this.onBtnTouchEnd, this);
        this.btnPlay.on(cc.Node.EventType.TOUCH_CANCEL, this.onBtnTouchEnd, this);
    };
    NewClass.prototype.showBtn = function () {
        var _this = this;
        cc.tween(this.btnPlay).
            set({ scale: 0 }).
            to(0.1, { scaleX: 1.3, scaleY: 0.9 }).
            to(0.1, { scaleX: 0.9, scaleY: 1.1 }).
            to(0.1, { scaleX: 1, scaleY: 1 }).
            delay(0).
            call(function () {
            cc.tween(_this.btnPlay).
                repeatForever(cc.tween(_this.btnPlay).
                to(0.3, { scaleX: 1.1, scaleY: 0.9 }).
                to(0.3, { scaleX: 1, scaleY: 1 })).
                start();
        }).start();
    };
    NewClass.prototype.createCell = function () {
        for (var i = 0; i < 100; ++i) {
            var child = this.cellLayout.children[i];
            if (!child) {
                child = cc.instantiate(this.cellItem);
                child.parent = this.cellLayout;
                child.position = cc.Vec3.ZERO;
            }
            var x = Math.floor(i / 10);
            var y = i % 10;
            if (!this.cellList[x]) {
                this.cellList[x] = [];
            }
            var color = this.randomColor(x, y);
            child.color = color;
            this.cellList[x][y] = {
                cell: child,
                pos: cc.v2(x + 1, y + 1),
                color: color,
            };
        }
    };
    NewClass.prototype.randomColor = function (x, y) {
        var color = this.colorList[0];
        if (x === 0 && y === 0) {
            return this.colorList[Math.floor(Math.random() * 5)];
        }
        var up = this.cellList[x][y - 1];
        var left = this.cellList[x - 1] && this.cellList[x - 1][y];
        var opt = [0, 0, 0, 0, 0];
        var totle = 0;
        if (up) {
            var index = this.colorList.indexOf(up.color);
            opt[index] = opt[index] + this.xNum / 100;
            if (opt[index]) {
                totle += 1;
            }
        }
        if (left) {
            var index = this.colorList.indexOf(left.color);
            opt[index] = opt[index] + this.xNum / 100;
            if (opt[index]) {
                totle += 1;
            }
        }
        if (up && left && up.color === left.color) {
            var index = this.colorList.indexOf(left.color);
            opt[index] = opt[index] + this.yNum / 100;
            if (opt[index]) {
                totle += 1;
            }
        }
        var haveP = 0;
        for (var i = 0; i < opt.length; ++i) {
            if (opt[i] > 0) {
                haveP += opt[i];
            }
        }
        if (haveP > 1)
            haveP = 1;
        var t = 0, num = Math.random();
        for (var i = 0; i < 5; ++i) {
            if (opt[i]) {
                t = t + opt[i];
            }
            else {
                t = t + (1 - haveP) / (5 - totle);
            }
            if (t > num) {
                color = this.colorList[i];
                break;
            }
        }
        return color;
    };
    NewClass.prototype.onBtnTouchBegan = function () {
        var _this = this;
        cc.tween(this.btnPlay).stop();
        cc.tween(this.btnPlay).
            set({ color: cc.color(119, 119, 119) }).
            to(0.02, { scale: 0.8 }).call(function () {
            cc.tween(_this.btnPlay).repeatForever(cc.tween(_this.btnPlay).
                to(0.3, { scaleX: 1.1 * .8, scaleY: 0.9 * .8 }).
                to(0.3, { scaleX: 1 * .8, scaleY: 1 * .8 })).
                start();
        }).start();
    };
    NewClass.prototype.onBtnTouchEnd = function () {
        var _this = this;
        cc.tween(this.btnPlay).stop();
        cc.tween(this.btnPlay).
            set({ color: cc.color(255, 255, 255) }).
            to(0.02, { scale: 1 }).call(function () {
            cc.tween(_this.btnPlay).repeatForever(cc.tween(_this.btnPlay).
                to(0.3, { scaleX: 1.1, scaleY: 0.9 }).
                to(0.3, { scaleX: 1, scaleY: 1 })).
                start();
        }).start();
    };
    NewClass.prototype.onXEditBoxChange = function (text, editbox) {
        var strP = /^\d+(\.\d+)?$/;
        text.replace(strP, "");
        editbox.string = text;
        this.xNum = Number(editbox.string);
    };
    NewClass.prototype.onXEditBoxEnd = function (editbox) {
        this.xNum = Number(editbox.string);
    };
    NewClass.prototype.onYEditBoxChange = function (text, editbox) {
        var strP = /^\d+(\.\d+)?$/;
        if (!strP.test(text)) {
            text = "";
        }
        this.yNum = Number(editbox.string);
    };
    NewClass.prototype.onYEditBoxEnd = function (editbox) {
        this.yNum = Number(editbox.string);
    };
    NewClass.prototype.onGenerateClick = function () {
        this.createCell();
        // this.showBtn();
        // findNum([10, 40, 5, 280], [234, 5, 2, 148, 23], 42);
    };
    __decorate([
        property(cc.EditBox)
    ], NewClass.prototype, "inputX", void 0);
    __decorate([
        property(cc.EditBox)
    ], NewClass.prototype, "inputY", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "btnPlay", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "cellLayout", void 0);
    __decorate([
        property(cc.Prefab)
    ], NewClass.prototype, "cellItem", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZpbmROdW0gZnJvbSBcIi4vZmluZE51bVwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5pbnRlcmZhY2UgSUNlbGxJbmZvIHtcbiAgICBjb2xvcjogY2MuQ29sb3I7XG4gICAgcG9zOiBjYy5WZWMyO1xuICAgIGNlbGw6IGNjLk5vZGU7XG59XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOZXdDbGFzcyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuRWRpdEJveClcbiAgICBwdWJsaWMgaW5wdXRYOiBjYy5FZGl0Qm94ID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuRWRpdEJveClcbiAgICBwdWJsaWMgaW5wdXRZOiBjYy5FZGl0Qm94ID0gbnVsbDtcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBwdWJsaWMgYnRuUGxheTogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBwdWJsaWMgY2VsbExheW91dDogY2MuTm9kZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuUHJlZmFiKVxuICAgIHB1YmxpYyBjZWxsSXRlbTogY2MuUHJlZmFiID0gbnVsbDtcblxuICAgIHByaXZhdGUgeE51bTogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIHlOdW06IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSBjZWxsTGlzdDogQXJyYXk8QXJyYXk8SUNlbGxJbmZvPj4gPSBbW11dO1xuICAgIHByaXZhdGUgY29sb3JMaXN0OiBBcnJheTxjYy5Db2xvcj4gPSBbXTtcblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIHRoaXMuY29sb3JMaXN0ID0gW2NjLmNvbG9yKDI1NSwgMCwgMCksIGNjLmNvbG9yKDAsIDI1NSwgMCksIGNjLmNvbG9yKDAsIDAsIDI1NSksIGNjLmNvbG9yKDI1NSwgMjU1LCAwKSwgY2MuY29sb3IoMCwgMjU1LCAyNTUpXTtcblxuICAgICAgICB0aGlzLmJ0blBsYXkub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMub25CdG5Ub3VjaEJlZ2FuLCB0aGlzKTtcbiAgICAgICAgdGhpcy5idG5QbGF5Lm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vbkJ0blRvdWNoRW5kLCB0aGlzKTtcbiAgICAgICAgdGhpcy5idG5QbGF5Lm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0NBTkNFTCwgdGhpcy5vbkJ0blRvdWNoRW5kLCB0aGlzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNob3dCdG4gKCk6IHZvaWQge1xuICAgICAgICBjYy50d2Vlbih0aGlzLmJ0blBsYXkpLlxuICAgICAgICAgICAgc2V0KHsgc2NhbGU6IDAgfSkuXG4gICAgICAgICAgICB0bygwLjEsIHsgc2NhbGVYOiAxLjMsIHNjYWxlWTogMC45IH0pLlxuICAgICAgICAgICAgdG8oMC4xLCB7IHNjYWxlWDogMC45LCBzY2FsZVk6IDEuMSB9KS5cbiAgICAgICAgICAgIHRvKDAuMSwgeyBzY2FsZVg6IDEsIHNjYWxlWTogMSB9KS5cbiAgICAgICAgICAgIGRlbGF5KDApLlxuICAgICAgICAgICAgY2FsbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY2MudHdlZW4odGhpcy5idG5QbGF5KS5cbiAgICAgICAgICAgICAgICAgICAgcmVwZWF0Rm9yZXZlcihcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMuYnRuUGxheSkuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8oMC4zLCB7IHNjYWxlWDogMS4xLCBzY2FsZVk6IDAuOSB9KS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0bygwLjMsIHsgc2NhbGVYOiAxLCBzY2FsZVk6IDEgfSkpLlxuICAgICAgICAgICAgICAgICAgICBzdGFydCgpXG5cbiAgICAgICAgICAgIH0pLnN0YXJ0KCk7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUNlbGwgKCk6IHZvaWQge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgKytpKSB7XG4gICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLmNlbGxMYXlvdXQuY2hpbGRyZW5baV07XG4gICAgICAgICAgICBpZiAoIWNoaWxkKSB7XG4gICAgICAgICAgICAgICAgY2hpbGQgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmNlbGxJdGVtKTtcbiAgICAgICAgICAgICAgICBjaGlsZC5wYXJlbnQgPSB0aGlzLmNlbGxMYXlvdXQ7XG4gICAgICAgICAgICAgICAgY2hpbGQucG9zaXRpb24gPSBjYy5WZWMzLlpFUk87XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCB4ID0gTWF0aC5mbG9vcihpIC8gMTApO1xuICAgICAgICAgICAgbGV0IHkgPSBpICUgMTA7XG4gICAgICAgICAgICBpZiAoIXRoaXMuY2VsbExpc3RbeF0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNlbGxMaXN0W3hdID0gW107XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBjb2xvciA9IHRoaXMucmFuZG9tQ29sb3IoeCwgeSk7XG4gICAgICAgICAgICBjaGlsZC5jb2xvciA9IGNvbG9yO1xuXG4gICAgICAgICAgICB0aGlzLmNlbGxMaXN0W3hdW3ldID0ge1xuICAgICAgICAgICAgICAgIGNlbGw6IGNoaWxkLFxuICAgICAgICAgICAgICAgIHBvczogY2MudjIoeCArIDEsIHkgKyAxKSxcbiAgICAgICAgICAgICAgICBjb2xvcixcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSByYW5kb21Db2xvciAoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBjYy5Db2xvciB7XG4gICAgICAgIGxldCBjb2xvciA9IHRoaXMuY29sb3JMaXN0WzBdO1xuICAgICAgICBpZiAoeCA9PT0gMCAmJiB5ID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb2xvckxpc3RbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNSldO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHVwID0gdGhpcy5jZWxsTGlzdFt4XVt5IC0gMV07XG4gICAgICAgIGxldCBsZWZ0ID0gdGhpcy5jZWxsTGlzdFt4IC0gMV0gJiYgdGhpcy5jZWxsTGlzdFt4IC0gMV1beV07XG4gICAgICAgIGxldCBvcHQgPSBbMCwgMCwgMCwgMCwgMF07XG4gICAgICAgIGxldCB0b3RsZSA9IDA7XG5cbiAgICAgICAgaWYgKHVwKSB7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmNvbG9yTGlzdC5pbmRleE9mKHVwLmNvbG9yKTtcbiAgICAgICAgICAgIG9wdFtpbmRleF0gPSBvcHRbaW5kZXhdICsgdGhpcy54TnVtIC8gMTAwO1xuICAgICAgICAgICAgaWYgKG9wdFtpbmRleF0pIHtcbiAgICAgICAgICAgICAgICB0b3RsZSArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxlZnQpIHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuY29sb3JMaXN0LmluZGV4T2YobGVmdC5jb2xvcik7XG4gICAgICAgICAgICBvcHRbaW5kZXhdID0gb3B0W2luZGV4XSArIHRoaXMueE51bSAvIDEwMDtcbiAgICAgICAgICAgIGlmIChvcHRbaW5kZXhdKSB7XG4gICAgICAgICAgICAgICAgdG90bGUgKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1cCAmJiBsZWZ0ICYmIHVwLmNvbG9yID09PSBsZWZ0LmNvbG9yKSB7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmNvbG9yTGlzdC5pbmRleE9mKGxlZnQuY29sb3IpO1xuICAgICAgICAgICAgb3B0W2luZGV4XSA9IG9wdFtpbmRleF0gKyB0aGlzLnlOdW0gLyAxMDA7XG4gICAgICAgICAgICBpZiAob3B0W2luZGV4XSkge1xuICAgICAgICAgICAgICAgIHRvdGxlICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaGF2ZVAgPSAwO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdC5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaWYgKG9wdFtpXSA+IDApIHtcbiAgICAgICAgICAgICAgICBoYXZlUCArPSBvcHRbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaGF2ZVAgPiAxKSBoYXZlUCA9IDE7XG5cblxuICAgICAgICBsZXQgdCA9IDAsIG51bSA9IE1hdGgucmFuZG9tKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgKytpKSB7XG4gICAgICAgICAgICBpZiAob3B0W2ldKSB7XG4gICAgICAgICAgICAgICAgdCA9IHQgKyBvcHRbaV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHQgPSB0ICsgKDEgLSBoYXZlUCkgLyAoNSAtIHRvdGxlKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodCA+IG51bSkge1xuICAgICAgICAgICAgICAgIGNvbG9yID0gdGhpcy5jb2xvckxpc3RbaV1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cblxuICAgICAgICByZXR1cm4gY29sb3I7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uQnRuVG91Y2hCZWdhbiAoKTogdm9pZCB7XG4gICAgICAgIGNjLnR3ZWVuKHRoaXMuYnRuUGxheSkuc3RvcCgpO1xuICAgICAgICBjYy50d2Vlbih0aGlzLmJ0blBsYXkpLlxuICAgICAgICAgICAgc2V0KHsgY29sb3I6IGNjLmNvbG9yKDExOSwgMTE5LCAxMTkpIH0pLlxuICAgICAgICAgICAgdG8oMC4wMiwgeyBzY2FsZTogMC44IH0pLmNhbGwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMuYnRuUGxheSkucmVwZWF0Rm9yZXZlcihcbiAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4odGhpcy5idG5QbGF5KS5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRvKDAuMywgeyBzY2FsZVg6IDEuMSAqIC44LCBzY2FsZVk6IDAuOSAqIC44IH0pLlxuICAgICAgICAgICAgICAgICAgICAgICAgdG8oMC4zLCB7IHNjYWxlWDogMSAqIC44LCBzY2FsZVk6IDEgKiAuOCB9KSkuXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0KCk7XG4gICAgICAgICAgICB9KS5zdGFydCgpO1xuXG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uQnRuVG91Y2hFbmQgKCk6IHZvaWQge1xuICAgICAgICBjYy50d2Vlbih0aGlzLmJ0blBsYXkpLnN0b3AoKTtcbiAgICAgICAgY2MudHdlZW4odGhpcy5idG5QbGF5KS5cbiAgICAgICAgICAgIHNldCh7IGNvbG9yOiBjYy5jb2xvcigyNTUsIDI1NSwgMjU1KSB9KS5cbiAgICAgICAgICAgIHRvKDAuMDIsIHsgc2NhbGU6IDEgfSkuY2FsbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY2MudHdlZW4odGhpcy5idG5QbGF5KS5yZXBlYXRGb3JldmVyKFxuICAgICAgICAgICAgICAgICAgICBjYy50d2Vlbih0aGlzLmJ0blBsYXkpLlxuICAgICAgICAgICAgICAgICAgICAgICAgdG8oMC4zLCB7IHNjYWxlWDogMS4xLCBzY2FsZVk6IDAuOSB9KS5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRvKDAuMywgeyBzY2FsZVg6IDEsIHNjYWxlWTogMSB9KSkuXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0KCk7XG4gICAgICAgICAgICB9KS5zdGFydCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblhFZGl0Qm94Q2hhbmdlICh0ZXh0OiBzdHJpbmcsIGVkaXRib3g6IGNjLkVkaXRCb3gpOiB2b2lkIHtcbiAgICAgICAgbGV0IHN0clAgPSAvXlxcZCsoXFwuXFxkKyk/JC87XG4gICAgICAgIHRleHQucmVwbGFjZShzdHJQLCBcIlwiKTtcbiAgICAgICAgZWRpdGJveC5zdHJpbmcgPSB0ZXh0O1xuXG4gICAgICAgIHRoaXMueE51bSA9IE51bWJlcihlZGl0Ym94LnN0cmluZyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uWEVkaXRCb3hFbmQgKGVkaXRib3g6IGNjLkVkaXRCb3gpOiB2b2lkIHtcblxuICAgICAgICB0aGlzLnhOdW0gPSBOdW1iZXIoZWRpdGJveC5zdHJpbmcpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbllFZGl0Qm94Q2hhbmdlICh0ZXh0OiBzdHJpbmcsIGVkaXRib3g6IGNjLkVkaXRCb3gpOiB2b2lkIHtcbiAgICAgICAgbGV0IHN0clAgPSAvXlxcZCsoXFwuXFxkKyk/JC87XG4gICAgICAgIGlmICghc3RyUC50ZXN0KHRleHQpKSB7XG4gICAgICAgICAgICB0ZXh0ID0gXCJcIjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnlOdW0gPSBOdW1iZXIoZWRpdGJveC5zdHJpbmcpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbllFZGl0Qm94RW5kIChlZGl0Ym94OiBjYy5FZGl0Qm94KTogdm9pZCB7XG4gICAgICAgIHRoaXMueU51bSA9IE51bWJlcihlZGl0Ym94LnN0cmluZyk7XG4gICAgfVxuXG5cbiAgICBwcm90ZWN0ZWQgb25HZW5lcmF0ZUNsaWNrICgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jcmVhdGVDZWxsKCk7XG5cbiAgICAgICAgLy8gdGhpcy5zaG93QnRuKCk7XG5cbiAgICAgICAgLy8gZmluZE51bShbMTAsIDQwLCA1LCAyODBdLCBbMjM0LCA1LCAyLCAxNDgsIDIzXSwgNDIpO1xuICAgIH1cblxufSJdfQ==