import { useState, FC } from 'react'
import { Field } from 'formik'
import TimezoneSelect, { allTimezones } from 'react-timezone-select'

import styles from './Timezone.module.scss'

interface ITimezoneProps {
  readonly name: string
}

const customStyles = {
  option: (provided: any, state: any) => {
    return {
      ...provided,
      background: state.isSelected ? '#8b5fff' : '',
    };
  },
}

const Timezone: FC<ITimezoneProps> = ({ name }) => {
  const [tz, setTz] = useState<any>(Intl.DateTimeFormat().resolvedOptions().timeZone)

  return (
    <Field name={name}>
      {({ form, field }: any) => {
        const onTimezoneChange = (timezone: any) => {
          form.setFieldValue(name, timezone)
          setTz(timezone)
        }

        return (
          <div className={styles.wrap}>
            <TimezoneSelect
              styles={customStyles}
              value={tz}
              onChange={onTimezoneChange}
              labelStyle="altName"
              timezones={{
                ...allTimezones,
                "America/Lima": "Pittsburgh",
                "Europe/Berlin": "Frankfurt"
              }}
            />
          </div>
        )
      }}
    </Field>
  )
}

export default Timezone
