import { Button, type ButtonProps } from '@chakra-ui/react'
import { ListFilter } from 'lucide-react'

const FilterButton = (props : ButtonProps) => {
    const { onClick } = props
    return (
        <Button onClick={onClick}>
            <ListFilter size={18} />
        </Button>
    )
}

export default FilterButton