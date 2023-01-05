"use strict";
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