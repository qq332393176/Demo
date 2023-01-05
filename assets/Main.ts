import findNum from "./findNum";

const { ccclass, property } = cc._decorator;

interface ICellInfo {
    color: cc.Color;
    pos: cc.Vec2;
    cell: cc.Node;
}

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.EditBox)
    public inputX: cc.EditBox = null;
    @property(cc.EditBox)
    public inputY: cc.EditBox = null;
    @property(cc.Node)
    public btnPlay: cc.Node = null;

    @property(cc.Node)
    public cellLayout: cc.Node = null;

    @property(cc.Prefab)
    public cellItem: cc.Prefab = null;

    private xNum: number = 0;
    private yNum: number = 0;
    private cellList: Array<Array<ICellInfo>> = [[]];
    private colorList: Array<cc.Color> = [];

    onLoad () {
        this.colorList = [cc.color(255, 0, 0), cc.color(0, 255, 0), cc.color(0, 0, 255), cc.color(255, 255, 0), cc.color(0, 255, 255)];

        this.btnPlay.on(cc.Node.EventType.TOUCH_START, this.onBtnTouchBegan, this);
        this.btnPlay.on(cc.Node.EventType.TOUCH_END, this.onBtnTouchEnd, this);
        this.btnPlay.on(cc.Node.EventType.TOUCH_CANCEL, this.onBtnTouchEnd, this);
    }

    private showBtn (): void {
        cc.tween(this.btnPlay).
            set({ scale: 0 }).
            to(0.1, { scaleX: 1.3, scaleY: 0.9 }).
            to(0.1, { scaleX: 0.9, scaleY: 1.1 }).
            to(0.1, { scaleX: 1, scaleY: 1 }).
            delay(0).
            call(() => {
                cc.tween(this.btnPlay).
                    repeatForever(
                        cc.tween(this.btnPlay).
                            to(0.3, { scaleX: 1.1, scaleY: 0.9 }).
                            to(0.3, { scaleX: 1, scaleY: 1 })).
                    start()

            }).start();

    }

    private createCell (): void {
        for (let i = 0; i < 100; ++i) {
            let child = this.cellLayout.children[i];
            if (!child) {
                child = cc.instantiate(this.cellItem);
                child.parent = this.cellLayout;
                child.position = cc.Vec3.ZERO;
            }

            let x = Math.floor(i / 10);
            let y = i % 10;
            if (!this.cellList[x]) {
                this.cellList[x] = [];
            }

            let color = this.randomColor(x, y);
            child.color = color;

            this.cellList[x][y] = {
                cell: child,
                pos: cc.v2(x + 1, y + 1),
                color,
            }
        }

    }

    private randomColor (x: number, y: number): cc.Color {
        let color = this.colorList[0];
        if (x === 0 && y === 0) {
            return this.colorList[Math.floor(Math.random() * 5)];
        }

        let up = this.cellList[x][y - 1];
        let left = this.cellList[x - 1] && this.cellList[x - 1][y];
        let opt = [0, 0, 0, 0, 0];
        let totle = 0;

        if (up) {
            let index = this.colorList.indexOf(up.color);
            opt[index] = opt[index] + this.xNum / 100;
            if (opt[index]) {
                totle += 1;
            }
        }

        if (left) {
            let index = this.colorList.indexOf(left.color);
            opt[index] = opt[index] + this.xNum / 100;
            if (opt[index]) {
                totle += 1;
            }
        }

        if (up && left && up.color === left.color) {
            let index = this.colorList.indexOf(left.color);
            opt[index] = opt[index] + this.yNum / 100;
            if (opt[index]) {
                totle += 1;
            }
        }

        let haveP = 0;
        for (let i = 0; i < opt.length; ++i) {
            if (opt[i] > 0) {
                haveP += opt[i];
            }
        }

        if (haveP > 1) haveP = 1;


        let t = 0, num = Math.random();
        for (let i = 0; i < 5; ++i) {
            if (opt[i]) {
                t = t + opt[i];
            } else {
                t = t + (1 - haveP) / (5 - totle)
            }

            if (t > num) {
                color = this.colorList[i]
                break;
            }
        }



        return color;
    }

    protected onBtnTouchBegan (): void {
        cc.tween(this.btnPlay).stop();
        cc.tween(this.btnPlay).
            set({ color: cc.color(119, 119, 119) }).
            to(0.02, { scale: 0.8 }).call(() => {
                cc.tween(this.btnPlay).repeatForever(
                    cc.tween(this.btnPlay).
                        to(0.3, { scaleX: 1.1 * .8, scaleY: 0.9 * .8 }).
                        to(0.3, { scaleX: 1 * .8, scaleY: 1 * .8 })).
                    start();
            }).start();

    }

    protected onBtnTouchEnd (): void {
        cc.tween(this.btnPlay).stop();
        cc.tween(this.btnPlay).
            set({ color: cc.color(255, 255, 255) }).
            to(0.02, { scale: 1 }).call(() => {
                cc.tween(this.btnPlay).repeatForever(
                    cc.tween(this.btnPlay).
                        to(0.3, { scaleX: 1.1, scaleY: 0.9 }).
                        to(0.3, { scaleX: 1, scaleY: 1 })).
                    start();
            }).start();
    }

    protected onXEditBoxChange (text: string, editbox: cc.EditBox): void {
        let strP = /^\d+(\.\d+)?$/;
        text.replace(strP, "");
        editbox.string = text;

        this.xNum = Number(editbox.string);
    }

    protected onXEditBoxEnd (editbox: cc.EditBox): void {

        this.xNum = Number(editbox.string);
    }

    protected onYEditBoxChange (text: string, editbox: cc.EditBox): void {
        let strP = /^\d+(\.\d+)?$/;
        if (!strP.test(text)) {
            text = "";
        }
        this.yNum = Number(editbox.string);
    }

    protected onYEditBoxEnd (editbox: cc.EditBox): void {
        this.yNum = Number(editbox.string);
    }


    protected onGenerateClick (): void {
        this.createCell();

        // this.showBtn();

        // findNum([10, 40, 5, 280], [234, 5, 2, 148, 23], 42);
    }

}