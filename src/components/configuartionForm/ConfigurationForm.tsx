import React, { useState, ChangeEvent } from 'react';
import LightBlueButton from "../reusable/button/LightBlueButton";
import RoundedInput from "../reusable/input/Input";
import ProblemForms from '../ProblemsForm/ProblemsForm';
import Spinner from '../reusable/spinner/Spinner';

interface Contest {
  id: string;
  numProblems: string;
  upsolving:boolean
  
}

export default function ConfigurationForm() {
    const [contests, setContests] = useState<Contest[]>([{ id: '', upsolving:false ,numProblems: '' }]);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const addContest = (): void => {
        setContests([...contests, { id: '', upsolving:false ,numProblems: '' }]);
    };

    const handleContestChange = (index: number, key: keyof Contest, value: string): void => {
        const newContests = contests.map((contest, i) => {
            if (i === index) {
                return { ...contest, [key]: value };
            }
            return contest;
        });
        setContests(newContests);
    };

    const handleUpsolvingChange = (index: number, value: boolean): void => {
        const newContests = contests.map((contest, i) => {
            if (i === index) {
                return { ...contest, upsolving: value };
            }
            return contest;
        });
        setContests(newContests);
    };

    
    const handleNext = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        setIsLoading(true);
        setIsLoading(false);
        setCurrentStep(1); 
    };

    if (isLoading) {
        return <Spinner />;
    }

    if (currentStep === 1) {
        return <ProblemForms contests={contests} />;
    }

    return (
        <form onSubmit={handleNext} className="flex flex-col content-center gap-5 justify-center items-center">
            {contests.map((contest, index) => (
                <div className='flex flex-row gap-5' key={index}>
                    <RoundedInput placeholder="Contest Id" value={contest.id} onChange={(e: ChangeEvent<HTMLInputElement>) => handleContestChange(index, 'id', e.target.value)} />
                    <RoundedInput placeholder="Number of Problems" value={contest.numProblems} onChange={(e: ChangeEvent<HTMLInputElement>) => handleContestChange(index, 'numProblems', e.target.value)} />
                    <input 
            type="checkbox" 
            checked={contest.upsolving}
            onChange={(e) => handleUpsolvingChange(index, e.target.checked)}
        />
                <label style={{padding:".35rem"}}> Upsolving</label>

                </div>
            ))}
            <LightBlueButton label="Add Contest" onClick={(e:any) => { e.preventDefault(); addContest(); }} />
            <LightBlueButton label="Next" className='hover:bg-green-800 bg-green-600 mb-5' type="submit"   />
        </form>
    );
}
