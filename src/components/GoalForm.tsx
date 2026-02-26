import { useState } from 'react'
import type { Category } from '../types'

interface GoalFormProps {
  onAddGoal: (title: string, category: Category, targetMinutes: number) => void
}

const categories: Category[] = ['coding', 'reading', 'projects', 'other']

export const GoalForm = ({ onAddGoal }: GoalFormProps) => {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<Category>('coding')
  const [targetMinutes, setTargetMinutes] = useState(60)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onAddGoal(title, category, targetMinutes)
    setTitle('')
  }

  return (
    <section className="card">
      <h2>Add Daily Goal</h2>
      <form onSubmit={handleSubmit} className="goal-form">
        <input
          required
          maxLength={80}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="e.g. DSA practice"
          aria-label="Goal title"
        />

        <select value={category} onChange={(event) => setCategory(event.target.value as Category)}>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <input
          type="number"
          min={5}
          max={600}
          value={targetMinutes}
          onChange={(event) => setTargetMinutes(Number(event.target.value))}
          aria-label="Daily target in minutes"
        />

        <button type="submit">Add Goal</button>
      </form>
    </section>
  )
}
