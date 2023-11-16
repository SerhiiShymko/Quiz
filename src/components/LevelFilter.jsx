import Select from 'react-select'
import styled from 'styled-components'

const StyledSelect = styled(Select)`
  width: 200px;
`

const options = [
  { value: 'all', label: 'All' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' }
]

export const LevelFilter = ({ value, onChange }) => {
  const defaultOption = options.find(option => option.value === value)
  return (
    <StyledSelect
      options={options}
      defaultValue={defaultOption}
      onChange={option => onChange(option.value)}
    />
  )
}

// export const LevelFilter = ({ value, onChange }) => {
//   return (
//     <select value={value} onChange={evt => onChange(evt.target.value)}>
//       <option value="all">All</option>
//       <option value="beginner">Beginner</option>
//       <option value="intermediate">Intermediate</option>
//       <option value="advanced">Advanced</option>
//     </select>
//   );
// };