import { useState } from 'react'
import type { Category } from '../types'

interface GoalFormProps {
  onAddGoal: (title: string, category: Category, targetMinutes: number) => void
}

const categories: Category[] = ['coding', 'reading', 'projects', 'revision', 'other']

const templates: Array<{ title: string; category: Category; minutes: number }> = [
  { title: 'DSA Practice', category: 'coding', minutes: 60 },
  { title: 'Reading Session', category: 'reading', minutes: 45 },
  { title: 'Project Build', category: 'projects', minutes: 90 },
  { title: 'Revision', category: 'revision', minutes: 30 },
]

export const GoalForm = ({ onAddGoal }: GoalFormProps) => {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<Category>('coding')
  const [targetMinutes, setTargetMinutes] = useState(60)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onAddGoal(title, category, targetMinutes)
    setTitle('')
  }

  const applyTemplate = (template: { title: string; category: Category; minutes: number }) => {
    onAddGoal(template.title, template.category, template.minutes)
  }

  return (
    <section className="card">
      <h2>Add Daily Goal</h2>
      <div className="template-row" aria-label="Goal templates">
        {templates.map((template) => (
          <button
            key={`${template.title}-${template.category}`}
            className="secondary-btn"
            type="button"
            onClick={() => applyTemplate(template)}
          >
            {template.title}
          </button>
        ))}
      </div>
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
