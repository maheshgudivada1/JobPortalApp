import './index.css'

const Employment = ({employmentType, onChange}) => (
  <li className="list-item">
    <label htmlFor={employmentType.employmentTypeId} className="label">
      <input
        type="checkbox"
        id={employmentType.employmentTypeId}
        name="employmentType"
        value={employmentType.employmentTypeId}
        onChange={() => onChange(employmentType.employmentTypeId)} // Updated handler
      />
      <h1 className="heading1">{employmentType.label}</h1>
    </label>
  </li>
)

export default Employment
