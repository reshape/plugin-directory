/* global plugins */
const $ = document.querySelector.bind(document)
const $a = document.querySelectorAll.bind(document)
const list = plugins.map((p, i) => {
  p.id = `.p${i}`
  return p
})

$('.search').onsubmit = () => false

$('.search').onkeyup = () => {
  // get the search value
  const val = $('.field').value
  const re = new RegExp(val)

  // search relevant module fields for matches
  const matches = list.reduce((m, p) => {
    if (p.package.name.match(re)) { m.push(p.id); return m }
    if (p.package.description.match(re)) { m.push(p.id); return m }
    if (p.package.publisher.username.match(re)) { m.push(p.id); return m }
    if (p.package.keywords && p.package.keywords.indexOf(val) > -1) {
      m.push(p.id)
      return m
    }
    return m
  }, [])

  // clear any existing search classes
  $a('tr:not(.header)').forEach((el) => {
    el.className = el.className.replace(' hidden', '')
  })

  // add classes to hide non-matching elements
  if (matches.length) {
    const toHide = $a(`tr:not(.header):not(${matches.join('):not(')})`)
    toHide.forEach((el) => { el.className = `${el.className} hidden` })
  }
}

let isTableScrolling = false
const tableWrapper = $('.table-wrapper')
const tableWrapperFx = $('.table-wrapper-fx')
const tableWrapperLeft = $('.tableWrapper:before')
const tableWrapperright = $('.tableWrapper:after')

tableWrapper.onscroll = () => {
  isTableScrolling = true
}
const setTableScrollFx = () => {
  if (tableWrapper.scrollLeft > 0) {
    tableWrapperFx.classList.add('is-scrolled-left')
  } else {
    tableWrapperFx.classList.remove('is-scrolled-left')
  }
  if (tableWrapper.scrollWidth - tableWrapper.clientWidth - tableWrapper.scrollLeft > 0) {
    tableWrapperFx.classList.add('is-scrolled-right')
  } else {
    tableWrapperFx.classList.remove('is-scrolled-right')
  }
}

setInterval(() => {
  if (isTableScrolling) {
    setTableScrollFx()
    isTableScrolling = false
  }
}, 100)
setTableScrollFx()
