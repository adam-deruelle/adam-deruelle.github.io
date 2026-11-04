import { onMounted, onBeforeUnmount } from 'vue'

// Dessine la chaîne de l'ancre dans un <svg> qui couvre toute la page :
// elle part de l'étrave du voilier (#bow), rejoint la colonne de droite en ondulant
// et descend jusqu'à l'anneau de l'ancre (#anchor-ring). Les maillons alternent face / profil.
export function useAnchorChain(pageRef, svgRef) {
  const NS = 'http://www.w3.org/2000/svg'
  let raf = 0
  let ro

  function rel(el, page) {
    const r = el.getBoundingClientRect()
    const p = page.getBoundingClientRect()
    return { x: r.left - p.left + r.width / 2, y: r.top - p.top + r.height / 2 }
  }

  function draw() {
    const page = pageRef.value
    const svg = svgRef.value
    const bow = document.getElementById('bow')
    const ring = document.getElementById('anchor-ring')
    if (!page || !svg || !bow || !ring) return
    const W = page.clientWidth
    const H = page.scrollHeight
    const small = W < 860
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`)
    svg.style.height = H + 'px'
    svg.textContent = ''

    const a = rel(bow, page)
    const b = rel(ring, page)
    b.y -= small ? 6 : 8
    const amp = small ? 6 : 16
    const period = 300
    const settle = 520
    const pts = []
    for (let y = a.y; y <= b.y; y += 8) {
      const t = Math.min(1, (y - a.y) / settle)
      const ease = t * t * (3 - 2 * t)
      const fade = Math.min(1, (b.y - y) / 200)
      pts.push([a.x + (b.x - a.x) * ease + amp * ease * fade * Math.sin(((y - a.y) / period) * Math.PI * 2), y])
    }
    pts.push([b.x, b.y])

    const path = document.createElementNS(NS, 'path')
    path.setAttribute('d', 'M' + pts.map((p) => p.map((v) => v.toFixed(1)).join(' ')).join(' L'))
    svg.appendChild(path)
    const L = path.getTotalLength()
    const step = small ? 9 : 12
    const rx = small ? 5 : 7
    const ry = small ? 2.8 : 3.8
    const frag = document.createDocumentFragment()
    for (let s = 0, i = 0; s < L - 4; s += step, i++) {
      const p = path.getPointAtLength(s)
      const q = path.getPointAtLength(Math.min(L, s + 1))
      const ang = (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI
      let el
      if (i % 2 === 0) {
        el = document.createElementNS(NS, 'ellipse')
        el.setAttribute('rx', rx)
        el.setAttribute('ry', ry)
        el.setAttribute('fill', 'none')
        el.setAttribute('stroke', 'currentColor')
        el.setAttribute('stroke-width', '2.2')
      } else {
        el = document.createElementNS(NS, 'rect')
        el.setAttribute('x', -rx)
        el.setAttribute('y', -1.3)
        el.setAttribute('width', rx * 2)
        el.setAttribute('height', 2.6)
        el.setAttribute('rx', 1.3)
        el.setAttribute('fill', 'currentColor')
      }
      el.setAttribute('transform', `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${ang.toFixed(1)})`)
      frag.appendChild(el)
    }
    path.remove()
    svg.appendChild(frag)
  }

  const redraw = () => {
    cancelAnimationFrame(raf)
    raf = requestAnimationFrame(draw)
  }

  onMounted(() => {
    draw()
    ro = new ResizeObserver(redraw)
    ro.observe(pageRef.value)
    window.addEventListener('resize', redraw)
    window.addEventListener('load', redraw)
    document.fonts?.ready.then(redraw)
  })
  onBeforeUnmount(() => {
    ro?.disconnect()
    window.removeEventListener('resize', redraw)
    window.removeEventListener('load', redraw)
    cancelAnimationFrame(raf)
  })

  return { redraw }
}
