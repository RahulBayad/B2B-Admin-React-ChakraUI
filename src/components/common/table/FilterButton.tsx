import { Button, type ButtonProps } from '@chakra-ui/react'
import { ListFilter } from 'lucide-react'

const FilterButton = (props : ButtonProps) => {
    const { onClick } = props
    return (
        <Button onClick={onClick} variant="outline" rounded="md" size="sm" aspectRatio="square">
            <ListFilter />
        </Button>
    )
}

export default FilterButton