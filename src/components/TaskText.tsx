import React from "React";
import { TaskElementDataProps } from "./TaskElement";
import TaskElementItem from "./TaskElementItem";
import { shorten } from "../util";

export default function TaskText(props: TaskElementDataProps): React.JSX.Element {
  const todoText = shorten(props.task.content,
                           props.config.maxTitleLength,
                           props.config.wrapEvents)

  return (
    <TaskElementItem
      itemClassName='TaskText'
      localClassNames={[]}>{todoText}</TaskElementItem>
  )
}
