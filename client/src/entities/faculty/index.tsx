import * as style from './style.module.scss'
import { FacultyProps } from './types'
import { FacultyHeading } from './faculty-heading'
import { FacultyList } from './faculty-list'

export const Faculty = (props: FacultyProps) => {
  const {
    data: { educationType, faculties },
  } = props

  return (
    <div
      className={style.container}
      style={
        {
          '--faculties-length': faculties.length,
        } as React.CSSProperties
      }
    >
      <FacultyHeading data={{ educationType }} />
      <FacultyList data={{ educationType, faculties }} />
    </div>
  )
}