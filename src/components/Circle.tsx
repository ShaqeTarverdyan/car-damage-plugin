import './Circle.css';

interface CircleOptions {
    name: string,
    isActive: boolean,
    onCurrentPositionChange: (name: string) => void
};

const Circle = ({onCurrentPositionChange,isActive, name }: CircleOptions) => {
    const handleClick = () => {
        onCurrentPositionChange(name)
    }

    return (
        <div className={`circle_wrapper circle_wrapper_${name}`}>
            <div
            className={`circle ${isActive ? 'active' : ''}`}
            onClick={handleClick}
            />
        </div>
    )
}

export default Circle;