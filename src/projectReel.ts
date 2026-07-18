type ReelDetail = {
  type: string
  role: string
  stack: string[]
  highlights: string[]
}

const PROJECT_DETAILS: Record<string, ReelDetail> = {
  receitas: {
    type: 'PRODUTO FULL STACK',
    role: 'DESIGN + DESENVOLVIMENTO',
    stack: ['NEXT.JS', 'PRISMA', 'POSTGRESQL'],
    highlights: ['AUTENTICAÇÃO', 'PAINEL ADMIN', 'BUSCA E FILTROS'],
  },
  devmatch: {
    type: 'RECRUTAMENTO TECH',
    role: 'UX + FRONT-END + DADOS',
    stack: ['NEXT.JS', 'TYPESCRIPT', 'NEON'],
    highlights: ['MATCHES', 'CHAT CONTEXTUAL', 'PERFIS POR PAPEL'],
  },
  'logic quest': {
    type: 'EDTECH / PWA',
    role: 'PRODUTO + INTERFACE',
    stack: ['JAVASCRIPT', 'PWA', 'LOCALSTORAGE'],
    highlights: ['MÓDULOS', 'CHECKPOINTS', 'PROGRESSO'],
  },
  helena: {
    type: 'LEGALTECH / SERVIÇO',
    role: 'DIREÇÃO VISUAL + DEV',
    stack: ['HTML', 'CSS', 'PYTHON'],
    highlights: ['PROTOCOLOS', 'FORMULÁRIOS', 'PAINEL INTERNO'],
  },
  differenza: {
    type: 'REDESIGN / EXPERIÊNCIA',
    role: 'AUDITORIA + UI + DEV',
    stack: ['HTML', 'CSS', 'JAVASCRIPT'],
    highlights: ['ANTES E DEPOIS', 'HIERARQUIA', 'RESPONSIVIDADE'],
  },
}

let cleanupProjectReel: (() => void) | null = null
let initAttempts = 0

function normalizeTitle(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
}

export function initProjectReel() {
  cleanupProjectReel?.()

  const reel = document.querySelector<HTMLElement>('.work')
  const scenes = Array.from(reel?.querySelectorAll<HTMLElement>('.projectScene') ?? [])

  if (!reel || scenes.length === 0) {
    if (initAttempts < 10) {
      initAttempts += 1
      window.setTimeout(initProjectReel, 100)
    }
    return
  }

  initAttempts = 0
  reel.classList.add('projectReel')

  const compactViewport = window.matchMedia('(max-width: 720px)').matches
  const useDesktopControls = !compactViewport
  const generatedNodes: HTMLElement[] = []
  const nav = document.createElement('aside')
  nav.className = 'projectReelNav'
  nav.setAttribute('aria-label', 'Navegação dos projetos')

  const counter = document.createElement('div')
  counter.className = 'projectReelCounter'

  const current = document.createElement('strong')
  current.textContent = '01'

  const total = document.createElement('span')
  total.textContent = `/ ${String(scenes.length).padStart(2, '0')}`

  counter.append(current, total)

  const controls = document.createElement('div')
  controls.className = 'projectReelControls'

  const buttons = scenes.map((scene, index) => {
    const titleElement = scene.querySelector<HTMLElement>('.projectLabel h2')
    const metaElement = scene.querySelector<HTMLElement>('.projectLabel span')
    const imageButton = scene.querySelector<HTMLButtonElement>('.projectImageButton')
    const projectTitle = titleElement?.textContent?.trim() || `Projeto ${index + 1}`
    const projectNumber = String(index + 1).padStart(2, '0')
    const year = metaElement?.textContent?.match(/20\d{2}/)?.[0] || '2026'
    const detail = PROJECT_DETAILS[normalizeTitle(projectTitle)] || {
      type: 'PROJETO DIGITAL',
      role: 'DESIGN + DESENVOLVIMENTO',
      stack: ['REACT', 'TYPESCRIPT', 'CSS'],
      highlights: ['INTERFACE', 'RESPONSIVIDADE', 'PRODUTO'],
    }

    scene.dataset.reelIndex = projectNumber
    scene.id = `project-${projectNumber}`

    if (useDesktopControls) {
      const topMeta = document.createElement('div')
      topMeta.className = 'projectReelTopMeta'
      topMeta.setAttribute('aria-hidden', 'true')
      topMeta.innerHTML = `<em>${year}</em><span>${detail.type}</span><small>${detail.role}</small>`

      const sideInfo = document.createElement('aside')
      sideInfo.className = 'projectReelSideInfo'
      sideInfo.setAttribute('aria-hidden', 'true')
      sideInfo.innerHTML = `
        <p>DESTAQUES</p>
        <ol>
          ${detail.highlights.map((item, itemIndex) => `<li><b>${String(itemIndex + 1).padStart(2, '0')}</b><span>${item}</span></li>`).join('')}
        </ol>
        <div>${detail.stack.map((item) => `<span>${item}</span>`).join('')}</div>
      `

      scene.append(topMeta, sideInfo)
      generatedNodes.push(topMeta, sideInfo)
    }

    const explore = document.createElement('button')
    explore.type = 'button'
    explore.className = 'projectReelExplore'
    explore.setAttribute('aria-label', `Abrir estudo de caso ${projectTitle}`)
    explore.innerHTML = '<span>EXPLORAR</span><b aria-hidden="true">→</b>'
    explore.addEventListener('click', () => imageButton?.click())

    scene.append(explore)
    generatedNodes.push(explore)

    const button = document.createElement('button')
    button.type = 'button'
    button.setAttribute('aria-label', `Ir para ${projectTitle}`)
    button.innerHTML = `<span>${projectNumber}</span><i aria-hidden="true"></i>`
    button.addEventListener('click', () => goTo(index))
    if (useDesktopControls) controls.appendChild(button)

    return button
  })

  const hint = document.createElement('p')
  hint.className = 'projectReelHint'
  hint.textContent = 'SCROLL / SETAS'

  if (useDesktopControls) {
    nav.append(counter, controls, hint)
    document.body.appendChild(nav)
  }

  const cursor = document.createElement('div')
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const finePointer = window.matchMedia('(pointer: fine)').matches
  const useCursor = finePointer && useDesktopControls

  if (useCursor) {
    cursor.className = 'projectReelCursor'
    cursor.setAttribute('aria-hidden', 'true')
    cursor.dataset.mode = 'scroll'
    cursor.innerHTML = '<span>SCROLL</span><i></i>'
    document.body.appendChild(cursor)
  }

  const cursorLabel = cursor.querySelector<HTMLSpanElement>('span')

  let activeIndex = 0
  let frame = 0
  let cursorFrame = 0
  let cursorTargetX = -160
  let cursorTargetY = -160
  let cursorX = -160
  let cursorY = -160
  let dragStartY: number | null = null

  function setCursorMode(mode: string, label: string) {
    if (!useCursor) return
    cursor.dataset.mode = mode
    if (cursorLabel) cursorLabel.textContent = label
  }

  function renderCursor() {
    if (!useCursor) return
    cursorX += (cursorTargetX - cursorX) * 0.22
    cursorY += (cursorTargetY - cursorY) * 0.22
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`
    cursorFrame = window.requestAnimationFrame(renderCursor)
  }

  function setActive(index: number) {
    if (index === activeIndex && scenes[index]?.classList.contains('is-reel-active')) return

    activeIndex = index
    current.textContent = String(index + 1).padStart(2, '0')

    scenes.forEach((scene, sceneIndex) => {
      scene.classList.toggle('is-reel-active', sceneIndex === index)
    })

    buttons.forEach((button, buttonIndex) => {
      const isActive = buttonIndex === index
      button.classList.toggle('is-active', isActive)
      button.setAttribute('aria-current', isActive ? 'true' : 'false')
    })
  }

  function goTo(index: number) {
    const nextIndex = Math.max(0, Math.min(scenes.length - 1, index))
    scenes[nextIndex]?.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  function updateFromViewport() {
    frame = 0
    const reelRect = reel.getBoundingClientRect()
    const reelIsVisible = reelRect.top < window.innerHeight * 0.72 && reelRect.bottom > window.innerHeight * 0.28

    document.body.classList.toggle('project-reel-in-view', reelIsVisible)

    if (!reelIsVisible) return

    const viewportCenter = window.innerHeight / 2
    let closestIndex = 0
    let closestDistance = Number.POSITIVE_INFINITY

    scenes.forEach((scene, index) => {
      const rect = scene.getBoundingClientRect()
      const sceneCenter = rect.top + rect.height / 2
      const distance = Math.abs(sceneCenter - viewportCenter)

      if (distance < closestDistance) {
        closestDistance = distance
        closestIndex = index
      }
    })

    setActive(closestIndex)
  }

  function requestUpdate() {
    if (frame) return
    frame = window.requestAnimationFrame(updateFromViewport)
  }

  function onPointerMove(event: PointerEvent) {
    if (!finePointer) return

    cursorTargetX = event.clientX
    cursorTargetY = event.clientY

    const target = event.target as HTMLElement | null
    const insideReel = Boolean(target?.closest('.projectReel'))
    document.body.classList.toggle('project-reel-cursor-active', insideReel)

    if (!insideReel) return

    if (target?.closest('.projectImageButton, .projectReelExplore')) {
      setCursorMode('open', 'ABRIR')
      return
    }

    if (target?.closest('.projectReelControls button')) {
      setCursorMode('nav', 'IR')
      return
    }

    if (dragStartY !== null) {
      setCursorMode('drag', 'ARRASTE')
      return
    }

    if (event.clientY < window.innerHeight * 0.16) {
      setCursorMode('up', '↑')
    } else if (event.clientY > window.innerHeight * 0.84) {
      setCursorMode('down', '↓')
    } else {
      setCursorMode('scroll', 'SCROLL')
    }
  }

  function onPointerDown(event: PointerEvent) {
    if (!finePointer) return

    const target = event.target as HTMLElement | null
    if (!target?.closest('.projectReel') || target.closest('button, a')) return

    dragStartY = event.clientY
    cursor.classList.add('is-pressed')
    setCursorMode('drag', 'ARRASTE')
  }

  function onPointerUp(event: PointerEvent) {
    if (dragStartY === null) return

    const delta = event.clientY - dragStartY
    dragStartY = null
    cursor.classList.remove('is-pressed')

    if (Math.abs(delta) > 70) {
      goTo(activeIndex + (delta < 0 ? 1 : -1))
    }

    setCursorMode('scroll', 'SCROLL')
  }

  function onKeyDown(event: KeyboardEvent) {
    if (!document.body.classList.contains('project-reel-in-view')) return

    const target = event.target as HTMLElement | null
    if (target?.matches('input, textarea, select, [contenteditable="true"]')) return

    if (event.key === 'ArrowDown' || event.key === 'PageDown') {
      event.preventDefault()
      goTo(activeIndex + 1)
    }

    if (event.key === 'ArrowUp' || event.key === 'PageUp') {
      event.preventDefault()
      goTo(activeIndex - 1)
    }
  }

  setActive(0)
  updateFromViewport()

  if (useCursor) cursorFrame = window.requestAnimationFrame(renderCursor)

  window.addEventListener('scroll', requestUpdate, { passive: true })
  window.addEventListener('resize', requestUpdate)
  window.addEventListener('keydown', onKeyDown)
  if (useCursor) {
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointercancel', onPointerUp)
  }

  cleanupProjectReel = () => {
    if (frame) window.cancelAnimationFrame(frame)
    if (cursorFrame) window.cancelAnimationFrame(cursorFrame)
    window.removeEventListener('scroll', requestUpdate)
    window.removeEventListener('resize', requestUpdate)
    window.removeEventListener('keydown', onKeyDown)
    if (useCursor) {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerUp)
    }
    document.body.classList.remove('project-reel-in-view', 'project-reel-cursor-active')
    if (useDesktopControls) nav.remove()
    if (useCursor) cursor.remove()
    generatedNodes.forEach((node) => node.remove())
    reel.classList.remove('projectReel')
    scenes.forEach((scene) => scene.classList.remove('is-reel-active'))
  }
}
