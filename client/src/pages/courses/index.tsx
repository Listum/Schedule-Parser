import * as style from './style.module.scss'
import { BackToPreviousButton } from '@/entities/navigation'
import { Courses } from '@/widgets/courses'
import { GroupsList } from '@/widgets/groups-list'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export const CoursesPage = () => {
  const navigate = useNavigate()
  const [coursesSkeletonIsEnabled, setCoursesSkeletonIsEnabled] = useState(true)

  const handleSkeletonStateChange = (newState: boolean) => {
    setCoursesSkeletonIsEnabled(newState)
  }

  return (
    <div className={style.container}>
      <div className="">
        <BackToPreviousButton onClick={() => navigate('/')} />
      </div>
      <div className={style.wrapper}>
        <Courses handleSkeletonStateChange={handleSkeletonStateChange} />
        <GroupsList handleSkeletonStateChange={handleSkeletonStateChange} skeletonState={coursesSkeletonIsEnabled} />
      </div>
    </div>
  )
}
