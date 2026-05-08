import { useState } from 'react';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';




interface Labels {
    [key: number]: string;
}

const labels: Labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

function getLabelText(value: number): string {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export const Customizable: React.FC = () => {
    const [value, setValue] = useState<number>(2);
    const [hover, setHover] = useState<number>(-1);

    return (
        <>
            <Rating
                name="hover-feedback"
                value={value}
                precision={0.5}
                getLabelText={getLabelText}
                onChange={(_event: React.ChangeEvent<{}>, newValue: number | null) => {
                    if (newValue !== null) {
                        setValue(newValue);
                    }
                }}
                onChangeActive={(_event: React.ChangeEvent<{}>, newHover: number) => {
                    setHover(newHover);
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            <div>{value !== null && labels[hover !== -1 ? hover : value]}</div>
        </>
    );
};




const labels1: Labels = {
    1: 'Poor',
    2: 'Fair',
    3: 'Average',
    4: 'Good',
    5: 'Excellent',
};

function getLabelText1(value: number): string {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels1[value]}`;
}

export const HoverRating: React.FC = () => {
    const [value, setValue] = useState<number>(2);
    const [hover, setHover] = useState<number>(-1);

    return (

        <>
            <Rating
                name="hover-feedback"
                value={value}
                precision={0.5}
                getLabelText={getLabelText1}
                onChange={(_event: React.ChangeEvent<{}>, newValue: number | null) => {
                    if (newValue !== null) {
                        setValue(newValue);
                    }
                }}
                onChangeActive={(_event: React.ChangeEvent<{}>, newHover: number) => {
                    setHover(newHover);
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            {value !== null && (
                <div className="live-rating rating_badge badge bg-success-transparent ms-3">
                    {hover !== -1 ? hover : value}
                </div>
            )}
        </>
    );
};


