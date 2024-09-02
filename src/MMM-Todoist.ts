import * as Log from "logger";
import { Config } from "./types/Config";
import { SocketNotification } from "./constants/SocketNotification";
import { SortType } from "./constants/SortType";
import { Project, Task, User } from "@doist/todoist-api-typescript";
import TaskList, { TaskListProps } from "./components/TaskList";
import { renderToStaticMarkup } from 'react-dom/server';


const moduleName: string = 'MMM-Todoist'
let cachedCollaborators: User[]
let cachedLabels: string[]
let cachedProjects: Project[]
let cachedTasks: Task[]
let filteredLabels: string[]
let filteredProjects: string[]
let filteredTasks: Task[]

function filterLabels(config: Config, labels: string[]): string[] {
  Log.debug(`${moduleName}: filtering labels`)
  let filteredLabels: string[] = []

  if (config.excludeLabels) {
    labels.forEach((label) => {
      if (!config.labels.includes(label)) {
        filteredLabels.push(label)
      }
    })
  } else {
    filteredLabels = config.labels
  }

  return filteredLabels
}

function filterProjectIds(config: Config, projects: Project[]): string[] {
  Log.debug(`${moduleName}: filtering projectIds`)
  let filteredProjectIds: string[] = []

  if (config.excludeProjects) {
    projects.forEach((project) => {
      if (!config.projects.includes(project.id)) {
        filteredProjectIds.push(project.id)
      }
    })
  } else {
    filteredProjectIds = config.projects
  }

  return filteredProjectIds
}

function filterTasks(config: Config,
                     tasks: Task[],
                     projects: string[],
                     labels: string[]): Task[] {
  Log.debug(`${moduleName}: filtering tasks`)
  let filteredTasks: Set<Task> = new Set<Task>()

  tasks.forEach((task) => {
    if (projects.includes(task.projectId)) {
      filteredTasks.add(task)
    } else {
      task.labels.forEach((label) => {
        if (labels.includes(label)) {
          filteredTasks.add(task)
        }
      })
    }
  })

  return Array.from(filteredTasks)
}

function handleCollaborators(config: Config, users: User[]) {
  cachedCollaborators = users
}

function handleLabels(config: Config, labels: string[]) {
  cachedLabels = labels
  filteredLabels = filterLabels(config, labels)
}

function handleProjects(config: Config, projects: Project[]) {
  cachedProjects = projects
  filteredProjects = filterProjectIds(config, projects)
}

function handleTasks(config: Config, tasks: Task[]) {
  cachedTasks = tasks
  filteredTasks = filterTasks(config, tasks, filteredProjects, filteredLabels)
}

Module.register<Config>(moduleName, {
  defaults: {
    tokenFile: 'token.txt',
    maximumEntries: 10,
    projects: [],
    excludeProjects: false,
    labels: [],
    excludeLabels: false,
    updateInterval: 10 * 60 * 1000, // 10 minutes
    fade: true,
    fadePoint: 0.25,
    fadeMinimumOpacity: 0.25,
    sortType: SortType.TODOIST,
    displayLastUpdate: false,
    displayLastUpdateFormat: 'dd - HH:mm:ss',
    maxTitleLength: 25, // 10 to 50
    wrapEvents: true,
    displayTasksWithoutDueDate: true,
    displayTasksWithinDays: -1,
    displaySubtasks: true,
    displayAvatar: false,
    displayProject: true,
    debug: false
  },

  start(): void {
    Log.info(`Starting module: ${this.name}`)
    this.title = 'Loading...'

    this.updateIntervalId = 0
    this.isHidden = false
    this.isLoaded = false

    this.sendNotification(SocketNotification.INIT, this.config)
  },

  getStyles(): string[] {
    return ['MMM-Todoist.css']
  },

  getTranslations(): {[p: string]: string} {
    return {
      en: 'translations/en.json',
      de: 'translations/de.json',
      fr: 'translations/fr.json',
      nb: 'translations/nb.json'
    }
  },

  socketNotificationReceived(notification: string, payload: unknown) {
    Log.debug(`${this.name} received socket notification: ${notification} with payload: ${payload}`)
    switch (notification) {
      case SocketNotification.POST_INIT:
        this.config = payload as Config
        this.sendSocketNotification(SocketNotification.FETCH_COLLABORATORS, null)
        this.sendSocketNotification(SocketNotification.FETCH_LABELS, null)
        this.sendSocketNotification(SocketNotification.FETCH_PROJECTS, null)
        this.sendSocketNotification(SocketNotification.FETCH_TASKS, null)
        this.isInitialized = true
        Log.info(`${this.name}: initialization complete`)
        break
      case SocketNotification.HANDLE_COLLABORATORS:
        handleCollaborators(this.config, payload as User[])
        break
      case SocketNotification.HANDLE_LABELS:
        handleLabels(this.config, payload as string[])
        break
      case SocketNotification.HANDLE_PROJECTS:
        handleProjects(this.config, payload as Project[])
        break
      case SocketNotification.HANDLE_TASKS:
        handleTasks(this.config, payload as Task[])
        break
      default:
        Log.error(`${this.name} received unexpected socket notification: ${notification}`)
    }
  },

  suspend(): void {
    this.isHidden = true
  },

  resume(): void {
    this.isHidden = false
  },

  getDom(): HTMLElement {
    const props: TaskListProps = {
      config: this.config,
      tasks: filteredTasks,
      collaborators: cachedCollaborators,
      labels: cachedLabels,
      projects: cachedProjects
    }

    const wrapper = document.createElement('div')
    wrapper.innerHTML = renderToStaticMarkup(TaskList(props))

    return wrapper
  }
})
