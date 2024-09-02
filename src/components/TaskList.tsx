import React from 'React';
import { Project, Task, User } from "@doist/todoist-api-typescript";
import TaskElement from "./TaskElement";
import { Config } from "../types/Config";

export interface TaskListProps {
  config: Config
  tasks: Task[]
  collaborators: User[]
  labels: string[]
  projects: Project[]
}

function getOpacity(i: number, props: TaskListProps): number {
  if (!props.config.fade || props.config.fadePoint < 0 || props.config.fadePoint > 1 ) {
    return 1;
  }

  const n = i + 1
  const invLength = 1 / props.tasks.length
  const negMinOpacity = 1 - props.config.fadeMinimumOpacity
  const negFadePoint = 1 - props.config.fadePoint
  const opacity = 1 - ((((n * invLength) - props.config.fadePoint) / negFadePoint) * negMinOpacity)

  // The value must be between 0 and 1
  return Math.max(0, Math.min(opacity, 1))
}

export default function TaskList(props: TaskListProps): React.JSX.Element {
  return (
    <table className="TaskList">
      <tbody>
      {props.tasks.map((task, index) => (
        <TaskElement task={task} opacity={getOpacity(index, props)} {...props} />
      ))}
      </tbody>
    </table>
  )
}
