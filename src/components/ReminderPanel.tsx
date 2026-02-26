interface ReminderPanelProps {
  enabled: boolean
  hour: number
  notificationPermission: NotificationPermission | 'unsupported'
  onToggleEnabled: (enabled: boolean) => void
  onChangeHour: (hour: number) => void
  onRequestPermission: () => void
}

export const ReminderPanel = ({
  enabled,
  hour,
  notificationPermission,
  onToggleEnabled,
  onChangeHour,
  onRequestPermission,
}: ReminderPanelProps) => {
  return (
    <section className="card">
      <h2>Smart Reminders</h2>
      <p className="muted">Get an optional browser reminder if your daily target is not completed.</p>

      <div className="reminder-grid">
        <label className="inline-label">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(event) => onToggleEnabled(event.target.checked)}
          />
          Enable reminders
        </label>

        <label>
          Reminder Hour (24h)
          <input
            type="number"
            min={0}
            max={23}
            value={hour}
            onChange={(event) => onChangeHour(Number(event.target.value))}
            disabled={!enabled}
          />
        </label>

        <div>
          <p className="muted">Permission: {notificationPermission}</p>
          <button
            type="button"
            className="secondary-btn"
            onClick={onRequestPermission}
            disabled={notificationPermission === 'granted' || notificationPermission === 'unsupported'}
          >
            Allow Notifications
          </button>
        </div>
      </div>
    </section>
  )
}
