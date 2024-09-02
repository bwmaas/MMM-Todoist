import React from "React";
import { TaskElementDataProps } from "./TaskElement";
import TaskElementItem from "./TaskElementItem";

export default function TaskPriorityIndicator(props: TaskElementDataProps): React.JSX.Element {
  const localClassNames: string[] = []
  if (props.task.priority == 4) localClassNames.push('priority1')
  if (props.task.priority == 3) localClassNames.push('priority2')
  if (props.task.priority == 2) localClassNames.push('priority3')
  if (props.task.priority == 1) localClassNames.push('priority4')

  return (
    <TaskElementItem
      itemClassName='TaskPriorityIndicator'
      localClassNames={localClassNames}>&nbsp;</TaskElementItem>
  )
}
