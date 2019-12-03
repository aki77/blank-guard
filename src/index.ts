const SELECTOR = 'a[target="_blank"]:not([rel*="noopener"])'

// SEE: https://mathiasbynens.github.io/rel-noopener/
const setNoopener = (element: HTMLAnchorElement): void => {
  // eslint-disable-next-line no-param-reassign
  element.rel =
    element.rel.length > 0
      ? `${element.rel} noopener noreferrer`
      : 'noopener noreferrer'
}

export default function blankGuard(): void {
  document.addEventListener(
    'click',
    event => {
      const target = event.target as HTMLElement
      const anchor = target.closest<HTMLAnchorElement>(SELECTOR)
      if (!anchor) return

      event.preventDefault()
      setNoopener(anchor)
      target.click()
    },
    false
  )

  document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener(
      'contextmenu',
      ({ target }) => {
        const anchor = (target as HTMLElement).closest<HTMLAnchorElement>(
          SELECTOR
        )
        if (!anchor) return

        setNoopener(anchor)
      },
      false
    )
  })
}
