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
const strokeFactor : number = 90 

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

class DrawingUtil {

    static drawLine(context : CanvasRenderingContext2D, x1 : number, y1 : number, x2 : number, y2 : number) {
        context.beginPath()
        context.moveTo(x1, y1)
        context.lineTo(x2, y2)
        context.stroke()
    }

    static drawCircle(context : CanvasRenderingContext2D, x : number, y : number, r : number) {
        context.beginPath()
        context.arc(x, y, r , 0, 2 * Math.PI)
        context.fill()
    }

    static drawBallTraversalLine(context : CanvasRenderingContext2D, scale : number) {
        const r : number = Math.min(w, h) / circleFactor 
        const size : number = Math.min(w, h) / lineFactor
        const sf : number = ScaleUtil.sinify(scale)
        const sf1 : number = ScaleUtil.divideScale(sf, 0, parts)
        const sf2 : number = ScaleUtil.divideScale(sf, 1, parts)
        const sf3 : number = ScaleUtil.divideScale(sf, 2, parts)
        for (var j = 0; j < parts; j++) {
            const gap : number = (h / 6) / (parts)
            context.save()
            context.translate(w / 8, h / 6 + gap * j)
            DrawingUtil.drawCircle(context, r + (size - 2 * r) * sf3, -r, r * sf1)
            DrawingUtil.drawLine(context, 0, 0, size * sf2, 0)
            context.restore()
        }
    }

    static drawBTLNode(context : CanvasRenderingContext2D, i : number, scale : number) {
        context.lineCap = 'round'
        context.lineWidth = Math.min(w, h) / strokeFactor 
        context.fillStyle = colors[i]
        context.strokeStyle = colors[i]
        DrawingUtil.drawBallTraversalLine(context, scale)
    }
}