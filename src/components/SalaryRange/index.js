const SalaryRange = ({salaryRange, onChange}) => (
  <li className="list-item">
    <label htmlFor={salaryRange.salaryRangeId} className="label">
      <input
        type="checkbox"
        id={salaryRange.salaryRangeId}
        name="salaryRange"
        value={salaryRange.salaryRangeId}
        onChange={() => onChange(salaryRange.salaryRangeId)}
      />
      <h1 className="heading1">{salaryRange.label}</h1>
    </label>
  </li>
)

export default SalaryRange
