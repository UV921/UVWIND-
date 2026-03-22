// ── THEME ────────────────────────────────────
function toggleTheme() {
  const html = document.documentElement
  html.setAttribute('data-theme',
    html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
  )
}

// ── ANIMATED CODE EDITOR ─────────────────────
const sequences = [
  {
    classes: 'bg-red-5 p-4',
    css: '.bg-red-5 { background-color: #f43f5e }\n  .p-4 { padding: 16px }',
    style: { backgroundColor: '#f43f5e', padding: '16px', borderRadius: '6px', color: 'white' }
  },
  {
    classes: 'bg-blue-5 p-6 rounded-lg',
    css: '.bg-blue-5 { background-color: #3b82f6 }\n  .p-6 { padding: 24px }\n  .rounded-lg { border-radius: 8px }',
    style: { backgroundColor: '#3b82f6', padding: '24px', borderRadius: '8px', color: 'white' }
  },
  {
    classes: 'bg-glass p-4 rounded-xl',
    css: '.bg-glass { backdrop-filter: blur(12px);\n    background: rgba(255,255,255,0.15);\n    border: 1px solid rgba(255,255,255,0.25) }',
    style: {
      backdropFilter: 'blur(12px)',
      backgroundColor: 'rgba(255,255,255,0.15)',
      border: '1px solid rgba(255,255,255,0.25)',
      padding: '16px', borderRadius: '12px', color: 'white'
    }
  },
  {
    classes: 'bg-orange-5 p-4 rounded-full font-bold',
    css: '.bg-orange-5 { background-color: #f97316 }\n  .p-4 { padding: 16px }\n  .rounded-full { border-radius: 9999px }\n  .font-bold { font-weight: 700 }',
    style: { backgroundColor: '#f97316', padding: '16px', borderRadius: '9999px', color: 'white', fontWeight: '700' }
  },
]

let seqIndex = 0
let charIndex = 0
let isDeleting = false
let typingTimer = null

const typedEl = document.getElementById('typed-classes')
const injectEl = document.getElementById('inject-prop')
const previewEl = document.getElementById('preview-box')

function typeClasses() {
  const seq = sequences[seqIndex]
  const target = seq.classes

  if (!isDeleting && charIndex <= target.length) {
    typedEl.textContent = target.slice(0, charIndex)
    charIndex++

    if (charIndex > target.length) {
      // finished typing — show injected CSS
      injectEl.textContent = seq.css
      applyPreview(seq.style)
      typingTimer = setTimeout(() => { isDeleting = true; typeClasses() }, 2500)
      return
    }
    typingTimer = setTimeout(typeClasses, 80)

  } else if (isDeleting && charIndex >= 0) {
    typedEl.textContent = target.slice(0, charIndex)
    charIndex--

    if (charIndex < 0) {
      isDeleting = false
      charIndex = 0
      seqIndex = (seqIndex + 1) % sequences.length
      injectEl.textContent = 'waiting...'
      resetPreview()
      typingTimer = setTimeout(typeClasses, 400)
      return
    }
    typingTimer = setTimeout(typeClasses, 30)
  }
}

function applyPreview(styles) {
  const el = previewEl
  el.removeAttribute('style')
  Object.assign(el.style, styles)
}

function resetPreview() {
  const el = previewEl
  el.removeAttribute('style')
  el.style.backgroundColor = '#1a1a1a'
  el.style.padding = '6px 14px'
  el.style.borderRadius = '6px'
  el.style.color = 'white'
  el.style.transition = 'all 0.4s ease'
}

// ── STYLE MAP ────────────────────────────────
const styleMap = {
  'p-1': { prop: 'padding', val: '4px' },
  'p-2': { prop: 'padding', val: '8px' },
  'p-4': { prop: 'padding', val: '16px' },
  'p-6': { prop: 'padding', val: '24px' },
  'p-8': { prop: 'padding', val: '32px' },

  'bg-red-5':    { prop: 'backgroundColor', val: '#f43f5e' },
  'bg-blue-5':   { prop: 'backgroundColor', val: '#3b82f6' },
  'bg-green-5':  { prop: 'backgroundColor', val: '#22c55e' },
  'bg-orange-5': { prop: 'backgroundColor', val: '#f97316' },
  'bg-purple-5': { prop: 'backgroundColor', val: '#a855f7' },

  'text-white': { prop: 'color', val: '#ffffff' },
  'text-black': { prop: 'color', val: '#000000' },
  'font-bold':  { prop: 'fontWeight', val: '700' },
  'text-xl':    { prop: 'fontSize', val: '1.25rem' },
  'text-2xl':   { prop: 'fontSize', val: '1.5rem' },
  'uppercase':  { prop: 'textTransform', val: 'uppercase' },
  'italic':     { prop: 'fontStyle', val: 'italic' },

  'rounded':      { prop: 'borderRadius', val: '4px' },
  'rounded-lg':   { prop: 'borderRadius', val: '8px' },
  'rounded-xl':   { prop: 'borderRadius', val: '12px' },
  'rounded-full': { prop: 'borderRadius', val: '9999px' },

  'shadow-lg':  { prop: 'boxShadow', val: '0 10px 40px rgba(0,0,0,0.4)' },
  'opacity-50': { prop: 'opacity', val: '0.5' },
}

const multiMap = {
  'bg-glass': {
    backdropFilter: 'blur(12px)',
    webkitBackdropFilter: 'blur(12px)',
    backgroundColor: 'rgba(255,255,255,0.15)',
    border: '1px solid rgba(255,255,255,0.25)',
    borderRadius: '12px',
  },
  'bg-glass-dark': {
    backdropFilter: 'blur(12px)',
    webkitBackdropFilter: 'blur(12px)',
    backgroundColor: 'rgba(0,0,0,0.25)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
  },
}

// ── PLAYGROUND ───────────────────────────────
function runPG() {
  const input = document.getElementById('pg-input').value.trim()
  const el = document.getElementById('pg-box')

  // reset
  el.removeAttribute('style')
  el.style.padding = '1rem 2rem'
  el.style.borderRadius = '8px'
  el.style.background = '#111'
  el.style.color = 'white'
  el.style.fontFamily = 'monospace'
  el.style.fontWeight = '700'
  el.style.position = 'relative'
  el.style.zIndex = '2'
  el.style.transition = 'all 0.3s'
  el.style.textAlign = 'center'

  const classes = input.split(' ').filter(Boolean)
  const injected = []

  classes.forEach(cls => {
    if (styleMap[cls]) {
      el.style[styleMap[cls].prop] = styleMap[cls].val
      injected.push(`.${cls} { ${styleMap[cls].prop}: ${styleMap[cls].val} }`)
    }
    if (multiMap[cls]) {
      Object.assign(el.style, multiMap[cls])
      injected.push(`.${cls} { /* glass effect */ }`)
    }
  })

  // update proof panel
  const pgInj = document.getElementById('pg-injected')
  const dtCss = document.getElementById('dt-css')

  if (injected.length === 0) {
    pgInj.textContent = '// apply classes to see injection'
    dtCss.innerHTML = '<span class="dt-muted">// empty</span>'
  } else {
    pgInj.textContent = injected.join('\n')
    dtCss.textContent = injected[0]
  }
}

function chip(el) {
  const input = document.getElementById('pg-input')
  const cls = el.textContent.trim()
  if (!input.value.includes(cls)) {
    input.value = input.value.trim() ? input.value + ' ' + cls : cls
  }
  runPG()
}

// ── TABS ─────────────────────────────────────
function tab(name) {
  document.getElementById('b-cdn').classList.add('hidden')
  document.getElementById('b-npm').classList.add('hidden')
  document.getElementById('t-cdn').classList.remove('active')
  document.getElementById('t-npm').classList.remove('active')
  document.getElementById('b-' + name).classList.remove('hidden')
  document.getElementById('t-' + name).classList.add('active')
}

function copy(id) {
  const text = document.getElementById(id).innerText
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById(id).previousElementSibling.querySelector('button')
    const orig = btn.textContent
    btn.textContent = 'Copied!'
    setTimeout(() => btn.textContent = orig, 1500)
  })
}

// ── INIT ─────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // start typing animation
  setTimeout(typeClasses, 800)
})
