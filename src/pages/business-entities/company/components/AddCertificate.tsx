import { Card } from '@mui/material'
import { memo } from 'react'
import { Controller, type Control, type FieldErrors, type FieldValues } from 'react-hook-form'

export interface DynamicFieldProps<T extends FieldValues>{
  control :  Control<T>;
  errors : FieldErrors<T>;
}

const AddCertificate = <T extends FieldValues>({ control } : DynamicFieldProps<T>) => {
  return (
    <Card>
        123
    </Card>
  )
}

export default memo(AddCertificate)