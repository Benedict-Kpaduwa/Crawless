import React, { useMemo } from 'react'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import './Documentation.css'

// Read-only markdown rendering for a Store workflow's "docs" field. This
// stands in for @crawless/ui's Markdown export / rich-markdown-editor (the
// spec's suggestion) — this environment has no way to inspect either
// library's real prop API (no Storybook/network access), so a small,
// well-known, easily-swappable renderer was safer than guessing at one.
const Documentation = ({ docs }) => {
  const html = useMemo(() => {
    if (!docs) return ''
    return DOMPurify.sanitize(marked.parse(docs))
  }, [docs])

  if (!docs) {
    return <div className='text-[#71717E] text-[12px] p-4'>No documentation provided.</div>
  }

  return (
    <div
      className='markdown-body text-[#ECECEC] text-[12px] p-4'
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export default Documentation
