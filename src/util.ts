import { TodoistApiFactory } from "./class/TodoistApiFactory";

const apiFactory: TodoistApiFactory = new TodoistApiFactory()

export function listProjects() {
  apiFactory.api().getProjects()
    .then((projects) => projects.forEach((project) => {
      console.info(`${project.id}: ${project.name}`)
    }))
    .catch((error) => console.error(error))
}
