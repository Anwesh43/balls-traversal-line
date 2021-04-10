const w : number = window.innerWidth 
const h : number = window.innerHeight 
const parts : number = 3 
const scGap : number = 0.02 / parts 
const circleFactor : number = 12.9 
const colors : Array<string> = [
    "#f44336",
    "#9C27B0",
    "#004D40",
    "#FF9800",
    "#64DD17"
]
const backColor : string = "#BDBDBD"
const delay : number = 20 
const lineFactor : number = 6

class ScaleUtil {

    static maxScale(scale : number, i : number, n : number) : number {
        return Math.max(0, scale - i / n)
    }

    static divideScale(scale : number, i : number, n : number) : number {
        return Math.min(1 / n, ScaleUtil.maxScale(scale, i, n)) * n 
    }

    static sinify(scale : number) : number {
        return Math.sin(scale * Math.PI)
    }
}