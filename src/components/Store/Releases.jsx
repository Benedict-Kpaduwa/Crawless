import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchReleases } from '../../redux/features/releaseSlice'
import { fetchWorkflow } from '../../redux/features/workflowSlice'

const Releases = () => {
  const dispatch = useDispatch()
  const { releases, loading } = useSelector((state) => state.release)

  useEffect(() => {
    dispatch(fetchReleases())
  }, [])

  function selectVersion(version) {
    // Clicking a version calls the API for that version and replaces the
    // displayed workflow content, per spec.
    dispatch(fetchWorkflow(version))
  }

  if (loading) return <div className='text-[#71717E] text-[12px] p-4'>Loading releases...</div>
  const list = Array.isArray(releases) ? releases : []

  return (
    <div className='p-4 text-[12px] text-[#ECECEC]'>
      {list.length === 0 && <div className='text-[#71717E]'>No releases found.</div>}
      <ul className='flex flex-col gap-1'>
        {list.map((release) => (
          <li
            key={release.version || release}
            className='flex flex-row justify-between items-center px-2 py-1 rounded-[4px] bg-[#1C1C23] hover:bg-[#2D2763] cursor-pointer'
            onClick={() => selectVersion(release.version || release)}
          >
            <span>{release.version || release}</span>
            {release.date && <span className='text-[#71717E]'>{release.date}</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Releases
