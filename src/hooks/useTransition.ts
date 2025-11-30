import React from 'react'

export type TransitionStatus = "entering" | "entered" | "exiting" | "exited"

export function useTransition(value: boolean, timeout = 100) {
  const timer_ref = React.useRef<NodeJS.Timeout>(0 as any as NodeJS.Timeout)
  // states
  const [status, setStatus] = React.useState<TransitionStatus>("exited")
  // callbacks
  const entered_call = React.useCallback(() => setStatus('entered'), [])
  const exited_call = React.useCallback(() => setStatus('exited'), [])
  // memos
  React.useMemo(() => {
    clearTimeout(timer_ref.current)
    if (value) {
      setStatus('entering')
      timer_ref.current = setTimeout(entered_call, timeout)
    } else {
      setStatus('exiting')
      timer_ref.current = setTimeout(exited_call, timeout)
    }
  }, [value, timeout])
  // hooks
  return status
}
export default useTransition
