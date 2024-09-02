import React from "React";
import { TaskElementDataProps } from "./TaskElement";
import TaskElementItem from "./TaskElementItem";

export default function TaskProject(props: TaskElementDataProps): React.JSX.Element {
  return (
    <TaskElementItem
      itemClassName='TaskProject'
      localClassNames={[]}>{props.task.projectId}</TaskElementItem>
  )
}
