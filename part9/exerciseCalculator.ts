interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export const calculateExercises = (target: number, dailyHours: number[]): Result => {
    const periodLength = dailyHours.length;
    const daysTrained: number = dailyHours.filter(i => i > 0).length;
    const sum: number = dailyHours.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const average: number = sum / periodLength;
    let rating: number;
    let ratingDescription: string;
    if (average < target - 0.5) {
        rating = 1;
        ratingDescription = 'You need to train more';
    } else if (average > target - 0.5 && average < target + 0.1) {
        rating = 2;
        ratingDescription = 'Not too bad but could be better';
    } else {
        rating = 3;
        ratingDescription = 'Daily hours is well above target. Well done!';
    }

    return {
        periodLength: periodLength,
        trainingDays: daysTrained,
        success: average >= target,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    };
};

interface targetAndWeek {
    target: number;
    week: number[];
}

const parseArguments = (args: string[]): targetAndWeek => {
    if (args.length < 4) throw new Error('Not enough arguments');
    let target: number;
    const week: number[] = [];
    if (!isNaN(Number(args[2]))) {
        target = Number(args[2]);
    }
    else {
        throw new Error('Provided values were not numbers!');
    }
    for (let i = 3; i < args.length; i++) {
        if (!isNaN(Number(args[i]))) {
            week.push(Number(args[i]));
            //since arguments from commandline cant be an array, push all arguments after 3 to an array
        }
        else {
            throw new Error('Provided values were not numbers!');
        }
    }
    return {
        target: target,
        week: week
    };

};

try {
    const { target, week } = parseArguments(process.argv);
    console.log(calculateExercises(target, week));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}