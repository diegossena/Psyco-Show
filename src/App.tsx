import React from 'react'
import * as S from './styles.js'
import questions from './questions.json'

function questions_shuffle() {
  return [...questions].sort(() => Math.random() > .5 ? 1 : -1)
}
export type TOption = 'A' | 'B' | 'C' | 'D' | 'E'
export type TStatus = 'correct' | 'incorrect' | 'select'
const options: TOption[] = ['A', 'B', 'C', 'D', 'E'] as const

function App() {
  // states
  const [questions, setQuestions] = React.useState(questions_shuffle())
  const [index, setIndex] = React.useState(0)
  const [selected, setSelected] = React.useState<TOption>()
  const [status, setStatus] = React.useState<TStatus>('select')
  // memos
  const question = React.useMemo(() => {
    const question = questions[index]
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
  // render
  return (
    <S.Container>
      <S.Header>
        <S.HeaderWrapper>
          Psycho Show
        </S.HeaderWrapper>
      </S.Header>
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
              <p>{question[option]}</p>
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
          onClick={() => {
            switch (status) {
              case 'select':
                setStatus(selected === question.answer ? 'correct' : 'incorrect')
                break
              case 'correct':
                setStatus('select')
                setIndex(index + 1)
                setSelected(null)
                break
              case 'incorrect':
                setQuestions(questions_shuffle())
                setStatus('select')
                setIndex(0)
                setSelected(null)
                break
            }
          }}
          disabled={!selected}
        >
          {status === 'select' ? 'Verificar' : null}
          {status === 'correct' ? 'Continuar' : null}
          {status === 'incorrect' ? 'Reiniciar' : null}
        </S.FooterButton>
      </S.Footer>
    </S.Container >
  )
}

export default App
