import * as style from './style.module.scss'
import { useGetGroupByIDQuery } from '@/shared/redux/slices/apiSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { GroupButton } from '@/entities/group'
import React from 'react'
import { useAppDispatch, useAppSelector } from '@/shared/redux/hooks'
import { navigationValueChanged } from '@/shared/redux/slices/navigationSlice'

export const GroupCenterButton = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { groupId } = useParams()
  const { data, error } = useGetGroupByIDQuery(groupId ?? '')

  const picked = useAppSelector((store) => store.navigation.navigationValue)

  if (!data) {
    return <div className=""></div>
  }

  const centerButtonTextHandler = () => {
    const makeTextSpan = (text: string, className?: string) => {
      return <span className={`${className} ${style.span}`}>{text}</span>
    }

    const group = makeTextSpan(data.group, style.group)
    const week = makeTextSpan(picked.week)
    const day = makeTextSpan(picked.day)
    const dash = makeTextSpan('—', style.dash)

    const result = [group]
    const isDayPicked = picked.day && data.date[picked.week] && data.date[picked.week][picked.day]
    const isWeekPicked = picked.week && data.date[picked.week]

    if (isWeekPicked) {
      result.push(dash, week)
    }

    if (isDayPicked) {
      result.push(dash, day)
    }

    return result.map((span, index) => React.cloneElement(span, { key: index }))
  }

  const centerButtonClickHandler = () => {
    const isDayPicked = picked.day && data.date[picked.week] && data.date[picked.week][picked.day]
    const isWeekPicked = picked.week && data.date[picked.week]
    if (isDayPicked) {
      dispatch(navigationValueChanged({ ...picked, day: '' }))
      return
    }

    if (isWeekPicked) {
      dispatch(navigationValueChanged({ ...picked, week: '' }))
      return
    }
    navigate('/')
  }

  return <GroupButton onClick={centerButtonClickHandler}> {centerButtonTextHandler()}</GroupButton>
}