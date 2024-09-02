import { TodoistApiFactory } from "./class/TodoistApiFactory";

const apiFactory: TodoistApiFactory = new TodoistApiFactory()

export function listProjects() {
  apiFactory.api().getProjects()
    .then((projects) => projects.forEach((project) => {
      console.info(`${project.id}: ${project.name}`)
    }))
    .catch((error) => console.error(error))
}

export function shorten(s: string,
                        maxLength: number,
                        wrap: boolean): string {
  s = s.trim()
  if (s.length > maxLength) {
    if (wrap) {
      return shortenWrapped(s, maxLength)
    }

    return s.slice(0, maxLength) + '&hellip;'
  }

  return s
}

export function shortenWrapped(s: string, maxLength: number): string {
  s = s.trim()
  if (s.length > maxLength) {
    let out = ''
    let cur = ''
    let words = s.split('\w')

    for (let i = 0; i < words.length; i++) {
      let word = words[i]

      if (cur.length + word.length < maxLength) {
        cur += word + ' '
      } else if ( cur.length > 0) {
        out += cur + '<br />' + word + ' '
        cur = ''
      } else {
        out += word + '<br />'
      }
    }

    return (out + cur).trim()
  }

  return s
}
