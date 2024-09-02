import React from 'React';
import '../css/TaskElement.scss'
import { Project, Task, User } from "@doist/todoist-api-typescript";
import TaskAssigneeAvatar from "./TaskAssigneeAvatar";
import TaskDueDate from "./TaskDueDate";
import TaskPriorityIndicator from "./TaskPriorityIndicator";
import TaskProject from "./TaskProject";
import TaskText from "./TaskText";
import { Config } from "../types/Config";

export interface TaskElementDataProps {
  config: Config
  task: Task;
  collaborators: User[]
  labels: string[]
  projects: Project[];
}

export interface TaskElementProps extends TaskElementDataProps {
  opacity: number
}

export default function TaskElement(props: TaskElementProps): React.JSX.Element {
  return (
    <tr className="TaskElement">
      <TaskPriorityIndicator {...props} />
      <TaskText {...props} />
      <TaskDueDate {...props} />
      { props.config.displayProject && <TaskProject {...props} /> }
      { props.config.displayAvatar && <TaskAssigneeAvatar {...props} /> }
    </tr>
  )
}
