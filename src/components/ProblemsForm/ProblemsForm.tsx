import React, { useState, FormEvent } from 'react';
import LightBlueButton from "../reusable/button/LightBlueButton";
import RoundedInput from "../reusable/input/Input";
import ErrorMessage from '../error/Error';
import axios from 'axios';
import Spinner from '../reusable/spinner/Spinner';
import PointsTable from '../PointsTable/pointsTable';
import ErrorComponent from '../reusable/error/ErrorPop';
import { saveToExcel } from '../functions/saveToExcel';


interface ProblemFormsProps {
    contests: { id: string; upsolving:boolean; numProblems: string }[];
}

const ProblemForms: React.FC<ProblemFormsProps> = ({ contests }) => {
    const [problemPoints, setProblemPoints] = useState<string[][]>(contests.map(() => []));
    const [errors, setErrors] = useState<string[]>([]);
    const [currentContest, setCurrentContest] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userPoints, setUserPoints] = useState({});
    const [contestError, setContestError] = useState<boolean>(false);




    const validateInputs = (): boolean => {
        let isValid = true;
        let newErrors = [];
        for (let i = 0; i < parseInt(contests[currentContest].numProblems); i++) {
            if (!problemPoints[currentContest][i]) {
                isValid = false;
                newErrors[i] = 'This field cannot be empty';
            } else {
                newErrors[i] = '';
            }
        }
        setErrors(newErrors);
        return isValid;
    };

    const handleNext = (): void => {
        if (validateInputs() && currentContest < contests.length - 1) {
            setCurrentContest(currentContest + 1);
        }
    };

   const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (validateInputs()) {
        const pointsAsNumbers = problemPoints.map(contest =>
            contest.map(point => parseFloat(point))
        );

        const payload = {
            contestIds: contests.map(contest => contest.id),
            contestPoints: pointsAsNumbers,
            upsolving: contests.map(contest => contest.upsolving),

        };

        try {
            setIsLoading(true);
            const response = await axios.post('http://localhost:3000/filter', payload);    
            setIsLoading(false);
            setUserPoints(response.data); 
        } catch (error) {
            setContestError(true);
            setIsLoading(false);
            return;
        }
    
    }
};

    const handlePointsChange = (index: number, value: string): void => {
        let newPoints = [...problemPoints];
        newPoints[currentContest][index] = value;
        setProblemPoints(newPoints);
        if (value) {
            setErrors(errors => ({ ...errors, [index]: '' }));
        }
    };

    const handleSave = () :void =>{
        saveToExcel(userPoints,"Points");

    }

    const renderInputs = (): JSX.Element[] => {
        let inputs: JSX.Element[] = [];
        for (let i = 0; i < parseInt(contests[currentContest].numProblems); i++) {
            inputs.push(
                <div key={i}>
                    <RoundedInput 
                        placeholder={`${String.fromCharCode(65 + i)} Points`} 
                        value={problemPoints[currentContest][i] || ''} 
                        onChange={(e) => handlePointsChange(i, e.target.value)}
                    />
                    {errors[i] && <ErrorMessage message={errors[i]} />}
                </div>
            );
        }
        return inputs;
    };

    return (
        <div>
            {isLoading ? (
                <Spinner />
            ) : Object.keys(userPoints).length > 0 ? (
                <div className="flex flex-col gap-8 items-center">
                <LightBlueButton label='Save to Excel' onClick={handleSave} />
                <PointsTable userPoints={userPoints} />
                </div>
            ) : (
                <form onSubmit={handleSubmit}  className="flex flex-col gap-3 items-center">
                    <h1 className="text-2xl font-bold">Contest {currentContest + 1}</h1>
                    {renderInputs()}
                    {currentContest < contests.length - 1 && (
                        <LightBlueButton label="Next" onClick={handleNext} />
                    )}
                    {currentContest === contests.length - 1 && (
                        <LightBlueButton label="Submit" type="submit" />
                    )}
                </form>
            )}
            <div>
                {contestError && <ErrorComponent errorMessage="Contest not found or you have no access" />}
                
            </div>
        </div>
    );
    
};

export default ProblemForms;
