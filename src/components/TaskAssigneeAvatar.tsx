import React from "React";
import { TaskElementDataProps } from "./TaskElement";
import TaskElementItem from "./TaskElementItem";

export default function TaskAssigneeAvatar(props: TaskElementDataProps): React.JSX.Element {
  let imgSrc = '/modules/MMM-Todoist/1x1px.png'
  let imgAlt = 'Unknown'

  for (let i = 0; i < props.collaborators.length; i++) {
    if (props.collaborators[i].id === props.task.assigneeId) {
      imgAlt = props.collaborators[i].name
    }
  }

  return (
    <TaskElementItem
      itemClassName='TaskText'
      localClassNames={[]}>
      <img src={imgSrc} alt={imgAlt} />
    </TaskElementItem>
  )
}
