import { IconButton, type ButtonProps } from '@mui/material'
import { ListFilter } from 'lucide-react'

const FilterButton = (props : ButtonProps) => {
    const { onClick } = props
    return (
        <IconButton sx={{ p: 1.2 }} onClick={onClick}>
            <ListFilter size={18} />
        </IconButton>
    )
}

export default FilterButton