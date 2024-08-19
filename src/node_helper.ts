/*
 * MMM-Todoist
 * Ben Maas <bwmaas@gmail.com>
 */

import * as NodeHelper from "node_helper";
import * as console from "console";
import { SocketNotification } from "./constants/SocketNotification";
import { Config } from "./types/Config";
import { TodoistApiFactory } from "./class/TodoistApiFactory";
import { Project, Task, User } from "@doist/todoist-api-typescript";

let apiFactory: TodoistApiFactory

async function fetchCollaborators(): Promise<User[]> {
  const api = apiFactory.api()
  const projects = api.getProjects()
  const collaborators: Set<User> = new Set<User>();

  (await projects).forEach((project) => {
    if (project.isShared) {
      api.getProjectCollaborators(project.id).then((users) => {
        users.forEach(collaborators.add)
      })
    }
  })

  return Array.from(collaborators)
}

async function fetchLabels(): Promise<string[]> {
  return apiFactory.api().getSharedLabels();
}

async function fetchProjects(): Promise<Project[]> {
  return apiFactory.api().getProjects()
}

async function fetchTasks(): Promise<Task[]> {
  return apiFactory.api().getTasks()
}

module.exports = NodeHelper.create({
  start(): void {
    console.log(`Starting node helper for: ${this.name}`)
  },

  socketNotificationReceived(notification: SocketNotification, payload: unknown): void {
    switch (notification) {
      case SocketNotification.INIT:
        console.debug(`Initializing node helper for: ${this.name}`)
        this.config = payload as Config
        apiFactory = new TodoistApiFactory(this.config.tokenFile)
        break
      case SocketNotification.FETCH_COLLABORATORS:
        this.sendSocketNotification(SocketNotification.HANDLE_COLLABORATORS, fetchCollaborators())
        break
      case SocketNotification.FETCH_LABELS:
        this.sendSocketNotification(SocketNotification.HANDLE_LABELS, fetchLabels())
        break
      case SocketNotification.FETCH_PROJECTS:
        this.sendSocketNotification(SocketNotification.HANDLE_PROJECTS, fetchProjects())
        break
      case SocketNotification.FETCH_TASKS:
        this.sendSocketNotification(SocketNotification.HANDLE_TASKS, fetchTasks())
        break
      default:
        console.error(`${this.name}: Unexpected socket notification received by node helper: ${notification}`)
    }
  }
});
