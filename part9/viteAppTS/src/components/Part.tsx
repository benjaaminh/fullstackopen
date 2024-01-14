import { CoursePart } from "../types";

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

//renders part data depending on kind of part
const Part = ({ part }: { part: CoursePart }) => {//prop is part and of object coursepart
    switch (part.kind) {
        case "basic":
            return (//if basic, return this data
                <div>
                    <em>{part.description}</em>
                </div>
            );
        case "group"://if group, render project exercises etc..
            return (
                <div>project exercises {part.groupProjectCount}</div>
            );
        case "background":
            return (<div>
                <em>{part.description}</em>
                <div> submit to {part.backgroundMaterial}</div>
            </div>
            );
        case "special":
            return (
                <div> 
                    <em>{part.description}</em>
                <div>required skills: {part.requirements.map(s => s).join(", ")}</div>
                {/*map parts to array and join the elements in array by comma*/}
                </div> );
        default://if unexpected value set never type
            return assertNever(part);
    }

};

export default Part;