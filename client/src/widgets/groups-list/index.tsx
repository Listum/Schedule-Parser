import * as style from './style.module.scss'
import { GroupsProps } from './types'
import { Skeleton } from '@/shared/ui'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector, useGetNamesQuery } from '@/shared/redux'
import { SkeletonTime } from '@/shared/vars/vars'

export const GroupsList = ({ skeletonState, handleSkeletonStateChange }: GroupsProps) => {
  const navigationValue = useAppSelector((store) => store.navigation.navigationValue)
  const { educationType, faculty, course } = navigationValue
  const { groupID: pickedGroup } = useAppSelector((store) => store.navigation.navigationValue)

  const namesSearchParams = new URLSearchParams({
    educationType: educationType,
    faculty: faculty,
    course: course,
  }).toString()

  const { data: namesData, error: namesError, isLoading, isFetching } = useGetNamesQuery(namesSearchParams)

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSkeletonStateChange(false)
    }, SkeletonTime)
    return () => clearTimeout(timer)
  }, [skeletonState])

  return (
    <div className={style.container}>
      <div className={style.main}>
        {!namesData || isLoading || isFetching || skeletonState
          ? Array.from({ length: 16 }).map((_, index) => <Skeleton className={style.skeleton} key={index} />)
          : namesData.map((item, index) => (
              <Link
                to={`/${item._id}`}
                className={`${style.link} ${pickedGroup === item._id ? style.active : ''}`}
                key={index}
              >
                <p className={style.text}>{item.group}</p>
              </Link>
            ))}
      </div>
    </div>
  )
}
