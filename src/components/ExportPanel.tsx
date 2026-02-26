interface ExportPanelProps {
  onExportJson: () => void
  onExportCsv: () => void
}

export const ExportPanel = ({ onExportJson, onExportCsv }: ExportPanelProps) => {
  return (
    <section className="card">
      <h2>Export Progress</h2>
      <p className="muted">Download your data as JSON or CSV for backup and analysis.</p>
      <div className="button-row">
        <button onClick={onExportJson}>Export JSON</button>
        <button className="secondary-btn" onClick={onExportCsv}>
          Export CSV
        </button>
      </div>
    </section>
  )
}
