import React, { PropsWithChildren } from "React";

export interface TaskElementItemProps {
  itemClassName: string
  localClassNames: string[]
}

export default function TaskElementItem(props: PropsWithChildren<TaskElementItemProps>): React.JSX.Element {
  let itemClass = 'TaskElement__' + props.itemClassName
  let localClasses = props.localClassNames.join(' ')
  let className = (itemClass + ' ' + localClasses).trim();

  return (
    <tr className={className}>{props.children}</tr>
  )
}
