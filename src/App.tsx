import React from 'react'
import * as S from './styles.js'
import questions from './questions.json'
import useTransition from './hooks/useTransition.js'

function questions_shuffle() {
  return [...questions].sort(() => Math.random() > .5 ? 1 : -1)
}
export type TOption = 'A' | 'B' | 'C' | 'D' | 'E'
export type TStatus = 'correct' | 'incorrect' | 'select'
const options: TOption[] = ['A', 'B', 'C', 'D', 'E'] as const

function App() {
  // refs
  const question_track_ref = React.useRef<HTMLAudioElement>({} as HTMLAudioElement)
  const sound_track_ref = React.useRef<HTMLAudioElement>({} as HTMLAudioElement)
  const sound_track_cut_ref = React.useRef<HTMLAudioElement>({} as HTMLAudioElement)
  const sound_fail_ref = React.useRef<HTMLAudioElement>({} as HTMLAudioElement)
  // states
  const [started, setStarted] = React.useState(false)
  const [questions, setQuestions] = React.useState(questions_shuffle())
  const [index, setIndex] = React.useState(0)
  const [selected, setSelected] = React.useState<TOption>()
  const [status, setStatus] = React.useState<TStatus>('select')
  // memos
  const question = React.useMemo(() => {
    const question = questions[index]
    if (!question)
      return null
    const result = { ...question }
    const options_suffle = [...options].sort(() => Math.random() > .5 ? 1 : -1)
    for (let i = 0; i < options.length; i++) {
      const option = options[i]
      result[option] = question[options_suffle[i]]
      if (options_suffle[i] === question.answer) {
        result.answer = option
      }
    }
    return result
  }, [questions, index])
  const card_transition = useTransition(status !== 'select', 1000)
  const ending_transition = useTransition(!question, 1000)
  // callbacks
  const confirm = React.useCallback(() => {
    switch (status) {
      case 'select':
        setStatus(selected === question.answer ? 'correct' : 'incorrect')
        break
      case 'correct':
        setStatus('select')
        setIndex(state => state + 1)
        setSelected(null)
        break
      case 'incorrect':
        reload()
        break
    }
  }, [status, selected, question])
  const reload = React.useCallback(() => {
    setQuestions(questions_shuffle())
    setStatus('select')
    setIndex(0)
    setSelected(null)
  }, [])
  // effects
  React.useEffect(() => {
    if (started) {
      sound_track_cut_ref.current.ariaDisabled = null
      sound_track_cut_ref.current.pause()
      sound_track_cut_ref.current.currentTime = 0;
      sound_track_ref.current.pause()
      sound_track_ref.current.currentTime = 0
      question_track_ref.current.pause()
      question_track_ref.current.currentTime = 0
      if (question) {
        question_track_ref.current.play()
        setTimeout(() => {
          if (sound_track_cut_ref.current.ariaDisabled !== 'true') {
            sound_track_cut_ref.current.play()
          }
        }, 4000)
      } else {
        sound_track_cut_ref.current.ariaDisabled = 'true'
        sound_track_ref.current.play()
      }
    }
  }, [question, started])
  React.useEffect(() => {
    if (status === 'incorrect') {
      sound_track_cut_ref.current.pause()
      sound_track_cut_ref.current.currentTime = 0;
      sound_fail_ref.current.play()
    }
  }, [status])
  // render
  return (
    <S.Container>
      <S.Header>
        <S.HeaderWrapper
          as={started ? 'div' : 'button'}
          data-started={started}
          onClick={started ? null : () => setStarted(true)}
        >
          {started ? 'Psycho Show' : 'Iniciar Jogo'}
          <S.HeaderProgress style={{ width: `${Math.round(index / questions.length * 100)}%` }}></S.HeaderProgress>
        </S.HeaderWrapper>
      </S.Header>
      {started ? (
        question ? (
          <>
            {status !== 'select' ? (
              <S.Teacher
                src={status !== 'incorrect' ? 'jaqueline.png' : 'jaqueline_chorando.png'}
                hidden={card_transition !== 'entered'}
              />
            ) : null}
            <S.Card
              data-status={status}
              data-transition={card_transition}
              onClick={confirm}
            >
              <div className="back">{question[question['answer']]}</div>
              <div className="front"></div>
            </S.Card>
            <S.Section>
              <S.Question>{index + 1}. {question.question}</S.Question>
              <S.Options>
                {options.map(option => (
                  <S.Option
                    key={option}
                    onClick={() => {
                      if (status === 'select') {
                        setSelected(option)
                      }
                    }}
                    data-status={option === selected ? status : null}
                  >
                    <S.Letter>{option.toLocaleLowerCase()}</S.Letter>
                    <p>{question[option]}{option === question.answer ? '.' : ''} </p>
                  </S.Option>
                ))}
              </S.Options>
            </S.Section>
            <S.Footer data-status={status}>
              <S.FooterResult>
                {status === 'correct' ? <h3>Resposta correta!</h3> : null}
                {status === 'incorrect' ? (
                  <>
                    <h3>Resposta correta:</h3>
                    <p>{question.answer.toLocaleLowerCase()}) {question[question.answer]}</p>
                  </>
                ) : null}
              </S.FooterResult>
              <S.FooterButton
                data-status={status}
                onClick={confirm}
                disabled={!selected}
              >
                {status === 'select' ? 'Verificar' : null}
                {status === 'correct' ? 'Continuar' : null}
                {status === 'incorrect' ? 'Reiniciar' : null}
              </S.FooterButton>
            </S.Footer>
          </>
        ) : (
          <>
            <S.Credits data-transition={ending_transition}>
              <h2>Curso de Psicologia</h2>
              <h2>Disciplína: A história da psicologia</h2>
              <h2>Créditos</h2>
              <h3>Docentes</h3>
              <span>Jaqueline Brás</span>
              <span>Ísis Oliveira</span>
              <h3>Produtores</h3>
              <span>Rafael Araújo - Diretor artístico</span>
              <span>Lavínia Alencar - Produtora artística</span>
              <span>Diego Sena - Desenvolvedor</span>
              <h3>Integrantes</h3>
              <span>Andréia de Carvalho</span>
              <span>Maria Angélica</span>
              <span>Rafaela Novais</span>
              <span>Thailine Rocha</span>
              <span>Camile Freitas</span>
              <span>Elis</span>
              <img src="unijorge_logo.svg" />
            </S.Credits>
            <S.Section>
              <S.Question>Parabéns! Continue se esforçando.</S.Question>
            </S.Section>
            <S.Footer data-status="correct">
              <S.FooterButton data-status="correct" onClick={reload}>
                Reiniciar
              </S.FooterButton>
            </S.Footer>
          </>
        )
      ) : null}
      <audio ref={sound_track_ref} src="sound_track.mp3" loop />
      <audio ref={sound_track_cut_ref} src="sound_track_cut.mp3" loop />
      <audio ref={question_track_ref} src="question_track.mp3" />
      <audio ref={sound_fail_ref} src="sound_fail.mp3" />
    </S.Container >
  )
}

export default App
