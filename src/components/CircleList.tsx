import { PluginOptions } from '../types';
import { useEffect, useState} from 'react';
import { updateActivePositions } from '../store';
import { carPositions } from '../initialData';
import Circle from './Circle';
import './Circle.css';

const CircleList = ({ options }:{ options: PluginOptions }) => {
    const { onInit, onPositionChange, onComplete } = options;
    const [positions, setPositions] = useState([...carPositions]);
    const [activePositions, setActivePositions] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        onInit().then(res =>  {
            updateActivePositions(res);
            setActivePositions([...res])
        })
    }, [])

    useEffect(() => {
        let updatedPositions = positions.map(item => activePositions?.includes(item.name) ? {...item, isActive: true} : item);
        setPositions([...updatedPositions]);
    }, [activePositions]);

    const onSubmit = (positions: string[]) =>  {
        setIsLoading(true);
        onComplete(positions).then(() => setIsLoading(false))
    }

    const onCurrentPositionChange = (name: string) => {
        let positions = new Set([...activePositions]);
        positions.has(name) ? positions.delete(name) : positions.add(name);
        setActivePositions([...positions]);
        onPositionChange([...positions]);
    }
    return (
        activePositions.length ? 
        <div className='circle-list-wrapper'>
            <div className='positions'>
                {  
                    positions.map(({id, name}) => {
                        let isActive: boolean = (activePositions as string[]).includes(name);
                        return <Circle 
                            key={id} 
                            name={name}
                            isActive={isActive}
                            onCurrentPositionChange={onCurrentPositionChange}
                        />
                    }) 
                }
            </div>
            <button 
                onClick={() => onSubmit(activePositions)}
                className='complete-button'>{isLoading ? 'Loading...' : 'Rapporto danni'}
            </button>
        </div> :
        <div>Loading...</div> 
    )
}

export default CircleList
