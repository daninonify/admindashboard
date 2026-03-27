import { createContext, useContext, useEffect, useState } from 'react'
import {
  seedUsers,
  seedMeetings,
  USERS_API_URL,
  MEETINGS_API_URL,
  fetchJson,
  normalizeUserRecord,
  normalizeMeetingRecord,
} from '../lib/data'

const DataContext = createContext(null)

export function DataProvider({ children }) {
  const [usersData, setUsersData] = useState(seedUsers)
  const [meetings, setMeetings] = useState(seedMeetings)
  const [attendanceByMeeting, setAttendanceByMeeting] = useState({})
  const [dataSourceNote, setDataSourceNote] = useState('')

  useEffect(() => {
    let cancelled = false

    const loadDatabaseData = async () => {
      const [usersResult, meetingsResult] = await Promise.allSettled([
        fetchJson(USERS_API_URL),
        fetchJson(MEETINGS_API_URL),
      ])

      if (cancelled) {
        return
      }

      const notes = []

      if (usersResult.status === 'fulfilled' && Array.isArray(usersResult.value)) {
        setUsersData(usersResult.value.map(normalizeUserRecord))
      } else {
        notes.push('Users endpoint unavailable, using local seed users.')
      }

      if (meetingsResult.status === 'fulfilled' && Array.isArray(meetingsResult.value)) {
        setMeetings(meetingsResult.value.map(normalizeMeetingRecord))
      } else {
        notes.push('Meetings endpoint unavailable, using local seed meetings.')
      }

      setDataSourceNote(notes.join(' '))
    }

    loadDatabaseData()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <DataContext.Provider
      value={{
        usersData,
        setUsersData,
        meetings,
        setMeetings,
        attendanceByMeeting,
        setAttendanceByMeeting,
        dataSourceNote,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}
