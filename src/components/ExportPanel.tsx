interface ExportPanelProps {
  onExportJson: () => void
  onExportCsv: () => void
  onImportJson: (file: File) => void
  importStatus: string
}

export const ExportPanel = ({ onExportJson, onExportCsv, onImportJson, importStatus }: ExportPanelProps) => {
  return (
    <section className="card">
      <h2>Export Progress</h2>
      <p className="muted">Download your data as JSON or CSV for backup and analysis, or import a JSON backup.</p>
      <div className="button-row export-actions">
        <button onClick={onExportJson}>Export JSON</button>
        <button className="secondary-btn" onClick={onExportCsv}>
          Export CSV
        </button>
        <label htmlFor="import-json" className="secondary-btn import-label">
          Import JSON
        </label>
      </div>

      <div className="import-row">
        <input
          id="import-json"
          type="file"
          accept="application/json"
          onChange={(event) => {
            const selected = event.target.files?.[0]
            if (selected) {
              onImportJson(selected)
            }
            event.currentTarget.value = ''
          }}
        />
      </div>

      {importStatus && (
        <p className="muted import-status" aria-live="polite">
          {importStatus}
        </p>
      )}
    </section>
  )
}
