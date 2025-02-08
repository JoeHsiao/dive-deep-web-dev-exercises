import shortid from "shortid"

const Header = (props) => <h1>{props.course}</h1>

const Content = ({parts}) => (
  <div>
    {parts.map(part =>
      <Part key={shortid.generate()} part={part}/>
    )}
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => <p><strong>Total of {props.total} exercises</strong></p>

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total
        total={course.parts.reduce((sum, x) => sum + x.exercises, 0)}
      />
    </div>
  )
}

export default Course