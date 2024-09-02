import React from "React";
import { TaskElementDataProps } from "./TaskElement";
import TaskElementItem from "./TaskElementItem";
import { differenceInDays, formatRelative } from "date-fns";

export default function TaskDueDate(props: TaskElementDataProps): React.JSX.Element {
  const localClassNames: string[] = []
  let dueDateText = '&nbsp;'
  let dateNow = Date.now()

  if (props.task.due) {
    let dateDue = props.task.due.date
    let diffDays = differenceInDays(dateDue, dateNow)
    dueDateText = formatRelative(dateDue, dateNow)

    if (diffDays < 0) {
      localClassNames.push('overdue')
    }

    console.log('Due date (Real): ', dateDue)
    console.log('Due date (Todoist): ', props.task.due.string)
    console.log('Due date (date-fns): ', dueDateText)
  }

  return (
    <TaskElementItem
      itemClassName='TaskDueDate'
      localClassNames={localClassNames}>dueDateText</TaskElementItem>
  )
}
